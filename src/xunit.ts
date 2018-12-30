import * as assert from "assert";

class TestFailedError implements Error {
  public name: string = "TestFailedError";
  public message: string = "";

  constructor(message: string) {
    this.message = message;
  }

  public toString(): string {
    return this.name + ": " + this.message;
  }
}

class TestCase {
  protected name: string = "";

  constructor(name: string) {
    this.name = name;
  }

  public setUp(): void {}

  public tearDown(): void {}

  public run(result: TestResult): void {
    result.testStarted();
    this.setUp();
    try {
      const method = "this." + this.name + "()";
      eval(method);
    } catch (e) {
      if (e instanceof TestFailedError) {
        result.testFailed();
      } else {
        throw e;
      }
    }
    this.tearDown();
  }
}

class TestResult {
  private runCount: number = 0;
  private errorCount: number = 0;

  public testStarted(): void {
    this.runCount = this.runCount + 1;
  }

  public testFailed(): void {
    this.errorCount = this.errorCount + 1;
  }

  public summary(): string {
    return `${this.runCount} run, ${this.errorCount} failed.`;
  }
}

class TestSuite {
  private tests: TestCase[] = [];

  public add(test: TestCase): void {
    this.tests.push(test);
  }

  public run(result: TestResult): void {
    this.tests.forEach( v => {
      v.run(result);
    });
  }
}

class WasRun extends TestCase {
  public log: string = "";

  constructor(name: string) {
    super(name);
  }

  public testMethod(): void {
    this.log = this.log + "testMethod ";
  }

  public testBrokenMethod(): void {
    throw new TestFailedError("testBrokenMethod() error.");
  }

  public setUp(): void {
    this.log = "setUp ";
  }

  public tearDown(): void {
    this.log = this.log + "tearDown";
  }
}

class TestCaseTest extends TestCase {
  private result = new TestResult();

  public setUp() {
    this.result = new TestResult();
  }

  public testTemplateMethod(): void {
    const test = new WasRun("testMethod");
    test.run(this.result);
    assert.ok("setUp testMethod tearDown" === test.log);
  }

  public testResult(): void {
    const test = new WasRun("testMethod");
    test.run(this.result);
    assert.ok("1 run, 0 failed." === this.result.summary());
  }

  public testFailedResult(): void {
    const test = new WasRun("testBrokenMethod");
    test.run(this.result);
    assert.ok("1 run, 1 failed." === this.result.summary());
  }

  public testFailedResultFormatting(): void {
    this.result.testStarted();
    this.result.testFailed();
    assert.ok("1 run, 1 failed." === this.result.summary());
  }

  public testSuite(): void {
    const suite = new TestSuite();
    suite.add(new WasRun("testMethod"));
    suite.add(new WasRun("testBrokenMethod"));
    suite.run(this.result);
    assert("2 run, 1 failed." === this.result.summary());
  }
}

const suite = new TestSuite();
suite.add(new TestCaseTest("testTemplateMethod"));
suite.add(new TestCaseTest("testResult"));
suite.add(new TestCaseTest("testFailedResult"));
suite.add(new TestCaseTest("testFailedResultFormatting"));
suite.add(new TestCaseTest("testSuite"));
const result = new TestResult();
suite.run(result);
console.log(result.summary());

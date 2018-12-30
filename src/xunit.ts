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

  public setUp() {}

  public tearDown() {}

  public run(result: TestResult) {
    result.testStarted();
    try {
      this.setUp();
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

  public testStarted() {
    this.runCount = this.runCount + 1;
  }

  public testFailed() {
    this.errorCount = this.errorCount + 1;
  }

  public summary(): string {
    return `${this.runCount} run, ${this.errorCount} failed.`;
  }
}

class TestSuite {
  private tests: TestCase[] = [];

  public build(...tests: TestCase[]) {
    tests.forEach(v => {
      this.tests.push(v);
    });
  }

  public run(result: TestResult) {
    this.tests.forEach(v => {
      v.run(result);
    });
  }
}

class WasRun extends TestCase {
  public log: string = "";
  private on_error_setup: boolean = false;

  constructor(name: string) {
    super(name);
  }

  public setOnErrorSetUp(on_error: boolean) {
    this.on_error_setup = on_error;
  }

  public testMethod(): void {
    this.log = this.log + "testMethod ";
  }

  public testBrokenMethod() {
    throw new TestFailedError("testBrokenMethod() error.");
  }

  public setUp() {
    this.log = "setUp ";
    if (this.on_error_setup) {
      throw new TestFailedError("setUp() error.");
    }
  }

  public tearDown() {
    this.log = this.log + "tearDown";
  }
}

class TestCaseTest extends TestCase {
  private result = new TestResult();

  public setUp() {
    this.result = new TestResult();
  }

  public testTemplateMethod() {
    const test = new WasRun("testMethod");
    test.run(this.result);
    assert.ok("setUp testMethod tearDown" === test.log);
  }

  public testResult() {
    const test = new WasRun("testMethod");
    test.run(this.result);
    assert.ok("1 run, 0 failed." === this.result.summary());
  }

  public testFailedResult() {
    const test = new WasRun("testBrokenMethod");
    test.run(this.result);
    assert.ok("1 run, 1 failed." === this.result.summary());
    assert.ok("setUp tearDown" === test.log);
  }

  public testFailedResultFormatting() {
    this.result.testStarted();
    this.result.testFailed();
    assert.ok("1 run, 1 failed." === this.result.summary());
  }

  public testSuite() {
    const suite = new TestSuite();
    suite.build(new WasRun("testMethod"), new WasRun("testBrokenMethod"));
    suite.run(this.result);
    assert("2 run, 1 failed." === this.result.summary());
  }

  public testFailedSetUp() {
    const test = new WasRun("testMethod");
    test.setOnErrorSetUp(true);
    test.run(this.result);
    assert.ok("1 run, 1 failed." === this.result.summary());
  }
}

const suite = new TestSuite();
suite.build(
  new TestCaseTest("testTemplateMethod"),
  new TestCaseTest("testResult"),
  new TestCaseTest("testFailedResult"),
  new TestCaseTest("testFailedResultFormatting"),
  new TestCaseTest("testSuite"),
  new TestCaseTest("testFailedSetUp")
);
const result = new TestResult();
suite.run(result);
console.log(result.summary());

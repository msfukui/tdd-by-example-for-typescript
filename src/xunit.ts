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

  public run(): TestResult {
    const result = new TestResult();
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
    return result;
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
  public testTemplateMethod(): void {
    const test = new WasRun("testMethod");
    test.run();
    assert.ok("setUp testMethod tearDown" === test.log);
  }

  public testResult(): void {
    const test = new WasRun("testMethod");
    const result = test.run();
    assert.ok("1 run, 0 failed." === result.summary());
  }

  public testFailedResult(): void {
    const test = new WasRun("testBrokenMethod");
    const result = test.run();
    assert.ok("1 run, 1 failed." === result.summary());
  }

  public testFailedResultFormatting(): void {
    const result = new TestResult();
    result.testStarted();
    result.testFailed();
    assert.ok("1 run, 1 failed." === result.summary());
  }
}

console.log(`${new TestCaseTest("testTemplateMethod").run().summary()}`);
console.log(`${new TestCaseTest("testResult").run().summary()}`);
console.log(`${new TestCaseTest("testFailedResult").run().summary()}`);
console.log(`${new TestCaseTest("testFailedResultFormatting").run().summary()}`);

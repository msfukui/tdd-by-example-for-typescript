import * as assert from "assert";

class ApplicationError implements Error {
  public name: string = "ApplicationError";
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
    const method = "this." + this.name + "()";
    eval(method);
    this.tearDown();
    return result;
  }
}

class TestResult {
  private runCount: number = 0;

  public testStarted(): void {
    this.runCount = this.runCount + 1;
  }

  public summary(): string {
    return `${this.runCount} run, 0 failed.`;
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
    throw new ApplicationError("testBrokenMethod() error.");
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
}

new TestCaseTest("testTemplateMethod").run();
new TestCaseTest("testResult").run();
//new TestCaseTest("testFailedResult").run();

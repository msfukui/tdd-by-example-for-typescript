import * as assert from "assert";

class TestCase {
  protected name: string = "";

  constructor(name: string) {
    this.name = name;
  }

  public setUp(): void { }

  public tearDown(): void { }

  public run(): void {
    this.setUp();
    const method = "this." + this.name + "()";
    eval(method);
    this.tearDown();
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

  public setUp(): void {
    this.log = "setUp ";
  }

  public tearDown(): void {
    this.log = this.log + "tearDown";
  }
}

class TestCaseTest extends TestCase {
  public testTemplateMethod() {
    const test = new WasRun("testMethod");
    test.run();
    assert.ok("setUp testMethod tearDown" === test.log);
  }
}

new TestCaseTest("testTemplateMethod").run();

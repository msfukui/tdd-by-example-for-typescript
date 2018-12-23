import * as assert from 'assert';

class TestCase {
  protected name: string = '';

  constructor(name: string) {
    this.name = name;
  }

  public setUp(): void {
  }

  public run(): void {
    this.setUp();
    const method = 'this.' + this.name + '()';
    eval(method);
  }
}

class WasRun extends TestCase {
  public wasRun: boolean = false;
  public wasSetUp: boolean = false;

  constructor(name: string) {
    super(name);
  }

  public testMethod(): void {
    this.wasRun = true;
  }

  public setUp(): void {
    this.wasSetUp = true;
  }
}

class TestCaseTest extends TestCase {
   public test: any = null;

  public setUp() {
    this.test = new WasRun('testMethod');
  }

  public testRunning() {
    this.test.run();
    assert.ok(this.test.wasRun);
  }

  public testSetUp() {
    this.test.run();
    assert.ok(this.test.wasSetUp);
  }
}

new TestCaseTest('testRunning').run();
new TestCaseTest('testSetUp').run();

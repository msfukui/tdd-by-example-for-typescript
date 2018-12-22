import * as assert from 'assert';

class TestCase {
  protected name: string = '';

  constructor(name: string) {
    this.name = name;
  }

  public run(): void {
    const method = 'this.' + this.name + '()';
    eval(method);
  }
}

class WasRun extends TestCase {
  public wasRun: boolean = false;

  constructor(name: string) {
    super(name);
  }

  public testMethod(): void {
    this.wasRun = true;
  }
}

class TestCaseTest extends TestCase {
  public testRunning() {
    const test = new WasRun('testMethod');
    assert.ok(! test.wasRun);
    test.run();
    assert.ok(test.wasRun);
  }
}

new TestCaseTest("testRunning").run();

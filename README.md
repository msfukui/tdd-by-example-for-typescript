[![Build Status](https://travis-ci.org/msfukui/tdd-by-example-for-typescript.svg?branch=master)](https://travis-ci.org/msfukui/tdd-by-example-for-typescript)

# TDD by Example for TypeScript

書籍「テスト駆動開発」を TypeScript で読み進めてみるレポジトリです。

## Setup

事前に node.js はセットアップしているものとして。

```
$ npm init
...
$ npm install --save-dev typescript tslint mocha power-assert espower-typescript @types/node @types/mocha
...
```

## A test sample

test/sample.test.ts

```
import assert = require("assert");
import { say } from "../src/sample";

describe("#say()", () => {
  it("Say, Hello world.", () => {
    assert("Hello world." === say("world"));
  });
});
```

src/sample.ts

```
export function say(message: string): string {
  return "Hello " + message + ".";
}
```

## Test

```
$ npm test

> tdd-by-example-for-typescript@0.0.1 test /tdd-by-example-for-typescript
> mocha --require espower-typescript/guess test/**/*.ts




  #say()
    √ Say, Hello world.


  1 passing (18ms)

$
```

A watch mode is:

```
$ npm run test:watch

> tdd-by-example-for-typescript@0.0.1 test /tdd-by-example-for-typescript
> mocha --watch-extensions ts -w --require espower-typescript/guess test/**/*.ts




  #say()
    √ Say, Hello world.


  1 passing (18ms)

([Ctrl] + C)
$ 
```

## Directory Structure

```
+ dist/ : コンパイル後のコード(*.js)と source map ファイル(*.js.map) 
|  |
|  + src/
|  |
|  + test/
|
+ src/ : 本体のコード(*.ts)
|
+ test/ : テストコード(*.test.ts)
```

## References

* [Mocha - the fun, simple, flexible JavaScript test framework](https://mochajs.org/)

* [power-assert-js/power-assert: Power Assert in JavaScript. Provides descriptive assertion messages through standard assert interface. No API is the best API.](https://github.com/power-assert-js/power-assert)

* [TypeScriptのユニットテストをmocha + power-assert で書く - こまどブログ](https://ky-yk-d.hatenablog.com/entry/2018/11/04/091055)

* [コンパイル結果で考えるTypeScriptのimport / export / namespace - stone's throw](http://osamtimizer.hatenablog.com/entry/2018/06/27/222155)

* [TypeScript の型入門 - Qiita](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a)

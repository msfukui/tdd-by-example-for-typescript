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

## Test

```
$ npm test
...
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

* [TypeScriptのユニットテストをmocha + power-assert で書く - こまどブログ](https://ky-yk-d.hatenablog.com/entry/2018/11/04/091055)


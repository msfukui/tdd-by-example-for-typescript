import assert = require("assert");
import { say } from "../src/sample";

describe("#say()", () => {
  it("Say, Hello world.", () => {
    assert("Hello world." === say("world"));
  });
});

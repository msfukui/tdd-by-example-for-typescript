import assert = require("assert");
import Triangle from "../src/triangle";
import TriangleError from "../src/triangle_error";

describe("Triangle module", () => {
  it("三つの辺が等しい場合は正三角形(1)", () => {
    const t = new Triangle(3, 3, 3);
    assert(t.check() === 1);
  });

  it("二つの辺が等しい場合は二等辺三角形(2)", () => {
    const t = new Triangle(4, 4, 5);
    assert(t.check() === 2);
  });

  it("どの辺も等しくない場合は不等辺三角形(3)", () => {
    const t = new Triangle(3, 4, 5);
    assert(t.check() === 3);
  });

  it("どれか一つの辺が他の二つの辺の和と等しいか大きい場合は三角形ではない", () => {
    try {
      const t = new Triangle(3, 4, 7);
      t.check(); // unreachable.
      assert(false); // unreachable.
    } catch(e) {
      if (e instanceof TriangleError) {
        assert(true);
      } else {
        assert(false); // unreachable.
      }
    }
  });

  it("どれかの辺が負の場合は三角形ではない", () => {
    try {
      const t = new Triangle(-1, 4, 5);
      t.check(); // unreachable.
      assert(false); // unreachable.
    } catch(e) {
      if (e instanceof TriangleError) {
        assert(true);
      } else {
        assert(false); // unreachable.
      }
    }
  });
});

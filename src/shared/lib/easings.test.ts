import { describe, expect, it } from "vitest";
import { easeOut } from "./easings";

describe("easeOut", () => {
  it("returns 0 at t=0 and 1 at t=1", () => {
    expect(easeOut(0)).toBe(0);
    expect(easeOut(1)).toBe(1);
  });

  it("is monotonic on [0, 1]", () => {
    let prev = easeOut(0);
    for (let i = 1; i <= 10; i += 1) {
      const current = easeOut(i / 10);
      expect(current).toBeGreaterThanOrEqual(prev);
      prev = current;
    }
  });
});

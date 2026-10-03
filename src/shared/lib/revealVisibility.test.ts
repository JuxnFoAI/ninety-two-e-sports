import { describe, expect, it } from "vitest";

import { isRevealTargetVisible, type RevealRect } from "./revealVisibility";

const rect = (height: number, top = 0, width = 390): RevealRect => ({
  top,
  bottom: top + height,
  left: 0,
  right: width,
  width,
  height,
});

describe("isRevealTargetVisible", () => {
  it("reveals a short section once 12% of it is on screen", () => {
    const viewportHeight = 800;
    const visibleHeight = 800 * 0.125;
    const target = rect(800, viewportHeight - visibleHeight, 400);

    expect(isRevealTargetVisible(target, 400, viewportHeight, 0.12)).toBe(true);
  });

  it("keeps a short section hidden when only a sliver is visible", () => {
    const target = rect(800, 790, 400);

    expect(isRevealTargetVisible(target, 400, 800, 0.12)).toBe(false);
  });

  it("reveals a mobile roster that can never expose 12% of itself", () => {
    const viewportHeight = 700;
    const roster = rect(7000, 0, 390);

    expect(roster.height / viewportHeight).toBeGreaterThan(1 / 0.12);
    expect(isRevealTargetVisible(roster, 390, viewportHeight, 0.12)).toBe(true);
  });

  it("does not reveal a tall roster that is still below the fold", () => {
    const roster = rect(7000, 700, 390);

    expect(isRevealTargetVisible(roster, 390, 700, 0.12)).toBe(false);
  });

  it("ignores a thin peek of a tall roster", () => {
    const viewportHeight = 700;
    const roster = rect(7000, viewportHeight - 40, 390);

    expect(isRevealTargetVisible(roster, 390, viewportHeight, 0.12)).toBe(
      false,
    );
  });
});

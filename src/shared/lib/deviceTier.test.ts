import { describe, expect, it } from "vitest";
import { classifyDeviceTier } from "./deviceTier";

describe("classifyDeviceTier", () => {
  it("rates a desktop with plenty of memory and cores as high", () => {
    expect(
      classifyDeviceTier({
        memoryGb: 8,
        cores: 12,
        webgl2: true,
        renderer: "ANGLE (NVIDIA GeForce RTX 3060)",
      }),
    ).toBe("high");
  });

  it("rates a 4 GB Android phone as mid", () => {
    expect(
      classifyDeviceTier({
        memoryGb: 4,
        cores: 8,
        webgl2: true,
        renderer: "Adreno (TM) 619",
      }),
    ).toBe("mid");
  });

  it("rates an iPhone, which hides its memory, as mid", () => {
    expect(
      classifyDeviceTier({ cores: 6, webgl2: true, renderer: "Apple GPU" }),
    ).toBe("mid");
  });

  it("rates a 2 GB octa-core phone as low", () => {
    expect(classifyDeviceTier({ memoryGb: 2, cores: 8, webgl2: true })).toBe(
      "low",
    );
  });

  it("rates devices without WebGL2 or with a software GPU as low", () => {
    expect(classifyDeviceTier({ memoryGb: 8, cores: 8, webgl2: false })).toBe(
      "low",
    );
    expect(
      classifyDeviceTier({
        memoryGb: 8,
        cores: 8,
        webgl2: true,
        renderer: "Google SwiftShader",
      }),
    ).toBe("low");
  });

  it("honours data saver regardless of hardware", () => {
    expect(
      classifyDeviceTier({
        memoryGb: 8,
        cores: 16,
        webgl2: true,
        saveData: true,
      }),
    ).toBe("low");
  });
});

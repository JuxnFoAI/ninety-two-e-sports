export type DeviceTier = "high" | "mid" | "low";

export interface DeviceSignals {
  /** `navigator.deviceMemory` in GB. Chromium only, capped at 8. */
  memoryGb?: number;
  cores?: number;
  saveData?: boolean;
  webgl2: boolean;
  /** Unmasked GPU renderer string, when the browser exposes it. */
  renderer?: string;
}

const SOFTWARE_RENDERER =
  /swiftshader|llvmpipe|softpipe|software|basic render/i;

/**
 * Browsers that hide memory (Safari, Firefox) are judged by cores and GPU
 * only, so a missing value never demotes a device on its own.
 */
export const classifyDeviceTier = ({
  memoryGb,
  cores,
  saveData = false,
  webgl2,
  renderer,
}: DeviceSignals): DeviceTier => {
  if (saveData || !webgl2) {
    return "low";
  }
  if (renderer && SOFTWARE_RENDERER.test(renderer)) {
    return "low";
  }
  if (memoryGb !== undefined && memoryGb < 4) {
    return "low";
  }
  if (cores !== undefined && cores < 4) {
    return "low";
  }
  if ((memoryGb ?? 8) >= 8 && (cores ?? 0) >= 8) {
    return "high";
  }
  return "mid";
};

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

const probeWebGl2 = (): Pick<DeviceSignals, "webgl2" | "renderer"> => {
  const gl = document.createElement("canvas").getContext("webgl2");
  if (!gl) {
    return { webgl2: false };
  }
  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = String(
    gl.getParameter(
      debugInfo ? debugInfo.UNMASKED_RENDERER_WEBGL : gl.RENDERER,
    ) ?? "",
  );
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return { webgl2: true, renderer };
};

let cachedTier: DeviceTier | null = null;

/** Rough hardware class of the current device, measured once per page. */
export const detectDeviceTier = (): DeviceTier => {
  if (cachedTier) {
    return cachedTier;
  }
  if (typeof window === "undefined") {
    return "low";
  }
  const nav = navigator as NavigatorWithHints;
  cachedTier = classifyDeviceTier({
    memoryGb: nav.deviceMemory,
    cores: nav.hardwareConcurrency || undefined,
    saveData: nav.connection?.saveData,
    ...probeWebGl2(),
  });
  return cachedTier;
};

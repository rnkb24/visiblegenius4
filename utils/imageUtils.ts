/**
 * Detects the aspect ratio of an image from a base64 string.
 * @param base64 The base64 encoded image string.
 * @returns A promise that resolves to the detected aspect ratio string (e.g., "16:9", "4:3").
 */
export const detectAspectRatio = (base64: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const ratio = img.width / img.height;
      if (ratio > 1.5) resolve("16:9");
      else if (ratio > 1.1) resolve("4:3");
      else if (ratio < 0.6) resolve("9:16");
      else if (ratio < 0.9) resolve("3:4");
      else resolve("1:1");
    };
    img.src = base64;
  });
};

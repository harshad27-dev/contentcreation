const WATERMARK_API_BASE_URL =
  process.env.NEXT_PUBLIC_WATERMARK_API_URL || "http://localhost:8000";

type AlgorithmName = "simple" | "morphological" | "advanced";

export interface WatermarkAlgorithm {
  name: AlgorithmName;
  description: string;
  speed: string;
  quality: string;
}

async function parseError(response: Response) {
  try {
    const data = (await response.json()) as { error?: string; message?: string };
    return data.error || data.message || "Watermark request failed";
  } catch {
    return "Watermark request failed";
  }
}

async function getBlob(response: Response) {
  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.blob();
}

export const watermarkService = {
  async checkHealth() {
    try {
      const response = await fetch(`${WATERMARK_API_BASE_URL}/health`, {
        method: "GET",
      });

      return response.ok;
    } catch {
      return false;
    }
  },

  async getAlgorithms(): Promise<WatermarkAlgorithm[]> {
    try {
      const response = await fetch(`${WATERMARK_API_BASE_URL}/algorithms`, {
        method: "GET",
      });

      if (!response.ok) {
        return [];
      }

      const data = (await response.json()) as {
        algorithms?: WatermarkAlgorithm[];
      };

      return data.algorithms || [];
    } catch {
      return [];
    }
  },

  async removeWatermark(
    file: File,
    sensitivity: number,
    algorithm: AlgorithmName
  ) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("sensitivity", sensitivity.toString());
    formData.append("algorithm", algorithm);

    const response = await fetch(`${WATERMARK_API_BASE_URL}/remove-watermark`, {
      method: "POST",
      body: formData,
    });

    return getBlob(response);
  },

  async previewWatermarkDetection(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${WATERMARK_API_BASE_URL}/preview-detection`, {
      method: "POST",
      body: formData,
    });

    return getBlob(response);
  },
};

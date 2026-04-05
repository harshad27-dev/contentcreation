import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

type RequestOptions = RequestInit & {
  requiresAuth?: boolean;
};

export async function fetchApi(endpoint: string, options: RequestOptions = {}) {
  const { requiresAuth = true, headers, ...customConfig } = options;

  const config: RequestInit = {
    ...customConfig,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (requiresAuth) {
    const token = Cookies.get("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "An error occurred");
  }

  return data;
}

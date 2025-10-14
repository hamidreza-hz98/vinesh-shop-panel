import { parseCookies } from "nookies";

export async function fetchWithAuth(url, options = {}) {
  const cookies = parseCookies();
  const token = cookies.token;
  const isFormData = options.body instanceof FormData;

  if (options.query && typeof options.query === "object") {
    const queryString = new URLSearchParams(options.query).toString();
    url += url.includes("?") ? `&${queryString}` : `?${queryString}`;
  }

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(!isFormData ? { "Content-Type": "application/json" } : {}),
  };

  const config = {
    method: options.method || "GET",
    headers,
    ...Object.fromEntries(Object.entries(options).filter(([key]) => key !== "query" && key !== "body")),
  };

  if (
    options.body &&
    typeof options.body === "object" &&
    !isFormData &&
    config.method !== "HEAD"
  ) {
    config.body = JSON.stringify(options.body);
  } else if (isFormData && config.method !== "GET" && config.method !== "HEAD") {
    config.body = options.body;
  }


  
  
  try {
    const res = await fetch(url, config);
    const data = await res.json();
    
    if (!res.ok) {
      const error = new Error(data?.message || "Request failed");
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    throw err;
  }
}

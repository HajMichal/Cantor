import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:4000";

export async function apiCall<T>(
  endpoint: string,
  method = "GET",
  body?: Record<string, unknown>,
  headers?: Record<string, string>
): Promise<T> {
  try {
    const response = await axios({
      method,
      url: `${API_URL}/${endpoint}`,
      data: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response);
    throw err;
  }
}

import apiClient from "./apiClient";

export async function getThreads(page = 1) {
  const res = await apiClient.get("/api/threads", {
    params: { page },
  });
  return res.data;
}

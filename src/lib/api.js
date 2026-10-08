const API_URL = "https://news-api-v2.vercel.app";

export async function getNews(limit = 12) {
  try {
    const res = await fetch(`${API_URL}/api/news?limit=${limit}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const result = await res.json();

    return result.data || [];
  } catch (error) {
    console.error("News API Error:", error);
    return [];
  }
}
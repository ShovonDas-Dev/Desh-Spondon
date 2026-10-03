
export async function ApiService<T = any>(
  endpoint: string,
  limit: number | null = null,
  revalidate: number = 3600
): Promise<T | null> {
  try {
    // 1. URL-er sathe limit ache kina check kore final URL toiri:
    let url = endpoint;
    if (limit) {
      const separator = url.includes("?") ? "&" : "?";
      url = `${url}${separator}limit=${limit}`;
    }

    // 2. Data fetch ebong JSON parsing:
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return null;

    const data: T = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}
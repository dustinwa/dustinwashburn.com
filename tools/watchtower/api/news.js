export default async function handler(req, res) {
    const apiKey = process.env.NEWSAPI_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching news: ${response.statusText}`);
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching news data:", error.message);
        res.status(500).json({ error: "Failed to fetch news data" });
    }
}

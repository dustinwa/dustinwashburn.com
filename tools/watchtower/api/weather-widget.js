export default function handler(req, res) {
    const cityid = "3352136"; // City ID for Windhoek, Namibia
    const appid = process.env.OPENWEATHERMAP_API_KEY;

    if (!appid) {
        res.status(500).json({ error: "API key is not configured on the server." });
        return;
    }

    res.status(200).json({ cityid, appid });
}

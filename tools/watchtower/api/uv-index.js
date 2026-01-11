let cachedUVIndex = null;
let lastFetchTime = null;

export default async function handler(req, res) {
    const { lat, lon } = req.query;
    const apiKey = process.env.WEATHERBIT_API_KEY;

    if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    const cacheDuration = 3600000; // 1 hour in milliseconds

    if (cachedUVIndex && lastFetchTime && Date.now() - lastFetchTime < cacheDuration) {
        return res.status(200).json({ uvIndex: cachedUVIndex });
    }

    try {
        const response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`);
        if (!response.ok) {
            throw new Error(`Weatherbit API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            throw new Error("No UV Index data available.");
        }

        cachedUVIndex = data.data[0].uv;
        lastFetchTime = Date.now();

        res.status(200).json({ uvIndex: cachedUVIndex });
    } catch (error) {
        console.error("Error fetching UV Index from Weatherbit:", error.message);
        res.status(500).json({ error: "Failed to fetch UV Index data." });
    }
}

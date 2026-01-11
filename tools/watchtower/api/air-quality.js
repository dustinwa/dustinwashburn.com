export default async function handler(req, res) {
    const { lat, lon } = req.query;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    if (!apiKey) {
        res.status(500).json({ error: "API key is not configured on the server." });
        return;
    }

    if (!lat || !lon) {
        res.status(400).json({ error: "Latitude and longitude are required." });
        return;
    }

    try {
        const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(airQualityUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching air quality data:", error.message);
        res.status(500).json({ error: "Failed to fetch air quality data." });
    }
}

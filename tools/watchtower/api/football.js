export default async function handler(req, res) {
    try {
        const apiUrl = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/alabama";
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Extract next game data
        const nextEvent = data.team.nextEvent?.[0] || {};
        const nextGame = {
            date: nextEvent.date ? new Date(nextEvent.date).toLocaleString("en-US", { timeZone: "UTC" }) : "TBD",
            opponent: nextEvent.competitions?.[0]?.competitors?.find((c) => c.homeAway === "home")?.team?.displayName || "Unknown",
            location: nextEvent.competitions?.[0]?.venue?.fullName || "Unknown",
        };

        // Extract most recent game data
        const recentEvent = data.team.previousEvent?.[0];
        const mostRecentGame = recentEvent
            ? {
                  date: new Date(recentEvent.date).toLocaleString("en-US", { timeZone: "UTC" }),
                  alabamaScore: recentEvent.competitions?.[0]?.competitors?.find((c) => c.team?.nickname === "Alabama")
                      ?.score || 0,
                  opponent: recentEvent.competitions?.[0]?.competitors?.find((c) => c.team?.nickname !== "Alabama")
                      ?.team?.displayName || "Unknown",
                  opponentScore: recentEvent.competitions?.[0]?.competitors?.find((c) => c.team?.nickname !== "Alabama")
                      ?.score || 0,
                  result:
                      recentEvent.competitions?.[0]?.competitors?.find((c) => c.team?.nickname === "Alabama")
                          ?.winner === true
                          ? "WON"
                          : "LOST",
              }
            : {
                  date: "No data",
                  alabamaScore: "N/A",
                  opponent: "N/A",
                  opponentScore: "N/A",
                  result: "N/A",
              };

        // Check if a game is currently being played
        const playingNow =
            nextEvent.status?.type?.state === "in" || nextEvent.status?.type?.state === "pre";

        res.status(200).json({
            playingNow,
            mostRecentGame,
            nextGame,
        });
    } catch (error) {
        console.error("Error fetching football data:", error.message);
        res.status(500).json({ error: "Failed to fetch Alabama football data." });
    }
}

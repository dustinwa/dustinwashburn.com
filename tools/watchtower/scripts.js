document.addEventListener("DOMContentLoaded", () => {
    const cityLat = -22.5594; // Latitude for Windhoek
    const cityLon = 17.0832; // Longitude for Windhoek

    // Display current date and time
    const updateDateTime = () => {
        const now = new Date();
        document.getElementById("date-time").textContent = now.toLocaleString();
    };
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Load Weather Data
    const loadWeatherData = async () => {
        try {
            const response = await fetch(`/api/weather?lat=${cityLat}&lon=${cityLon}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            document.getElementById("sunrise").textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
            document.getElementById("sunset").textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
            document.getElementById("wind").textContent = `Wind: ${data.wind.speed} m/s, ${data.wind.deg}°`;
            document.getElementById("pressure").textContent = `Pressure: ${data.main.pressure} hPa`;
            document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById("precipitation").textContent = `Precipitation: ${
                data.rain ? `${data.rain['1h']} mm` : data.snow ? `${data.snow['1h']} mm` : "0 mm"
            }`;
        } catch (error) {
            console.error("Error fetching weather data:", error.message);
        }
    };

    // Load UV Index
    const loadUVIndex = async () => {
        try {
            const response = await fetch(`/api/uv-index?lat=${cityLat}&lon=${cityLon}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            document.getElementById("uv-index").textContent = `UV Index: ${data.uvIndex}`;
        } catch (error) {
            console.error("Error fetching UV index data:", error.message);
            document.getElementById("uv-index").textContent = "UV Index: Error";
        }
    };

    // Load Air Quality Index (AQI)
    const loadAirQualityData = async () => {
        try {
            const response = await fetch(`/api/air-quality?lat=${cityLat}&lon=${cityLon}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            const aqiDescriptions = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
            const aqiLevel = data.list[0].main.aqi;
            document.getElementById("aqi").textContent = `Air Quality: ${aqiDescriptions[aqiLevel - 1]}`;
        } catch (error) {
            console.error("Error fetching air quality data:", error.message);
            document.getElementById("aqi").textContent = "Air Quality: Error";
        }
    };

    // Load Weather Widget
    const loadWeatherWidget = async () => {
        try {
            const response = await fetch('/api/weather-widget');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const widgetConfig = await response.json();
            window.myWidgetParam = [];
            window.myWidgetParam.push({
                id: 22,
                cityid: widgetConfig.cityid,
                appid: widgetConfig.appid,
                units: 'imperial',
                containerid: 'openweathermap-widget-22',
            });

            const script = document.createElement('script');
            script.async = true;
            script.charset = "utf-8";
            script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
            document.head.appendChild(script);
        } catch (error) {
            console.error("Error loading weather widget:", error.message);
        }
    };

    // Load Earthquake Data
    const loadEarthquakeData = async () => {
        try {
            const response = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            const earthquakeList = document.getElementById("earthquake-list");
            earthquakeList.innerHTML = data.features.length
                ? data.features.slice(0, 5).map(
                      (feature) =>
                          `<li><a href="${feature.properties.url}" target="_blank">${feature.properties.title}</a>
                          <p>Time: ${new Date(feature.properties.time).toLocaleString()}</p></li>`
                  ).join("")
                : "<p>No significant earthquakes reported this week.</p>";
        } catch (error) {
            console.error("Error fetching earthquake data:", error.message);
        }
    };

    // Load Space Weather Data
    const loadSpaceWeatherData = async () => {
        try {
            // NOAA Scales
            const noaaScalesResponse = await fetch("https://services.swpc.noaa.gov/products/noaa-scales.json");
            const noaaScales = await noaaScalesResponse.json();
            document.getElementById("noaa-scales").textContent = JSON.stringify(noaaScales, null, 2);

            // NOAA Advisory Outlook
            const outlookResponse = await fetch("https://services.swpc.noaa.gov/text/advisory-outlook.txt");
            const outlookText = await outlookResponse.text();
            document.getElementById("advisory-outlook").textContent = outlookText;

            // NOAA Alerts
            const alertsResponse = await fetch("https://services.swpc.noaa.gov/products/alerts.json");
            const alerts = await alertsResponse.json();
            document.getElementById("space-alerts").textContent = JSON.stringify(alerts, null, 2);
        } catch (error) {
            console.error("Error fetching space weather data:", error.message);
        }
    };

	// Condensed Space Weather Advisory Function
	const loadSpaceWeatherAdvisory = async () => {
		try {
			const response = await fetch("https://services.swpc.noaa.gov/text/advisory-outlook.txt");
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const text = await response.text();

			// Extract key sections
			const issuedMatch = text.match(/:Issued:\s*(.+)/);
			const issued = issuedMatch ? issuedMatch[1] : "Unavailable";

			const summaryMatch = text.match(/Summary For [\s\S]*?(?=Outlook)/);
			const summaryLines = summaryMatch
				? summaryMatch[0]
					  .split("\n")
					  .filter(line => line.trim() && /R\d|G\d/.test(line))
				: ["No significant activity recorded."];

			const outlookMatch = text.match(/Outlook For [\s\S]*?(?=$)/);
			const outlookLines = outlookMatch
				? outlookMatch[0]
					  .split("\n")
					  .filter(line => line.trim() && /R\d|G\d/.test(line))
				: ["No significant activity forecasted."];

			// Condense and format the data
			const condensedSummary = summaryLines.map(line => {
				const [event, ...details] = line.split(":");
				return `<strong>${event.trim()}</strong>: ${details.join(":").trim()}`;
			});

			const condensedOutlook = outlookLines.map(line => {
				const [event, ...details] = line.split(":");
				return `<strong>${event.trim()}</strong>: ${details.join(":").trim()}`;
			});

			// Update HTML
			document.getElementById("advisory-issued").textContent = issued;

			const summaryList = document.getElementById("advisory-summary-list");
			summaryList.innerHTML = condensedSummary.map(item => `<li>${item}</li>`).join("");

			const outlookList = document.getElementById("advisory-outlook-list");
			outlookList.innerHTML = condensedOutlook.map(item => `<li>${item}</li>`).join("");

		} catch (error) {
			console.error("Error loading condensed space weather advisory:", error.message);
			document.getElementById("advisory-outlook").innerHTML =
				"<p>Failed to load the advisory. Please try again later.</p>";
		}
	};

    // Load Football Data
    const loadFootballData = async () => {
        try {
            const response = await fetch("/api/football");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();

            document.getElementById("playing-now").innerHTML = `<b style="color:${data.playingNow ? 'blue' : 'red'}">${data.playingNow ? 'YES' : 'NO'}</b>`;
            document.getElementById("recent-game").textContent = `Most Recent Game: ${data.mostRecentGame.date}, ${data.mostRecentGame.time}, ${data.mostRecentGame.alabamaScore} v ${data.mostRecentGame.opponentScore} ${data.mostRecentGame.result}`;
            document.getElementById("upcoming-game").textContent = `Next Game: ${data.upcomingGame.date}, ${data.upcomingGame.time} vs ${data.upcomingGame.opponent} at ${data.upcomingGame.location}`;
        } catch (error) {
            console.error("Error fetching football data:", error.message);
        }
    };
	
	// Load News Data
	const loadNewsData = async () => {
		try {
			const response = await fetch('/api/news');
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			const newsTicker = document.getElementById("news-ticker");
			
			// Clear existing content
			newsTicker.innerHTML = '<h3>Top News</h3>';

			if (data.articles && data.articles.length > 0) {
				const ul = document.createElement("ul");
				data.articles.slice(0, 5).forEach(article => {
					const li = document.createElement("li");
					li.innerHTML = `
						<a href="${article.url}" target="_blank">${article.title}</a>
						<p>${article.description || "No description available"}</p>
					`;
					ul.appendChild(li);
				});
				newsTicker.appendChild(ul);
			} else {
				newsTicker.innerHTML += "<p>No news available at the moment.</p>";
			}
		} catch (error) {
			console.error("Error fetching news data:", error.message);
			document.getElementById("news-ticker").innerHTML = "<p>Failed to load news. Please try again later.</p>";
		}
	};

	const updateAlertImages = () => {
		// Example statuses for demo (update these dynamically in the future)
		const statuses = {
			earthquake: "offline", // Options: "offline", "online", "detected", "imminent"
			flood: "offline", // Options: "offline", "online", "imminent"
			hurricane: "offline", // Options: "offline", "online", "1", "2", "3", "4", "5"
			meteor: "offline", // Options: "offline", "online", "imminent"
			tide: "offline", // Options: "offline", "scheduled", "soon", "playing"
		};

		const updateImage = (alertType, status) => {
			// Hide all images for the alert type
			const images = document.querySelectorAll(`#${alertType}-alert`);
			images.forEach(img => img.classList.add("hidden"));

			// Show the correct image
			const activeImage = document.querySelector(`#${alertType}-alert[src*="${status}.jpg"]`);
			if (activeImage) {
				activeImage.classList.remove("hidden");
			} else {
				console.error(`No matching image for ${alertType} with status "${status}"`);
			}
		};

		// Update images for each alert type
		updateImage("earthquake", statuses.earthquake);
		updateImage("flood", statuses.flood);
		updateImage("hurricane", statuses.hurricane);
		updateImage("meteor", statuses.meteor);
		updateImage("tide", statuses.tide);
	};


    // Initialize all modules
    loadWeatherData();
    loadUVIndex();
    loadAirQualityData();
    loadWeatherWidget();
    loadEarthquakeData();
    loadSpaceWeatherData();
	loadSpaceWeatherAdvisory();
    loadFootballData();
	loadNewsData();
	updateAlertImages();
});

document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const jobsData = JSON.parse(localStorage.getItem('jobsData'));

    if (jobsData) {
        jobsData.forEach(job => {
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(job.location)}&key=YOUR_API_KEY`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(`Geocoding result for ${job.location}:`, data);
                    if (data.results && data.results.length > 0) {
                        const location = data.results[0].geometry;
                        L.marker([location.lat, location.lng]).addTo(map)
                            .bindPopup(job.title);
                    } else {
                        console.warn(`No results for location: ${job.location}`);
                    }
                })
                .catch(error => console.error(`Error fetching geolocation for ${job.location}:`, error));
        });
    }
});

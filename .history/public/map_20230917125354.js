document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([31.9522, 35.2332], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const jobsData = JSON.parse(localStorage.getItem('jobsData'));

    if (jobsData) {
        jobsData.forEach((job, index) => {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(job.location)}`)
                .then(response => response.json())
                .then(geoData => {
                    if (geoData.length > 0) {
                        const location = geoData[0];
                        L.marker([location.lat, location.lon]).addTo(map)
                            .bindPopup(job.title);
                    } else {
                        console.error(`Error geocoding location for job at index ${index}:`, job.location);
                    }
                })
                .catch(error => console.error(`Error for job at index ${index}:`, error));
        });
    }
});

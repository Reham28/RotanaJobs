document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const jobsData = JSON.parse(localStorage.getItem('jobsData'));

    if (jobsData) {
        jobsData.forEach(job => {
            fetch(`https://api.geocod.io/v1.6/geocode?q=${encodeURIComponent(job.location)}&api_key=c2e06e76bcbac7a6072ab1c596cc6625b1510ae`)
                .then(response => response.json())
                .then(data => {
                    if (data.results && data.results.length > 0) {
                        const location = data.results[0].location;
                        L.marker([location.lat, location.lng]).addTo(map)
                            .bindPopup(job.title);
                    }
                })
                .catch(error => console.error('Error fetching geolocation:', error));
        });
    }
});

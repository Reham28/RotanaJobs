document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const jobsData = JSON.parse(localStorage.getItem('jobsData'));

    if (jobsData) {
        jobsData.forEach(job => {
            fetch(`https://api.geocod.io/v1.6/geocode?q=${encodeURIComponent(job.location)}&api_key=6a60766e450a757e8b5e949de4a988eeeec66e0`)
                .then(response => response.json())
                .then(data => {
                    const location = data.results[0].geometry;
                    L.marker([location.lat, location.lng]).addTo(map)
                        .bindPopup(job.title);
                })
                .catch(error => console.error('Error fetching geolocation:', error));
        });
    }
});

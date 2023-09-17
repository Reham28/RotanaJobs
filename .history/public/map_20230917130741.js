document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const jobsData = JSON.parse(localStorage.getItem('jobsData'));

    if (jobsData) {
        jobsData.forEach(job => {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${job.location}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && data.length > 0) {
                        const location = data[0];
                        L.marker([location.lat, location.lon]).addTo(map)
                            .bindPopup(job.title);
                    }
                })
                .catch(error => console.error('Error fetching geolocation:', error));
        });
    }
});

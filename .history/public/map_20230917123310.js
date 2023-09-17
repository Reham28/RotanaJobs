document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([31.9522, 35.2332], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const jobsData = JSON.parse(localStorage.getItem('jobsData'));

    if (jobsData) {
        jobsData.forEach(job => {
            L.marker([job.latitude, job.longitude]).addTo(map)
                .bindPopup(job.title);
        });
    }
});

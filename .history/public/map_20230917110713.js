document.addEventListener('DOMContentLoaded', function() {

    fetch('/jobs')
        .then(response => response.json())
        .then(jobs => {
            const map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 0, lng: 0 }, // Set the initial center of the map
                zoom: 2, // Set the initial zoom level
            });

            const geocoder = new google.maps.Geocoder();

            // Iterate through the jobs and geocode the locations
            jobs.forEach(job => {
                geocoder.geocode({ address: job.location }, (results, status) => {
                    if (status === 'OK') {
                        const location = results[0].geometry.location;

                        const marker = new google.maps.Marker({
                            position: location,
                            map: map,
                            title: job.title,
                        });

                        const infowindow = new google.maps.InfoWindow({
                            content: job.title,
                        });

                        marker.addListener('click', () => {
                            infowindow.open(map, marker);
                        });
                    } else {
                        console.error('Geocode was not successful for the following reason: ' + status);
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching jobs:', error));
});

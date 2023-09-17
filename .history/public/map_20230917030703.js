document.addEventListener('DOMContentLoaded', () => {
    fetch('/jobs')
      .then(response => response.json())
      .then(data => {
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: { lat: 31.9632, lng: 35.9304 },
        });
  
        data.forEach(job => {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: job.location }, (results, status) => {
            if (status === 'OK' && results[0]) {
              new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: job.title,
              });
            }
          });
        });
      })
      .catch(error => console.error('Error:', error));
  });
  
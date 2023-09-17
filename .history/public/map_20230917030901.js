document.addEventListener('DOMContentLoaded', () => {
    const rotanaMap = document.getElementById('map');
  
    fetch('/jobs')
      .then(response => response.json())
      .then(data => {
        const map = new google.maps.Map(rotanaMap, {
          zoom: 6,
          center: { lat: 31.9632, lng: 35.9304 },
        });
  
        data.forEach(job => {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: job.location }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: job.title,
              });
  
              const infowindow = new google.maps.InfoWindow({
                content: `<strong>${job.title}</strong><br>${job.location}`,
              });
  
              marker.addListener('click', () => {
                infowindow.open(map, marker);
              });
            }
          });
        });
      })
      .catch(error => console.error('Error:', error));
  });
  
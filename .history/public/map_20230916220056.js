function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 },
      zoom: 2
    });
  
    fetch('/jobs')
      .then(response => response.json())
      .then(data => {
        data.forEach(job => {
          const location = job.location;
  
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: location }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: job.title
              });
  
              const infowindow = new google.maps.InfoWindow({
                content: job.title
              });
  
              marker.addListener('click', () => {
                infowindow.open(map, marker);
              });
            }
          });
        });
      })
      .catch(error => console.error('Error:', error));
  }
  
function initMap() {
    fetch('/jobs')
      .then(response => response.json())
      .then(data => {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: 0, lng: 0 },
          zoom: 2
        });
  
        data.forEach(job => {
          const infowindow = new google.maps.InfoWindow({
            content: `<h3>${job.title}</h3><p>${job.location}</p>`
          });
  
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: job.location }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: job.title
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
  
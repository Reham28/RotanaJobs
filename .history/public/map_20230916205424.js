function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 },
      zoom: 2
    });
  
    // Assuming 'data' contains job information with 'title' and 'location' properties
    data.forEach(job => {
      const jobTitle = job.title;
      const jobLocation = job.location;
  
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: jobLocation }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            title: jobTitle
          });
  
          const infoWindow = new google.maps.InfoWindow({
            content: jobTitle
          });
  
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        }
      });
    });
  }
  
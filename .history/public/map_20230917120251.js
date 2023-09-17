function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: { lat: 25, lng: 45 } // Adjust this to fit your desired default view
    });
  
    fetch('http://localhost:3000/jobs')
      .then(response => response.json())
      .then(data => {
        data.forEach(job => {
          // Split the location string into latitude and longitude
          const [lat, lng] = job.location.split(',').map(coord => parseFloat(coord.trim()));
  
          const marker = new google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: job.title
          });
  
          const infowindow = new google.maps.InfoWindow({
            content: `<h3>${job.title}</h3>`
          });
  
          marker.addListener('click', () => {
            infowindow.open(map, marker);
          });
        });
      })
      .catch(error => console.error('Error:', error));
  }
  
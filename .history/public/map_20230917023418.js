let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 31.9632, lng: 35.9304 },
    zoom: 8
  });}
document.addEventListener('DOMContentLoaded', () => {
  
    
      fetch('/jobs') // Assuming this endpoint returns job data in JSON format
        .then(response => response.json())
        .then(data => {
          data.forEach(job => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: job.location }, (results, status) => {
              if (status === 'OK' && results[0]) {

                const marker = new google.maps.Marker({
                  position: results[0].geometry.location,
                  map: map,
                  title: job.title
                });
                console.log(job.title,position);
              }
              console.log(data)
            });
          });
        })
        .catch(error => console.error('Error:', error));
    
  });
 
  









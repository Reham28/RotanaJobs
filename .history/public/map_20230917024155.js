document.addEventListener('DOMContentLoaded', () => {
    const rotanaMap = document.getElementById('map');
  
    fetch('/jobs')
      .then(response => response.json())
      .then(data => {
        data.forEach(job => {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: job.location }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const lat = results[0].geometry.location.lat();
              const lng = results[0].geometry.location.lng();
  
              const markerUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  
              const marker = document.createElement('iframe');
              marker.src = markerUrl;
              marker.width = '300';
              marker.height = '150';
              marker.allowfullscreen = '';
  
              rotanaMap.appendChild(marker);
            }
          });
        });
      })
      .catch(error => console.error('Error:', error));
  });
  
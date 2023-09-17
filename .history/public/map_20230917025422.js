document.addEventListener('DOMContentLoaded', () => {
    const rotanaMap = document.getElementById('rotanaMap');
  
    fetch('/jobs')
      .then(response => response.json())
      .then(data => {
        let mapUrl = "https://www.google.com/maps/embed/v1/view?key=AIzaSyBrvieYMzggsisfSJDbzEA2GNIc7jGKxcU&zoom=6&maptype=roadmap";
  
        const markers = [];
  
        data.forEach(job => {
          mapUrl += `&q=${encodeURIComponent(job.location)}`;
  
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: job.location }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const marker = new google.maps.Marker({
                position: results[0].geometry.location,
                title: job.title,
              });
  
              markers.push(marker);
  
              const infowindow = new google.maps.InfoWindow({
                content: `<strong>${job.title}</strong><br>${job.location}`,
              });
  
              marker.addListener('click', () => {
                infowindow.open(map, marker);
              });
            }
          });
        });
  
        const mapIframe = document.createElement('iframe');
        mapIframe.src = mapUrl;
        mapIframe.width = '100%';
        mapIframe.height = '500';
        mapIframe.frameborder = '0';
        mapIframe.allowfullscreen = '';
  
        rotanaMap.appendChild(mapIframe);
  
        // Iframe is loaded, add markers to the map
        mapIframe.onload = function() {
          const map = mapIframe.contentWindow.google.maps;
          const bounds = new map.LatLngBounds();
  
          markers.forEach(marker => {
            marker.setMap(map);
            bounds.extend(marker.position);
          });
  
          map.fitBounds(bounds);
        };
      })
      .catch(error => console.error('Error:', error));
  });
  
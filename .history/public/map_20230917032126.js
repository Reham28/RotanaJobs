const geocoder = new google.maps.Geocoder();

jobs.forEach(job => {
  geocoder.geocode({ address: job.location }, (results, status) => {
    if (status === 'OK' && results[0]) {
      const coordinates = results[0].geometry.location;
      job.coordinates = { lat: coordinates.lat(), lng: coordinates.lng() };
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
    const map = new google.maps.Map(document.getElementById('mab'), {
      zoom: 6,
      center: { lat: 31.9632, lng: 35.9304 },
    });
  
    jobs.forEach(job => {
      new google.maps.Marker({
        position: job.coordinates,
        map: map,
        title: job.title,
      });
    });
  });
  
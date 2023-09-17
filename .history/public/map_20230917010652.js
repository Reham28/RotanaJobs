let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 2
});  

  // Assuming you have 'jobs' data already populated
  // jobs should be an array of objects with 'title' and 'location' properties
  fetch('/jobs')
  .then(response => response.json())
  .then(data => {
    data.forEach(job => {
        const marker = new google.maps.Marker({
            position: job.location,
            map: map,
            title: job.title
  
    });
  })
  .catch(error => console.error('Error:', error));
 
  });
}

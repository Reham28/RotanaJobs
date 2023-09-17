let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    mapTypeId: 'terrain'
  });

  // Assuming you have jobData containing title and location properties
  let jobData=fetch('/jobs')
  .then(response => response.json())
  .then(data);
  console.log(jobData);
  jobData.forEach(job => {
    const marker = new google.maps.Marker({
      position: job.location,
      map: map,
      title: job.title
    });
  });
}


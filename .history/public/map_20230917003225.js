function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 }, // Centered at the equator and prime meridian
      zoom: 2, // Zoom level to show the entire world
      mapTypeId: 'terrain' // Optional: Set the map type to terrain view
    });
  }
  function showJobs(jobsData) {
    const countrySelect = document.getElementById('countrySelect');
    const selectedCountry = countrySelect.value.split(',');
  
    const latitude = parseFloat(selectedCountry[0]);
    const longitude = parseFloat(selectedCountry[1]);
  
    map.setCenter({ lat: latitude, lng: longitude });
    map.setZoom(5);
  
    jobsData.forEach(job => {
      const jobLocation = { lat: parseFloat(job.lat), lng: parseFloat(job.lng) };
  
      const marker = new google.maps.Marker({
        position: jobLocation,
        map: map,
        title: job.title
      });
    });
  }

showJobs(jobsData);
  
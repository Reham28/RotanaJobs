document.addEventListener('DOMContentLoaded', () => {
    const rotanaMap = document.getElementById('map');
  
    fetch('/jobs')
      .then(response => response.json())
      .then(data => {
        let mapUrl = "https://maps.google.com/maps?q=";
  
        data.forEach(job => {
          mapUrl += `${encodeURIComponent(job.location)}&`;
        });
  
        mapUrl += "&output=embed";
  
        const mapIframe = document.createElement('iframe');
        mapIframe.src = mapUrl;
        mapIframe.width = '100%';
        mapIframe.height = '500';
        mapIframe.frameborder = '0';
        mapIframe.allowfullscreen = '';
  
        rotanaMap.appendChild(mapIframe);
      })
      .catch(error => console.error('Error:', error));
  });
  
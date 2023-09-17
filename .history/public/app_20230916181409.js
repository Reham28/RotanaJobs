document.addEventListener('DOMContentLoaded', () => {
    const jobTable = document.getElementById('jobTable').getElementsByTagName('tbody')[0];
  
    fetch('/jobs')
      .then(response => response.json())
      .then(data => {
        data.forEach(job => {
          const row = jobTable.insertRow();
          const titleCell = row.insertCell(0);
          const locationCell = row.insertCell(1);
  
          titleCell.innerText = job.title;
          locationCell.innerText = job.location;
        });
      })
      .catch(error => console.error('Error:', error));
  });
  
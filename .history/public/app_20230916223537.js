document.addEventListener('DOMContentLoaded', () => {
    const jobTable = document.getElementById('jobTable').getElementsByTagName('tbody');
  
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
  function searchJobs() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const jobTable = document.getElementById('jobTable').getElementsByTagName('tbody')[0];
    const rows = jobTable.getElementsByTagName('tr');
  
    for (let i = 0; i < rows.length; i++) {
      const title = rows[i].getElementsByTagName('td')[0].innerText.toLowerCase();
      const location = rows[i].getElementsByTagName('td')[1].innerText.toLowerCase();
      
      if (title.includes(searchValue) || location.includes(searchValue)) {
        rows[i].style.display = '';
      } else {
        rows[i].style.display = 'none';
      }
    }
  }
  
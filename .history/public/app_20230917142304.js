document.addEventListener('DOMContentLoaded', () => {
    const jobTable = document.getElementById('jobTable').getElementsByTagName('tbody')[0];

    function fetchAndUpdateData() {
        fetch('/jobs')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('jobsData', JSON.stringify(data));
                populateTable(data);
            })
            .catch(error => console.error('Error:', error));
    }

    function populateTable(data) {
        const jobTable = document.getElementById('jobTable').getElementsByTagName('tbody')[0];
        jobTable.innerHTML = ''; // Clear existing rows

        data.forEach(job => {
            const row = jobTable.insertRow();
            const titleCell = row.insertCell(0);
            const locationCell = row.insertCell(1);

            titleCell.innerText = job.title;
            locationCell.innerText = job.location;
        });
    }

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
      

    // Fetch and update data every 5 minutes
    fetchAndUpdateData(); // Initial fetch
    setInterval(fetchAndUpdateData, 5 * 60 * 1000); // Subsequent fetches
});

// Fetch data from the server and display it
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();

        const container = document.getElementById('data-container');
        data.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('data-item');
            div.innerHTML = `
                <strong>Community Area:</strong> ${item.community_area}<br>
                <strong>Community Area Name:</strong> ${item.community_area_name}
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();

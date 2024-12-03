const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 8081;

// Configure the PostgreSQL client
const pool = new Pool({
    user: 'postgres',
    host: '/cloudsql/msds432-wk9-2:us-central1:mypostgres',
    database: 'mypostgres',
    password: 'root',
    port: 5432, // Connect to Docker's published port 5433
});

// Serve static files (for HTML, CSS, and client-side JS)
app.use(express.static('public'));


// Endpoint to get JSON data from PostgreSQL
app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT birth_rate, unemployment FROM community_area_unemployment');
        res.json(result.rows); // Send rows to the frontend
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


// // Route to handle the HTTP GET request and query the database
// app.get('/', async (req, res) => {
//   try {
//     // Query the table public.community_area_unemployment
//     const result = await client.query('SELECT birth_rate, unemployment FROM community_area_unemployment');
    
//     // Format the result as a string
//     let responseText = "Community Area Unemployment and Birth Rate Data:\n\n";
//     result.rows.forEach(row => {
//       responseText += `Area: ${row.birth_rate}, Unemployment Rate: ${row.unemployment}%\n`;
//     });

//     // Send the result as the response
//     res.status(200).send(responseText);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error querying database');
//   }
// });

// // Start the server on port 8080
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

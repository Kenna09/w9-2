// const express = require('express');
// const app = express();
// const port = process.env.PORT || 8081;

// app.get('/', (req, res) => {
//   res.send('Hello from Google Cloud Run!');
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


const express = require('express');
const { Pool } = require('pg'); // Import the pg library to work with PostgreSQL
const app = express();
const port = process.env.PORT || 8080;

// Set up PostgreSQL connection using environment variables
const pool = new Pool({
  user: process.env.DB_USER,        // Database username
  host: process.env.DB_HOST,        // Database host (e.g., localhost or Cloud SQL instance)
  database: process.env.DB_NAME,    // Database name
  password: process.env.DB_PASSWORD,// Database password
  port: process.env.DB_PORT || 5432 // Database port (default is 5432 for PostgreSQL)
});

// Route to handle the HTTP GET request and query the database
app.get('/', async (req, res) => {
  try {
    // Query the table public.community_area_unemployment
    const result = await pool.query('SELECT area_name, unemployment_rate FROM public.community_area_unemployment');
    
    // Format the result as a string
    let responseText = "Community Area Unemployment Data:\n\n";
    result.rows.forEach(row => {
      responseText += `Area: ${row.area_name}, Unemployment Rate: ${row.unemployment_rate}%\n`;
    });

    // Send the result as the response
    res.status(200).send(responseText);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error querying database');
  }
});

// Start the server on port 8080
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

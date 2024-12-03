// const express = require('express');
// const { Pool } = require('pg'); // Import the pg library to work with PostgreSQL
// const app = express();
// const port = process.env.PORT || 8080;

// // Set up PostgreSQL connection using environment variables
// const pool = new Pool({
//   user: process.env.DB_USER,        // Database username
//   host: process.env.DB_HOST,        // Database host (e.g., localhost or Cloud SQL instance)
//   database: process.env.DB_NAME,    // Database name
//   password: process.env.DB_PASSWORD,// Database password
//   port: process.env.DB_PORT || 5432 // Database port (default is 5432 for PostgreSQL)
// });


// // Function to check the database connection before starting the server
// async function checkDatabaseConnection() {
//   try {
//     const client = await pool.connect(); // Attempt to connect to the database
//     console.log('Database connected successfully');
//     client.release(); // Release the client back to the pool after successful connection
//   } catch (err) {
//     console.error('Database connection failed:', err);
//     process.exit(1); // Exit the process if the database connection fails
//   }
// }

// // Check the database connection before starting the server
// checkDatabaseConnection().then(() => {
//   // Route to handle the HTTP GET request and query the database
//   app.get('/', async (req, res) => {
//     try {
//     // Query the table public.community_area_unemployment
//     const result = await pool.query('SELECT birth_rate, unemployment FROM public.community_area_unemployment');
    
//     // Format the result as a string
//     let responseText = "Community Area Unemployment and birth_rate Data:\n\n";
//     result.rows.forEach(row => {
//       responseText += `Area: ${row.birth_rate}, Unemployment Rate: ${row.unemployment}%\n`;
//     });

//       // Send the result as the response
//       res.status(200).send(responseText);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Error querying database');
//     }
//   });

//   // Start the server on port 8080
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// });

//--------------------------------------------------------------------------------------------------------------

// const express = require('express');
// const { Client } = require('pg'); // Import the pg library to work with PostgreSQL
// const app = express();
// const port = process.env.PORT || 8081;

// // Set up PostgreSQL connection using Cloud SQL socket
// const client = new Client({
//   host: '/cloudsql/msds432-wk9-2:us-central1:mypostgres', // Cloud SQL connection string
//   user: 'postgres',  // Database username
//   password: 'root',  // Database password
//   database: 'mypostgres', // Database name
//   port: 5432,  // Default PostgreSQL port
// });

// // Connect to the PostgreSQL database
// client.connect()
//   .then(() => {
//     console.log('Database connected successfully');
//   })
//   .catch((err) => {
//     console.error('Database connection failed:', err);
//     process.exit(1); // Exit the process if the database connection fails
//   });


const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

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

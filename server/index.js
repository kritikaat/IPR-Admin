const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Use Pool for better performance

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL Pool Setup
const pool = new Pool({
  user: 'postgres',  // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'visitor_info',  // Replace with your PostgreSQL database name
  password: 'kri22tika',  // Replace with your PostgreSQL password
  port: 5432,  // Default PostgreSQL port
});

// API route to get visitors data from PostgreSQL
app.get('/visitors', async (req, res) => {
  try {
    // Fetch visitors data
    const visitorsResult = await pool.query('SELECT * FROM iprformpage2');
    
    // Fetch faculties data (assuming ipr_visits is the right table)
    const facultiesResult = await pool.query('SELECT * FROM ipr_visits');

    const groupinchargeResult = await pool.query('SELECT * FROM ipr_groupincharge');
    
    
    // Combine both results into a single response object
    res.json({
      visitors: visitorsResult.rows,
      faculties: facultiesResult.rows,
      groupincharge: groupinchargeResult.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

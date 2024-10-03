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
    const visitorsResult = await pool.query('SELECT * FROM iprformpage2 ORDER BY id ASC');
    
    // Fetch faculties data (assuming ipr_visits is the right table)
    const facultiesResult = await pool.query('SELECT * FROM ipr_visits ORDER BY visit_id ASC');

    const groupinchargeResult = await pool.query(`
      SELECT * FROM ipr_groupincharge
      WHERE name IS NOT NULL AND name != 'undefined'
        AND position IS NOT NULL AND position != 'undefined'
        AND email IS NOT NULL AND email != 'undefined'
        AND mobile IS NOT NULL AND mobile != 'undefined'
        ORDER BY id ASC
    `);

    const visitorArrivalResult = await pool.query(`
      SELECT * FROM iprscientificvisitform
      WHERE campus IS NOT NULL
        AND ipr_time IS NOT NULL
        AND fcipt_time IS NOT NULL
        AND visit_date IS NOT NULL
        AND visit_time IS NOT NULL
        AND materials IS NOT NULL
        AND visit_time != '00:00'
        ORDER BY id ASC
    `);
    
    
    
    // Combine both results into a single response object
    res.json({
      visitors: visitorsResult.rows, 
      faculties: facultiesResult.rows,
      groupincharge: groupinchargeResult.rows,
      visitorArrival: visitorArrivalResult.rows 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});
// Add these new routes after the existing '/visitors' route

app.get('/analytics', async (req, res) => {
  try {
    const totalFormsQuery = 'SELECT COUNT(*) as total FROM iprformpage2';
    const commonMaterialsQuery = `
      SELECT materials, COUNT(*) as count 
      FROM iprscientificvisitform 
      GROUP BY materials 
      ORDER BY count DESC 
      LIMIT 5
    `;
    const preferredTimingsQuery = `
      SELECT visit_time, COUNT(*) as count 
      FROM iprscientificvisitform 
      GROUP BY visit_time 
      ORDER BY count DESC
    `;
    const avgGroupSizeQuery = 'SELECT AVG(num_students) as avg_size FROM ipr_visits';

    const [totalForms, commonMaterials, preferredTimings, avgGroupSize] = await Promise.all([
      pool.query(totalFormsQuery),
      pool.query(commonMaterialsQuery),
      pool.query(preferredTimingsQuery),
      pool.query(avgGroupSizeQuery)
    ]);
    
    const result = {
      totalForms: totalForms.rows[0].total,
      commonMaterials: commonMaterials.rows,
      preferredTimings: preferredTimings.rows,
      avgGroupSize: avgGroupSize.rows[0].avg_size
    };

    console.log('Analytics data:', result);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching analytics data' });
  }
});



// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

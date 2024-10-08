import "dotenv/config";
import express from 'express'; // Removed the unnecessary import for Route
import routes from './routes/index.js'; // Import your routes from the index file
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON bodies
app.use(express.json()); // Add this line to parse incoming JSON requests
app.use(cors({ origin: '*' }));
// Use the imported routes
app.use('/', routes); // Use the routes defined in routes/index.js

app.get('/', (req, res) => {
    res.send('Hello World!'); // This is optional since you already have routes
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

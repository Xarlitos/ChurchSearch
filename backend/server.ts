import express from 'express';
import axios from 'axios';

const app = express();
const port = 3001;

// Middleware do obsługi CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Ustaw tylko odpowiednią domenę, np. 'https://church.pl'
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Endpoint do przekazywania zapytań do Google Play
app.get('/log', async (req, res) => {
    try {
        const response = await axios.get('https://play.google.com/log?format=json&hasfast=true&authuser=0');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Problem with Google Play API request' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

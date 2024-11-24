import express from 'express';
import bodyParser from 'body-parser';
import { Client } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Function to create a new client connection
const createClient = async () => {
    const client = new Client({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: Number(process.env.PG_PORT),
    });
    await client.connect();
    return client;
};

// GET reviews
app.get('/api/reviews', async (req, res) => {
    let client: Client | null = null;
    try {
        client = await createClient();
        const result = await client.query('SELECT * FROM reviews ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).send('Error fetching reviews');
    } finally {
        if (client) {
            await client.end(); 
        }
    }
});

// POST a new review
app.post('/api/reviews', async (req, res) => {
    const { username, comment, rating } = req.body;
    let client: Client | null = null;
    try {
        client = await createClient();
        const result = await client.query(
            'INSERT INTO reviews (username, comment, rating) VALUES ($1, $2, $3) RETURNING *',
            [username, comment, rating]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).send('Error adding review');
    } finally {
        if (client) {
            await client.end(); 
        }
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

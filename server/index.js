import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

// pulls all our env variables
dotenv.config();

const app = express();

// additional middleware
app.use(cors());
app.use(express.json({ limit: '50mb'}))

// new endpoints
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);




// root route - checking server is running
app.get('/', async (req, res) => {
    res.send('Hello from DALL-E!');
})

// to run the application
const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, () => 
        console.log('Server has started on port http://localhost:8080'))

    } catch (error) {
        console.log(error);
    }


}

startServer();
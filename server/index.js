import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors'

//DB connection.
import connectDB from './mongodb/connect.js ';

//Routes (imports).
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
 
//This line allows create a document with the enviroment variables.
dotenv.config();

const app = express();

//Middlewares.
app.use(cors());
app.use(express.json({ limit: '50mb' }));

//Routes.

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.send('Hello from DALL-E!');
});

//Initialize server.
const startServer = async () => {

    //We try the connection with MongoDB.
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log("Server running on port 8080..."));
    } catch (error) {
        console.log(error);
    }
}

startServer();
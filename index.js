import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import bookRoutes from './Routes/adminBook.js';
import UserRoutes from './Routes/user.js';

const app = express();
const value='30mb';

app.use(bodyParser.json({ limit: value, extended: true }));
app.use(bodyParser.urlencoded({ limit: value, extended: true }));

app.use(cors());
app.use(express.json());
app.use('/ticket', bookRoutes);
app.use('/user', UserRoutes);

const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@mern-social-cluster.3zpbdns.mongodb.net/ticket`;
const PORT = process.env.PORT|| 5000;

const Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bus Ticket Booking API',
            version: '1.0.0',
            description: 'API documentation for the Bus Ticket application',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['swagger.js'],
};

const swaggerDocument = swaggerJsDoc(Options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port successfully: http://localhost:${PORT}`)));            
   

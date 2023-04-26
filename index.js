import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import bookRoutes from './Routes/adminBook.js';
import UserRoutes from './Routes/user.js';

const app = express();
const value='30mb';

app.use(bodyParser.json({ limit: value, extended: true }));
app.use(bodyParser.urlencoded({ limit: value, extended: true }));
app.use(cors());

app.use('/book', bookRoutes);
app.use('/user', UserRoutes);

const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@mern-social-cluster.3zpbdns.mongodb.net/ticket`;
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port successfully: http://localhost:${PORT}`)));
   

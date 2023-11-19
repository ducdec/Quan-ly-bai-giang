import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
//import mongoose from 'mongoose';
import dotenv from 'dotenv';

import courses from '../server/routers/courses.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));

app.use('/', cors());

app.use('/courses', courses);

//data http://localhost:5000/

const URI = process.env.MONGODB_URI;

// mongoose
//   .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to DB');
//   })
//   .catch((err) => console.log('err', err));

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

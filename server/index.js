import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
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

const URI = 'mongodb://127.0.0.1:27017/Duc_education_dev';

mongoose
  .connect(URI)
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log('listening on port', PORT);
    });
  })
  .catch((err) => console.log('err', err));

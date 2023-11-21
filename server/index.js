import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import courses from '../server/routers/courses.js';

import customRenderer from './util/customRenderer.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;

//file ti~nh
app.use(express.static(path.join(__dirname, 'public')));

// POST res
app.use(methodOverride('_method'));

//duong dan~
app.engine('js', customRenderer);
app.set('view engine', 'js');
app.set('views', path.join(__dirname, 'views', 'pages'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));

app.use('/', cors());

app.use('/courses', courses);

//data http://localhost:5000/

const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI)
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log('listening on port', PORT);
    });
  })
  .catch((err) => console.log('err', err));

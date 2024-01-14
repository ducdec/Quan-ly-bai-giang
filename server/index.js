import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db/index.js';
//import anpha from './routers/site.js';
import courses from './routers/courses.js';
import instructors from './routers/instructor.js';
import lectures from './routers/lectures.js';
import learning from './routers/learning.js';
import users from './routers/users.js';
import { Course } from './models/Course.js';

import customRenderer from './util/customRenderer.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;

//file ti~nh
app.use(express.static(path.join(__dirname, 'assets')));

// POST res
app.use(methodOverride('_method'));

//duong dan~
app.engine('js', customRenderer);
app.set('view engine', 'js');
app.set('views', path.join(__dirname, 'views', 'pages'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));

app.use(cors());

app.get('/', async (req, res) => {
  try {
    const allStatus = await Course.distinct('status');
    const coursesByStatus = {};

    // Lặp qua từng giá trị status
    for (const status of allStatus) {
      // Tìm các khóa học có status tương ứng
      const courses = await Course.find({ status }).populate('instructors');
      // Lưu danh sách khóa học vào đối tượng coursesByStatus
      coursesByStatus[status] = courses;
    }
    res.json({ coursesByStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use('/courses', courses);
app.use('/instructor', instructors);
app.use('/lecture', lectures);
app.use('/learning', learning);
app.use('/login', users);

//data http://localhost:5000/

connectDB();
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

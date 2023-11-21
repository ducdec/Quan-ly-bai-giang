import { Course } from '../models/CourseModel.js';

class CourseController {
  constructor() {}

  getCourse(req, res) {
    try {
      const courses = Course.find();
      console.log('Test', courses);
      res.status(200).json(Course);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // [GET] /courses/:slug
  show(req, res, next) {
    res.json(Course);
  }

  // [POST] /courses/create
  create(req, res) {
    const newCourse = req.body;

    // Kiểm tra xem dữ liệu có đầy đủ hay không
    if (!newCourse || Object.keys(newCourse).length === 0) {
      return res
        .status(400)
        .json({ error: 'Invalid data. Course data is required.' });
    }

    const course = new Course(newCourse);

    course
      .save()
      .then((savedCourse) => {
        res.status(201).json(savedCourse); // Trạng thái 201: Created
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }

  // // [POST] /course/store
  // store(req, res, next) {
  //   //res.json(req.body)
  //   const formData = req.body;
  //   formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBB2M7IXJ2Vy5vqYWTIN6R-qvBPjg`;
  //   const course = new Course(formData);

  //   course
  //     .save()
  //     .then(() => {
  //       res.redirect('/');
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.status(500).send('An error occurred while saving the course.');
  //     });
  //}
}

export default new CourseController();

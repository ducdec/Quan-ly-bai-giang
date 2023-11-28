import { Course } from '../models/Course.js';

class CourseController {
  constructor() {}

  getCourse(req, res) {
    try {
      const a = new Course({
        name: 'anpha',
        title: 'abc',
        description: 'bbbbb',
        image: 'http://asdasdad',
        slug: 'name',
        videoID: '123123',
      });
      a.save();

      const courses = Course.find();
      console.log('Test', courses);
      res.status(200).json(Course);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // [GET] /courses/:slug
  show(req, res, next) {
    const courses = Course.find();
    res.json(courses);
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

  //   async postCourse(req, res) {
  //     try {
  //       // Assuming Course is a Mongoose model
  //       const newCourse = new Course(req.body); // Assuming the request body contains the course data
  //       const savedCourse = await newCourse.save();

  //       res.status(201).json(savedCourse);
  //     } catch (err) {
  //       console.error(err);
  //       res.status(500).json({ error: 'Internal Server Error' });
  //     }
  //   }
}

export default new CourseController();

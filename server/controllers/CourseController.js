import { Course } from '../models/Course.js';

class CourseController {
  constructor() {}

  // courses/get
  async getCourse(req, res) {
    try {
      // const a = new Course({
      //   name: 'Cơ sở dữ liệu',
      //   description: 'dau het ca dau',
      //   image:
      //     'https://i.ytimg.com/vi/79rF9BS0xvE/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLC1vPTpnHMz4iaoK-Y8iNdAtM-M4A',
      //   instructors: 'Le Van A',
      //   status: 'new',
      //   slug: 'anpha',
      // });
      // a.save();

      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // [GET] /courses/:slug

  async show(req, res, next) {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // [POST] /courses/store
  async store(req, res) {
    const newCourse = req.body;

    // Kiểm tra xem dữ liệu có đầy đủ hay không
    if (!newCourse || Object.keys(newCourse).length === 0) {
      return res
        .status(400)
        .json({ error: 'Invalid data. Course data is required.' });
    }

    const course = new Course(newCourse);
    await course
      .save()
      .then((savedCourse) => {
        res.status(201).json(savedCourse); // Trạng thái 201: Created
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }
}

export default new CourseController();

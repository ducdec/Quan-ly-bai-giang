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
    try {
      const newCourse = req.body;

      if (!newCourse || Object.keys(newCourse).length === 0) {
        return res
          .status(400)
          .json({ error: 'Invalid data. Course data is required.' });
      }

      const course = new Course(newCourse);
      const savedCourse = await course.save();

      res.status(201).json(savedCourse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // [GET] /courses/:id/edit
  async edit(req, res) {
    try {
      const courseId = req.params.id;

      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.status(201).json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  //[PUT] /courses/:id
  async update(req, res, next) {
    try {
      await Course.updateOne({ _id: req.params.id }, req.body);
      res.json({ success: true, message: 'Course updated successfully' });
    } catch (error) {
      console.error('Error in update:', error);
      next(error);
    }
  }

  //[DELETE] /courses/:id/force (Xo'a that)
  async forceDestroy(req, res, next) {
    try {
      await Course.deleteOne({ _id: req.params.id });
      console.log('Course deleted successfully');
      res.json({ success: true, message: 'Course deleted successfully' });
    } catch (error) {
      console.error('Error in forceDestroy:', error);
      next(error);
    }
  }

  // [GET] courses/stored
  async storeCourses(req, res, next) {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new CourseController();

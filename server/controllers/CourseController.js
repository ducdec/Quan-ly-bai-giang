import { Course } from '../models/Course.js';
import { Instructor } from '../models/Instructor.js';
import { InstructorCourse } from '../models/InstructorCourse.js';

class CourseController {
  constructor() {}

  // [GET] courses/get
  async getCourse(req, res) {
    try {
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

      // Tạo mới khóa học
      const createdCourse = await Course.create(newCourse);
      res.status(201).json(createdCourse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  //[GET] courses/store
  async storeInstructor(req, res, next) {
    try {
      const instructors = await Instructor.find();

      res.json(instructors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // async edit(req, res) {
  //   try {
  //     const newCourse = req.body;

  //     if (!newCourse || Object.keys(newCourse).length === 0) {
  //       return res
  //         .status(400)
  //         .json({ error: 'Invalid data. Course data is required.' });
  //     }

  //     console.log('New Course:', newCourse);

  //     // Attempt to create a new course
  //     const course = new Course(newCourse);
  //     console.log('New Course Instance:', course);

  //     const savedCourse = await course.save();
  //     console.log('Saved Course:', savedCourse);

  //     // Attempt to create a new instructor
  //     const instructor = new Instructor({ name: newCourse.instructor });
  //     console.log('New Instructor Instance:', instructor);
  //     await instructor.save();

  //     // Attempt to create a new instructor course association
  //     const instructorCourse = new InstructorCourse({
  //       instructorID: instructor._id,
  //       courseID: savedCourse._id,
  //     });
  //     console.log('New InstructorCourse Instance:', instructorCourse);
  //     await instructorCourse.save();

  //     console.log('All data successfully saved!');
  //     res.status(201).json(savedCourse);
  //   } catch (error) {
  //     console.error(error);

  //     // Handle duplicate key error for the 'slug' field
  //     if (
  //       error.name === 'MongoError' &&
  //       error.code === 11000 &&
  //       error.keyPattern &&
  //       error.keyValue
  //     ) {
  //       const duplicatedSlug = error.keyValue.slug;
  //       return res.status(400).json({
  //         error: `Duplicate key error. The slug '${duplicatedSlug}' already exists.`,
  //       });
  //     }

  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // }

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

  //[PATCH] /courses/:id/restore
  async restore(req, res, next) {
    try {
      const courseId = req.params.id;

      // Find and restore the course
      const restoredCourse = await Course.restore({ _id: courseId });

      console.log('Khôi phục thành công!!!');
      res.json({
        success: true,
        message: 'Khôi phục thành công.',
        restoredCourse,
      });
    } catch (error) {
      console.error('Lỗi khi khôi phục:', error);
      next(error);
    }
  }

  //[DELETE] /courses/:id (Xoa me'm)
  async destroy(req, res, next) {
    try {
      // Sử dụng findOneAndUpdate để cập nhật giá trị deleted từ false thành true
      const result = await Course.findOneAndUpdate(
        { _id: req.params.id, deleted: false },
        { $set: { deleted: true } },
        { new: true },
      );
      // Kiểm tra xem có bản ghi nào được cập nhật không
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Bản ghi không tồn tại hoặc đã bị xóa trước đó.',
        });
      }

      console.log('Xoa success!!!');
      res.json({ success: true, message: 'Xóa thành công.' });
    } catch (error) {
      console.error('Error in Destroy:', error);
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

  // [GET] /courses/stored
  async storeCourses(req, res, next) {
    try {
      const [storedCourses, countDeletedCourses] = await Promise.all([
        Course.find(),
        Course.countDocumentsWithDeleted({ deleted: true }),
      ]);

      res.json({
        storedCourses,
        countDeletedCourses,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // [GET] me/trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .then((courses) => res.json(courses))
      .catch(next);
  }
}

export default new CourseController();

import { Course } from '../models/Course.js';
import { Instructor } from '../models/Instructor.js';

class CourseController {
  constructor() {}

  //[GET] /search
  async show(req, res, next) {
    try {
      const searchTerm = req.query.name;
      // Giả sử Course.find() trả về một promise, sử dụng await để đợi kết quả
      const courses = await Course.find().populate('instructors');

      // Đảm bảo courses là một mảng
      if (!Array.isArray(courses)) {
        throw new Error('Invalid data returned from Course.find()');
      }

      // Đảm bảo bạn có một danh sách các khóa học để lọc
      const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      console.log(searchTerm);
      console.log(filteredCourses);

      res.json(filteredCourses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // [POST] /courses/store
  async store(req, res, next) {
    //  if(re/)
    try {
      const newCourse = req.body;

      if (!newCourse) {
        return res.status(400).json({
          error: 'Dữ liệu không hợp lệ. Thông tin khóa học là bắt buộc.',
        });
      }

      const createdCourse = await Course.create(newCourse);

      // Trích xuất ID của giảng viên
      const idInstructors = createdCourse.instructors.map((ins) => ins._id);

      // Kiểm tra xem khóa học đã tồn tại cho giảng viên hay chưa
      const instructorUpdatePromises = idInstructors.map(
        async (instructorId) => {
          const instructor = await Instructor.findOne({
            _id: instructorId,
            courses: createdCourse._id,
          });

          if (!instructor) {
            // Nếu khóa học chưa tồn tại, thực hiện cập nhật
            return Instructor.updateOne(
              { _id: instructorId },
              { $addToSet: { courses: createdCourse._id } },
            );
          }

          // Nếu khóa học đã tồn tại, không cần thực hiện cập nhật
          return Promise.resolve();
        },
      );

      // Chờ tất cả các promises hoàn thành trước khi trả về response
      await Promise.all(instructorUpdatePromises);

      res.status(201).json(createdCourse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi Nội bộ của máy chủ' });
    }
  }

  //[GET] courses/store
  async storeInstructor(req, res, next) {
    try {
      const insCourse = await Instructor.find();

      res.json(insCourse);
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

  // [PUT] /courses/:id
  async update(req, res) {
    try {
      const courseId = req.params.id;
      const updatedCourseData = req.body; // Giả sử dữ liệu cập nhật được gửi từ client

      // Lấy thông tin khóa học trước khi cập nhật
      const previousCourse = await Course.findById(courseId);

      if (!previousCourse) {
        return res.status(404).json({ error: 'Không tìm thấy khóa học' });
      }

      // Thực hiện cập nhật thông tin khóa học
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        updatedCourseData,
        { new: true },
      );

      // TODO: Thêm logic cập nhật bảng Instructor ở đây
      const updatedInstructors = updatedCourseData.instructors;
      // Lấy danh sách instructors của khóa học trước khi cập nhật
      const previousInstructors = await Instructor.find({ courses: courseId });

      // Tìm instructors đã bị loại bỏ
      const removedInstructors = previousInstructors.filter(
        (instructor) => !updatedInstructors.includes(instructor._id.toString()),
      );

      // Xóa khóa học cho instructors bị loại bỏ
      for (const instructor of removedInstructors) {
        if (instructor && instructor.courses) {
          instructor.courses = instructor.courses.filter(
            (course) => course.toString() !== courseId.toString(),
          );
          await instructor.save();
        }
      }

      // Tìm instructors mới được thêm vào
      const addedInstructors = updatedInstructors.filter(
        (instructorId) =>
          !previousCourse.instructors.includes(instructorId.toString()),
      );

      // Thêm khóa học cho instructors mới được thêm vào
      for (const instructorId of addedInstructors) {
        const instructor = await Instructor.findById(instructorId);
        if (instructor) {
          // Đảm bảo rằng instructor.courses là một mảng
          instructor.courses = instructor.courses || [];
          instructor.courses.push(courseId);
          await instructor.save();
        }
      }
      res.status(200).json(updatedCourse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi Nội Server' });
    }
  }

  //[PATCH] /courses/:id/restore
  async restore(req, res, next) {
    try {
      const courseId = req.params.id;

      // Find and restore the course
      const restoredCourse = await Course.restore({ _id: courseId });

      const courses = await Course.find({ _id: courseId });
      //console.log(courses);
      if (!courses || !courses.length) {
        console.error('No courses found for the given ID:', courseId);
        // Handle the error or return an appropriate response
        return res
          .status(404)
          .json({ success: false, message: 'Course not found' });
      }

      const idInstructors = courses[0].instructors.map((ins) =>
        ins._id.toString(),
      );
      const idcourse = courses[0]._id.toString();
      //console.log(idcourse);
      // Kiểm tra xem khóa học đã tồn tại cho giảng viên hay chưa
      const instructorUpdatePromises = idInstructors.map(
        async (instructorId) => {
          const instructor = await Instructor.findOne({
            _id: instructorId,
            courses: idcourse,
          });

          if (!instructor) {
            // Nếu khóa học chưa tồn tại, thực hiện cập nhật
            return Instructor.updateOne(
              { _id: instructorId },
              { $addToSet: { courses: idcourse } },
            );
          }

          // Nếu khóa học đã tồn tại, không cần thực hiện cập nhật
          return Promise.resolve();
        },
      );

      // Chờ tất cả các promises hoàn thành trước khi trả về response
      await Promise.all(instructorUpdatePromises);

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

  //[DELETE] /courses/:id (Xóa mềm)
  async destroy(req, res, next) {
    try {
      const courseId = req.params.id;

      // Tìm khóa học để xóa mềm
      const courseToDelete = await Course.findOne({
        _id: courseId,
        deleted: false,
      });

      // Kiểm tra xem khóa học có tồn tại không
      if (!courseToDelete) {
        return res.status(404).json({
          success: false,
          message: 'Khóa học không tồn tại hoặc đã bị xóa trước đó.',
        });
      }

      // Cập nhật giá trị deleted từ false thành true
      const result = await Course.findByIdAndUpdate(
        courseId,
        { deleted: true },
        { new: true },
      );

      // Lấy danh sách instructors của khóa học
      const instructorsToUpdate = result.instructors;

      // Cập nhật thông tin trong bảng Instructor
      await Instructor.updateMany(
        { _id: { $in: instructorsToUpdate } },
        { $pull: { courses: courseId } },
      );

      console.log('Xóa thành công!!!');
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
        Course.find().populate('instructors'),
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
      .populate('instructors')
      .then((courses) => res.json(courses))
      .catch(next);
  }

  //[GET] /courses/:slug
  async courseSlug(req, res, next) {
    try {
      const slug = req.params.slug;

      // Sử dụng await để đợi cho hàm findOne hoàn tất
      const course = await Course.findOne({ slug: slug })
        .populate('instructors')
        .populate('lectures');

      // Kiểm tra xem course có tồn tại không
      if (!course) {
        // Nếu không tìm thấy, trả về lỗi 404 Not Found
        return res.status(404).json({ error: 'Không tìm thấy khóa học' });
      }

      //const { instructors, lectures } = course;
      // Gửi course về client nếu tìm thấy
      res.status(200).json(course);
    } catch (error) {
      // Bắt lỗi nếu có vấn đề trong quá trình xử lý
      next(error);
    }
  }
}

export default new CourseController();

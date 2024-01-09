import { Lecture } from '../models/Lecture.js';
import { Course } from '../models/Course.js';
import { Instructor } from '../models/Instructor.js';

class LectureController {
  constructor() {}

  // [POST] /lecture/:slug/create
  async create(req, res) {
    try {
      const slugCourse = req.params.slug;

      // Lấy thông tin khóa học từ slug
      const course = await Course.findOne({ slug: slugCourse });

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      // Truy cập newLectureData từ req.body
      const { instructor, ...newLectureData } = req.body;
      // Tạo bài giảng với thông tin từ req.body và khóa học đã lấy
      const lecture = new Lecture({
        ...newLectureData,
        instructor,
        course: course._id, // Gán ID của khóa học vào bài giảng
      });

      //console.log(instructor, lecture);
      const savedLecture = await lecture.save();

      // Cập nhật trường lecture vào bảng course
      course.lectures.push(savedLecture._id);
      await course.save();

      // Cập nhật bảng instructor để liên kết bài giảng với giảng viên
      if (instructor) {
        const instructorId = instructor._id || instructor; // Giả sử bạn có thể truyền trực tiếp ID của giảng viên hoặc đối tượng giảng viên
        const instructorToUpdate = await Instructor.findById(instructorId);

        if (instructorToUpdate) {
          instructorToUpdate.lectures.push(savedLecture._id);
          await instructorToUpdate.save();
        }
      }

      res.status(201).json(savedLecture);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // [GET] /lecture/:slug/create
  async courseSlug(req, res) {
    try {
      // Lấy giá trị slug từ tham số trong request
      const slug = req.params.slug;

      // Sử dụng Mongoose để tìm kiếm khóa học dựa trên slug
      const course = await Course.findOne({ slug })
        .populate('instructors')
        .populate('lectures');

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      // Lấy toàn bộ thông tin của giảng viên và các bài giảng
      const instructors = course.instructors;
      const lectures = course.lectures;

      // Trả về đối tượng chứa thông tin cả về giảng viên và các bài giảng
      res.status(200).json({
        courseInfo: { name: course.name, slug: course.slug },
        instructors,
        lectures,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  //[GET] /lecture/:slug/:id/edit
  async edit(req, res) {
    try {
      const lectureId = req.params.id;

      const lecture = await Lecture.findById(lectureId);

      if (!lecture) {
        return res.status(404).json({ error: 'Lecture not found' });
      }

      res.status(201).json(lecture);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // [PATCH] /lecture/:slug/:id
  async update(req, res) {
    try {
      const lectureId = req.params.id;
      const updatedLectureData = req.body; // Giả sử dữ liệu cập nhật được gửi từ client

      // Lấy thông tin bài giảng trước khi cập nhật
      const previousLecture = await Lecture.findById(lectureId);

      if (!previousLecture) {
        return res.status(404).json({ error: 'Bài giảng không tồn tại' });
      }

      // Thực hiện cập nhật thông tin bài giảng
      const updatedLecture = await Lecture.findByIdAndUpdate(
        lectureId,
        updatedLectureData,
        { new: true },
      );

      // TODO: Thêm logic cập nhật bảng Instructor ở đây
      const updatedInstructor = updatedLectureData.instructor;

      // Lấy danh sách instructors của bài giảng trước khi cập nhật
      const previousInstructors = await Instructor.find({
        lectures: lectureId,
      });

      // Tìm instructors đã bị loại bỏ
      const removedInstructors = previousInstructors.filter(
        (instructor) =>
          !updatedInstructor ||
          instructor._id.toString() !== updatedInstructor.toString(),
      );

      // Xóa bài giảng cho instructors bị loại bỏ
      for (const instructor of removedInstructors) {
        if (instructor && instructor.lectures) {
          instructor.lectures = instructor.lectures.filter(
            (lect) => lect.toString() !== lectureId.toString(),
          );
          await instructor.save();
        }
      }

      // Thêm bài giảng cho instructor mới được thêm vào
      if (updatedInstructor) {
        const instructor = await Instructor.findById(updatedInstructor);
        if (instructor) {
          // Đảm bảo rằng instructor.lectures là một mảng
          instructor.lectures = instructor.lectures || [];
          instructor.lectures.push(lectureId);
          await instructor.save();
        }
      }

      res.status(200).json(updatedLecture);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi Nội Server' });
    }
  }

  //[DELETE] /instructor/:id/force (Xo'a that)
  async forceDestroy(req, res, next) {
    try {
      await Lecture.deleteOne({ _id: req.params.id });
      console.log('Lecture deleted successfully');
      res.json({ success: true, message: 'Lecture deleted successfully' });
    } catch (error) {
      console.error('Error in forceDestroy:', error);
      next(error);
    }
  }
}
export default new LectureController();

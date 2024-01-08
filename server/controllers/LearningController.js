import { Lecture } from '../models/Lecture.js';
import { Course } from '../models/Course.js';

class LearningController {
  constructor() {}

  // [GET] /learning/:slugCourse
  async courseLearning(req, res) {
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
}
export default new LearningController();

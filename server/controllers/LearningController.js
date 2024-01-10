import { Lecture } from '../models/Lecture.js';
import { Course } from '../models/Course.js';

class LearningController {
  constructor() {}

  // [GET] /learning/:slug
  async courseLearning(req, res) {
    try {
      // Lấy giá trị slug và id từ tham số trong request
      const { slug } = req.params;
      const id = req.query.id;

      console.log('46', id);
      // Sử dụng Mongoose để tìm kiếm khóa học dựa trên slug và id
      const course = await Course.findOne({ slug })
        .populate({
          path: 'lectures',
          match: { _id: id },
        })
        .populate('instructors');

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      // Lấy toàn bộ thông tin của giảng viên và các bài giảng
      const { instructors, lectures } = course;

      // Trả về đối tượng chứa thông tin cả về giảng viên và các bài giảng
      res.status(200).json({
        course,
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

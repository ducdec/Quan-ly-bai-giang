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

      // Sử dụng Mongoose để tìm kiếm khóa học dựa trên slug và id
      const course = await Course.findOne({ slug })
        .populate('lectures')
        .populate('instructors');

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      // Lấy toàn bộ thông tin của giảng viên và các bài giảng
      const { instructors } = course;

      // Lấy thông tin của bài giảng dựa trên id
      const lecture = await Lecture.findOne({ _id: id });

      if (!lecture) {
        return res.status(404).json({ error: 'Lecture not found' });
      }
      //
      // const videoId = lecture.videoID;
      // const videoDuration = await this.getVideoDuration(videoId);
      // Trả về đối tượng chứa thông tin cả về giảng viên và các bài giảng
      res.status(200).json({
        course,
        instructors,
        lecture,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
export default new LearningController();

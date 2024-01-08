import { Lecture } from '../models/Lecture.js';
import { Course } from '../models/Course.js';

class LectureController {
  constructor() {}

  //[POST] /lecture/:slug/create
  async create(req, res) {
    try {
      const slugCourse = req.params.slug;

      // Lấy thông tin khóa học từ slug
      const course = await Course.findOne({ slug: slugCourse });
      console.log('14', course);

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

      const savedLecture = await lecture.save();
      console.log('28:', savedLecture);

      // Cập nhật trường lecture vào bảng course
      course.lectures.push(savedLecture._id); // Giả sử lectures là một mảng trong course
      await course.save();

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
  // [GET] /learning/:slug
  async courselearning(req, res) {
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
export default new LectureController();

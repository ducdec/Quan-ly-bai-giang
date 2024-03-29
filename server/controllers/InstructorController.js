import { Instructor } from '../models/Instructor.js';
import { Course } from '../models/Course.js';

class InstructorController {
  constructor() {}

  // [POST] /instructor/create
  async create(req, res) {
    try {
      const newInstructor = req.body;

      if (!newInstructor || Object.keys(newInstructor).length === 0) {
        return res
          .status(400)
          .json({ error: 'Invalid data. Instructor data is required.' });
      }

      const createdInstructor = await Instructor.create(newInstructor);

      res.status(201).json(createdInstructor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  //[GET] /instructor/create
  async getCourse(req, res) {
    try {
      const courses = await Course.find(); // Lấy tất cả các khóa học từ bảng Course
      res.status(200).json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }

  // [GET] /instructor/:id/edit
  async edit(req, res) {
    try {
      const instructorId = req.params.id;

      const instructor = await Instructor.findById(instructorId);

      // Kiểm tra nếu không tìm thấy instructor
      if (!instructor) {
        return res.status(404).json({ error: 'Instructor not found' });
      }

      res.status(200).json(instructor);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin instructor:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  //[PUT] /instructor/:id
  async update(req, res, next) {
    try {
      await Instructor.updateOne({ _id: req.params.id }, req.body);
      res.json({ success: true, message: 'instructor updated successfully' });
    } catch (error) {
      console.error('Error in update:', error);
      next(error);
    }
  }

  //[DELETE] /instructor/:id/delete (Xo'a that)
  async forceDestroy(req, res, next) {
    try {
      await Instructor.deleteOne({ _id: req.params.id });
      console.log('Instructor deleted successfully');
      res.json({ success: true, message: 'Instructor deleted successfully' });
    } catch (error) {
      console.error('Error in forceDestroy:', error);
      next(error);
    }
  }

  // [GET] /instructor/stored
  async storedInstructor(req, res, next) {
    try {
      // Sử dụng await để đợi kết quả trả về từ hàm find()
      const storedinstructors = await Instructor.find().populate('courses');

      // Trả về JSON chứa danh sách instructor
      res.json(storedinstructors);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách instructors:', error);
      res.status(500).json({ error: 'Lỗi Server Nội bộ' });
    }
  }
}
export default new InstructorController();

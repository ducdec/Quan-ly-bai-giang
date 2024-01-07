import { InstructorCourse } from '../models/InstructorCourse.js';

class InsCourseController {
  constructor() {}

  // [POST] /InsCourse/store
  async storeIns(req, res) {
    try {
      const { instructorID, courseID } = req.body;
      // Lưu id người hướng dẫn và id khóa học vào bảng trung gian
      await InstructorCourse.create({
        instructorID: instructorID,
        courseID: courseID,
      });
      res
        .status(201)
        .json({ message: 'InstructorCourse created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
export default new InsCourseController();

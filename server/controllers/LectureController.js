import { Lecture } from '../models/Lecture.js';

class LectureController {
  constructor() {}

  //[POST] /lecture/:slug/create
  async create(req, res) {
    try {
      const { course, instructor, ...newLectureData } = req.body;

      if (!newLectureData || Object.keys(newLectureData).length === 0) {
        return res
          .status(400)
          .json({ error: 'Invalid data. Lecture data is required.' });
      }

      const lecture = new Lecture({
        ...newLectureData,
        course: course,
        instructor: instructor,
      });

      const savedLecture = await lecture.save();

      res.status(201).json(savedLecture);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
export default new LectureController();

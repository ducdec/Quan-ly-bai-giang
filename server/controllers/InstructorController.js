import { Instructor } from '../models/Instructor.js';

class InstructorController {
  constructor() {}

  //[POST] /instructor/create
  async create(req, res) {
    try {
      const newInstructor = req.body;

      if (!newInstructor || Object.keys(newInstructor).length === 0) {
        return res
          .status(400)
          .json({ error: 'Invalid data. Instructor data is required.' });
      }

      const instructor = new Instructor(newInstructor);

      const savedInstructor = await instructor.save();

      res.status(201).json(savedInstructor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
export default new InstructorController();

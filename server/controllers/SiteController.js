import { Course } from '../models/Course';
import { Instructors } from '../models/Instructors';
class SiteController {
  // [GET] /
  async home1(req, res, next) {
    try {
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // [GET] /home
  async home(req, res, next) {
    try {
      //const status = req.query.status || 'new';
      const status = await Course.distinct('status', {
        deleted: false,
      });

      const courses = await Course.find({ status }).populate('instructors');

      res.json({ status, courses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new SiteController();

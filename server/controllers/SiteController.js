import { Course } from '../models/Course';
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
      const status = req.query.status || 'new';

      const courses = await Course.find({ status });

      res.json({ status, courses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new SiteController();

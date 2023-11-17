import Course from '../models/CourseModel';
import { mongooseToObject } from '../util/mongoose'

class CourseController {
 // [GET] /courses/:slug
 show(req, res, next) {
  Course.findOne({ slug: req.params.slug })
    .then((course) => {
      res.render('courses/show', {
        course: mongooseToObject(course),
      })
    })
    .catch(next)
}

  // [GET] /courses/create
  create(req, res) {
    res.render('courses/create')
  }
}
export default new CourseController;

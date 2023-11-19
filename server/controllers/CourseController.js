class CourseController {
  constructor() {}

  show(req, res) {
    res.send('oke');
  }
  // // [GET] /course/:slug
  // show(req, res, next) {
  //   Course.findOne({ slug: req.params.slug })
  //     .then((course) => {
  //       res.render('courses/show', { course: mongooseToObject(course) });
  //     })
  //     .catch(next);
  // }

  // // [GET] /course/create
  // create(req, res) {
  //   res.render('courses/create');
  // }
  // // [POST] /course/store
  // store(req, res, next) {
  //   //res.json(req.body)
  //   const formData = req.body;
  //   formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBB2M7IXJ2Vy5vqYWTIN6R-qvBPjg`;
  //   const course = new Course(formData);

  //   course
  //     .save()
  //     .then(() => {
  //       res.redirect('/');
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.status(500).send('An error occurred while saving the course.');
  //     });
  // }
}

export default new CourseController();

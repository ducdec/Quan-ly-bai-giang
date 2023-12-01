class SiteController {
  async home(req, res, next) {
    try {
      // Logic cho trang chủ
      res.send('Welcome to the home page!');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new SiteController();

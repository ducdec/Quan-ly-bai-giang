import { User } from '../models/User.js';

class UserController {
  constructor() {}

  async showUser(req, res, next) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UserController();

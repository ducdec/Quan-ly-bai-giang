import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
class UserController {
  constructor() {}

  //[GET] /users/getToken
  async getUser(req, res) {
    let token = req.header('Authorization');
    token = token && token.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const verified = jwt.verify(token, jwtSecretKey);

    const user = await User.findById(verified.userId);
    if (verified) {
      return res.status(200).json(user);
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  }

  //[GET]/users/stored
  async showUser(req, res, next) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  //[GET]/users/:id/edit
  async showUserID(req, res, next) {
    try {
      const id = req.params.id;
      const users = await User.findById(id);
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  //[PUT] /users/:id
  async update(req, res, next) {
    try {
      await User.updateOne({ _id: req.params.id }, req.body);
      res.json({ success: true, message: 'users updated successfully' });
    } catch (error) {
      console.error('Error in update:', error);
      next(error);
    }
  }
}

export default new UserController();

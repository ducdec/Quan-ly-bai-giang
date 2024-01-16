import { User } from '../models/User';
import jwt from 'jsonwebtoken';

const IsAuthenticated = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    token = token && token.split(' ')[1];
    if (!token) {
      return next('Please login to access the data');
    }

    const verify = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(verify.userId);
    if (user.role === 'Admin') {
      res.json(user);
      next();
    } else {
      throw new Error('Not Permission Denied');
    }
  } catch (error) {
    return next(error);
  }
};

export default IsAuthenticated;

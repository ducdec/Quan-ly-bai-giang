import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
class UserController {
  constructor() {}

  //[GET] /users/:token
  async getUser(req, res) {
    let token = req.header('Authorization');
    token = token && token.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
      const verified = jwt.verify(token, jwtSecretKey);
      // Kiểm tra thời gian hiệu lực của token
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (verified.exp && verified.exp < currentTimestamp) {
        return res.status(401).json({ error: 'Token has expired' });
      }

      // Truy vấn người dùng từ cơ sở dữ liệu bằng userId
      const user = await User.findById(verified.userId);

      // Gửi dữ liệu người dùng về
      return res.status(200).json(user);
    } catch (error) {
      // Xử lý lỗi xác thực
      console.error('Error during token verification:', error);
      return res.status(401).json({ error: 'Invalid token' });
    }
  }

  //[PUT] /users/setting/:id
  async setting(req, res, next) {
    try {
      // let token = req.header('Authorization');
      // token = token && token.split(' ')[1];
      // if (token == null) return res.sendStatus(401);

      // const jwtSecretKey = process.env.JWT_SECRET_KEY;
      // const verified = jwt.verify(token, jwtSecretKey);

      // // Kiểm tra thời gian hiệu lực của token
      // const currentTimestamp = Math.floor(Date.now() / 1000);
      // if (verified.exp !== undefined && verified.exp < currentTimestamp) {
      //   return res.status(401).json({ error: 'Token has expired' });
      // }

      // const id = verified.userId
      //   ? mongoose.Types.ObjectId(verified.userId)
      //   : null;
      const id = req.params.id;
      // Lấy dữ liệu mới từ yêu cầu
      const { username, image, password } = req.body;

      // Xác định những trường bạn muốn cập nhật
      const updateFields = {};
      if (username) {
        updateFields.username = username;
      }
      if (image) {
        updateFields.image = image;
      }
      if (password) {
        // Thực hiện việc hash mật khẩu nếu có
        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.password = hashedPassword;
      }

      // Thực hiện cập nhật dữ liệu
      const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
        new: true,
      });

      if (!updatedUser) {
        // Nếu không tìm thấy user
        return res
          .status(404)
          .json({ success: false, message: 'User not found' });
      }

      console.log('User updated successfully');
      res.json({
        success: true,
        message: 'User updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error('Error in setting:', error);
      next(error);
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

  //[DELETE] /users/:id/destroy
  async forceDestroy(req, res, next) {
    try {
      await User.deleteOne({ _id: req.params.id });
      console.log('User deleted successfully');
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error in forceDestroy:', error);
      next(error);
    }
  }
}

export default new UserController();

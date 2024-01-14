import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';
import nodemailer from 'nodemailer';
class UserController {
  constructor() {}

  //show
  async showUser(req, res, next) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // [POST] login/signin
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu không
      const existingUser = await User.findOne({ email });
      console.log(existingUser);

      if (!existingUser) {
        return res
          .status(401)
          .json({ error: 'Email hoặc mật khẩu không đúng' });
      }

      // So sánh mật khẩu đã nhập với mật khẩu lưu trữ
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password,
      );

      console.log('Is Password Valid:', isPasswordValid);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ error: 'Email hoặc mật khẩu không đúng' });
      }

      // Tạo và trả về token JWT
      const secretKey = process.env.JWT_SECRET_KEY || 'your-default-secret-key';
      const token = jwt.sign({ userId: existingUser._id }, secretKey, {
        expiresIn: '1h', // Thời gian sống của token
      });

      res.status(200).json({ token, user: existingUser });
    } catch (error) {
      console.error('Lỗi khi đăng nhập người dùng:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng nhập người dùng' });
    }
  }

  // [POST] login/signup
  async signup(req, res, next) {
    try {
      const newUserData = req.body;

      if (
        !newUserData.username ||
        !newUserData.email ||
        !newUserData.password
      ) {
        return res
          .status(400)
          .json({ error: 'Please nhập username, email, and password' });
      }

      const existingUser = await User.findOne({ email: newUserData.email });
      if (existingUser) {
        return res.status(409).json({ error: 'Email đã được sử dụng' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(newUserData.password, 10);
      newUserData.password = hashedPassword;
      const usernow = { role: 'user', ...newUserData };
      const newUser = new User(usernow);

      const savedUser = await newUser.save();

      // Generate a JWT token
      const token = jwt.sign({ userId: savedUser._id }, 'your-secret-key', {
        expiresIn: '1h',
      });

      // Return the token and user data
      res.status(201).json({ token, user: savedUser });
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // [POST] login/password
  async forgotPass(req, res) {
    const { email } = req.body;

    // Kiểm tra xem email có tồn tại không
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    try {
      // Tạo một mã xác nhận ngẫu nhiên
      const randomBytes = CryptoJS.lib.WordArray.random(32);
      const resetToken = CryptoJS.enc.Hex.stringify(randomBytes);
      user.resetToken = resetToken;

      // In ra để kiểm tra
      console.log(resetToken);

      await user.save();

      // Gửi email chứa liên kết xác nhận đến người dùng
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'nguyenvanduc011209@gmail.com',
          pass: 'oiyp cpiv xmpc nwbl',
        },
      });

      const mailOptions = {
        from: '"Quản lý bài giảng " <no-relply@QLBG.com>',
        to: user.email,
        subject: 'Password Reset',
        html: `Vui lòng click vào liên kết dưới đây để thay đổi mật khẩu của bạn:
         <a href= http://localhost:3000/login/password/${resetToken}> Click here</a>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        console.log('Email sent: ' + info.response);
        res.json({
          success: true,
          message: 'Password reset email sent successfully',
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // [POST] login/forgotPassword/:token
  async forgotPassToken(req, res) {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
      // Tìm người dùng với mã xác nhận
      const user = await User.findOne({ resetToken: token });

      if (!user) {
        return res.status(404).json({ error: 'Invalid or expired token' });
      }

      // Hash mật khẩu mới
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Lưu mật khẩu mới vào cơ sở dữ liệu hoặc mảng (trong môi trường thực tế, bạn sẽ lưu vào cơ sở dữ liệu)
      user.password = hashedPassword;

      // Xóa mã xác nhận sau khi mật khẩu đã được đặt lại
      user.resetToken = null;
      await user.save();

      res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UserController();

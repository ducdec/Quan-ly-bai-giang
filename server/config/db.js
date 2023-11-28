import mongoose from 'mongoose';

// Database
const db = 'QLBG';
// Thông tin kết nối MongoDB
const mongoURI = `mongodb://127.0.0.1:27017/${db}`;

//mongodb://127.0.0.1:27017/Duc_education_dev

// Thiết lập kết nối
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);

    console.log('Kết nối MongoDB thành công');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error.message);
    process.exit(1); // Kết thúc quá trình Node.js nếu có lỗi kết nối
  }
};

export default connectDB;

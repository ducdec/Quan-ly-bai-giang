import mongoose from 'mongoose';

const db = 'QLBG';
const URI = `mongodb://127.0.0.1:27017/${db}`;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Thoát với mã lỗi.
  }
};

export default connectDB;

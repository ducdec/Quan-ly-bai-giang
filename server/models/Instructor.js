import mongoose from 'mongoose';
import { Course } from '../models/Course.js';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Đăng ký middleware để tự động cập nhật trường instructors khi thêm hoặc bỏ instructor
schema.post('findOneAndUpdate', async function (doc) {
  if (doc && doc.courses) {
    for (const courseId of doc.courses) {
      await Course.findByIdAndUpdate(courseId, {
        $addToSet: { instructors: doc._id },
      });
    }
  }
});

export const Instructor = mongoose.model('Instructor', schema);

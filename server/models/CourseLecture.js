import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    courseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    lectureID: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' },
  },
  {
    timestamps: true,
  },
);

export const CourseLecture = mongoose.model('CourseLecture', schema);

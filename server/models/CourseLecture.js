import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    lectureID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CourseLecture = mongoose.model('CourseLecture', schema);

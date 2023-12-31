import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    instructorID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const InstructorCourse = mongoose.model('InstructorCourse', schema);

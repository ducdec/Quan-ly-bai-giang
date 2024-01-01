import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    instructorID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    instructor: {
      type: String,
    },
    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    course: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const InstructorCourse = mongoose.model('InstructorCourse', schema);

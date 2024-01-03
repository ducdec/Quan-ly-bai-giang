import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    instructorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    courseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
  },
  {
    timestamps: true,
  },
);

export const InstructorCourse = mongoose.model('InstructorCourse', schema);

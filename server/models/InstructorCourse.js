import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    instructorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    nameIns: { type: String },
    courseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
    nameCourse: { type: String },
  },
  {
    timestamps: true,
  },
);

export const InstructorCourse = mongoose.model('InstructorCourse', schema);

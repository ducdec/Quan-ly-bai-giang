import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    instructor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Instructor',
      default: null,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const InstructorCourse = mongoose.model('InstructorCourse', schema);

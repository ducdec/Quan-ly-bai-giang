import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    instructorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
    lectureID: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' },
  },
  {
    timestamps: true,
  },
);

export const InstructorLecture = mongoose.model('InstructorLecture', schema);

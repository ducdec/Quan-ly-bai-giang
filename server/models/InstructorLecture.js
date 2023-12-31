import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

const schema = new mongoose.Schema(
  {
    instructorID: {
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

export const InstructorLecture = mongoose.model('InstructorLecture', schema);

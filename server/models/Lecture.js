import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Courses',
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Instructor',
    },
    videoID: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Lecture = mongoose.model('Lecture', schema);

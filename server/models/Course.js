import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
    },
    videoID: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Course = mongoose.model('Course', schema);

import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
import mongooseDelete from 'mongoose-delete';

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
    imageFile: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    instructor: {
      type: String,
      required: true,
    },
    status: {
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

schema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

export const Course = mongoose.model('Course', schema);

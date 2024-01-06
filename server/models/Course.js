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
    instructors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
      },
    ],

    status: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: 'name',
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

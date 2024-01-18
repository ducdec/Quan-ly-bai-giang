import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      //type: String,
      data: Buffer,
      contentType: String,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    resetToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model('User', schema);

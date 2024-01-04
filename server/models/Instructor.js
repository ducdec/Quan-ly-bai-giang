import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    courses: [
      {
        name: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Instructor = mongoose.model('Instructor', schema);

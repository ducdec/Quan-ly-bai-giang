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
// Middleware để loại bỏ các tham chiếu đến khóa học đã bị xóa trong instructors
schema.pre('remove', async function (next) {
  const courseId = this._id;

  // Cập nhật instructors tham chiếu đến khóa học này
  await mongoose
    .model('Instructor')
    .updateMany({ courses: courseId }, { $pull: { courses: courseId } });

  next();
});

schema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

export const Course = mongoose.model('Course', schema);

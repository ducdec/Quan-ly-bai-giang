export const mongooseToObject = (mongoose) =>
  mongoose ? mongoose.toObject() : mongoose;

export const mutipleMongooseToObject = (mongooses) =>
  mongooses.map((mongoose) => mongooseToObject(mongoose));

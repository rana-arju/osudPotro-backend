import { Schema, model } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
    },
    content: {
      type: String,
      required: [true, 'Content is required.'],
    },
    tags: {
      type: [String],
      required: [true, "Tags required!"]

    },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

// Query middleware

blogSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
blogSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });

  next();
});

// Create the model
export const Blog = model<IBlog>('Blog', blogSchema);
import { IBlog } from './blog.interface';
import { Blog } from './blog.schema';

const createBlogIntoDB = async (ProjectData: IBlog) => {
  const result = await Blog.create(ProjectData);

  return result;
};
const updateBlogntoDB = async (payload: Partial<IBlog>, id: string) => {
  const blogExist = await Blog.findById(id);
  if (!blogExist) {
    throw new Error('This blog not exist!');
  }
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};
const getAllBlogFromDB = async () => {
  const result = await Blog.find();
  return result;
};
const getBlogFromDB = async (id: string) => {
  const result = await Blog.findOne({ _id: id });

  return result;
};
const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.deleteOne({ _id: id });

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogFromDB,
  getBlogFromDB,
  deleteBlogFromDB,
  updateBlogntoDB,
};
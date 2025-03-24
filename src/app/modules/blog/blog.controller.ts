/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { BlogServices } from './blog.service';

const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = req.body;

    // will call service func to send this data
    const result = await BlogServices.createBlogIntoDB(blog);

    // send response
    res.status(200).json({
      success: true,
      message: 'Blog is created succesfull',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Someting went wrong',
      error,
    });
  }
};
const updateBlog = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { id } = req.params;
    console.log(data, id);
    

    // will call service func to send this data
    const result = await BlogServices.updateBlogntoDB(data, id);

    // send response
    res.status(200).json({
      success: true,
      message: 'Blog is update succesfull',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Someting went wrong',
      error,
    });
  }
};
const getAllBlog = async (req: Request, res: Response) => {
  try {
    // will call service func to send this data
    const result = await BlogServices.getAllBlogFromDB();

    // send response
    res.status(200).json({
      success: true,
      message: 'Blog get succesfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Someting went wrong',
      error,
    });
  }
};

const getBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // will call service func to send this data
    const result = await BlogServices.getBlogFromDB(id);

    // send response
    res.status(200).json({
      success: true,
      message: 'Blog get succesfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Someting went wrong',
      error,
    });
  }
};

// student delete

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // will call service func to send this data
    const result = await BlogServices.deleteBlogFromDB(id);

    // send response
    res.status(200).json({
      success: true,
      message: 'Blog deleted succesful',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Someting went wrong',
      error,
    });
  }
};

export const blogController = {
  createBlog,
  getAllBlog,
  getBlog,
  deleteBlog,
  updateBlog,
};
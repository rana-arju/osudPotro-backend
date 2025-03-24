import express from 'express';
import { blogController } from './blog.controller';
const router = express.Router();

// will call controller function

router.post('/', blogController.createBlog);
router.get('/', blogController.getAllBlog);
router.get('/:id', blogController.getBlog);
router.delete('/:id', blogController.deleteBlog);
router.patch('/:id', blogController.updateBlog);

export const BlogRoutes = router;
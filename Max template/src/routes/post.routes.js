import express from 'express';
import { getFeedPosts, getUserPosts, likePost, updatePost } from "../controllers/index.js"
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get( "/", verifyToken, getFeedPosts )
router.get( "/:id/user/posts", verifyToken, getUserPosts )

router.patch( "/:id/like", verifyToken, likePost );

export default router;
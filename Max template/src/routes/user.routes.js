import express from 'express';
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/index.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser)

router.get( "/:id/friends", verifyToken, getUserFriends )

router.patch( "/:id/friends/:friendId", verifyToken, addRemoveFriend)

export default router;
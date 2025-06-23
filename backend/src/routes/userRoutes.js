import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendReqs, getRecommendedUsers, sendFriendRequest } from '../controllers/userController.js';

const router =express.Router();

// router.get("/",protectRoute,getRecommendedUsers);
// router.get("/friends",protectRoute,getMyFriends);

//apply auth middleware to all routes below
router.use(protectRoute);

router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);

router.post("/friend-request/:id",sendFriendRequest);
router.post("/friend-request/:id/accept",acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;

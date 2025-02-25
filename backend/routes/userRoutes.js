import express from 'express';
const router = express.Router();
import {
	authUser,
	registerUser,
	googleLogin,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/googlelogin', googleLogin);
router.post('/login', authUser);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile); // The protect middleware is used as the first argument to protect the getUserProfile
router
	.route('/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser);

export default router;

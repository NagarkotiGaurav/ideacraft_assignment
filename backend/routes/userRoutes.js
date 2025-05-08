import express from 'express';
import { deleteUser, getAllUsers, loginUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);

// DELETE /api/users/:id
router.delete('/:id', deleteUser);


export default router;

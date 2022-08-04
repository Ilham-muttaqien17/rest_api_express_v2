import express from 'express';
import { 
    getAllUsers, 
    getSingleUser, 
    createUser, 
    updateUser, 
    deleteUser 
} from '../controllers/userController.js';

const router = express.Router();

/*
    Get all users
    @route GET /users
*/
router.get('/', getAllUsers);

/*
    Create new user
    @route POST /users 
*/
router.post('/', createUser);

/* 
    Get a single user
    @route GET /users/:id
*/
router.get('/:id', getSingleUser);

/* 
    Update user by id
    @route PATCH /users/:id
*/
router.patch('/:id', updateUser);

/* 
    Delete user by id
    @route DELETE /users/:id
*/
router.delete('/:id', deleteUser);

export default router;
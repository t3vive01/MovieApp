import { Router } from 'express';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    insertUser,
    selectUserByEmail,
    deleteUser,
    updateUserPassword,
    updateUserEmail,
} from '../../models/User.js';

const { sign } = jwt;
const router = Router();

// Register route
router.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Insert the new user
        const newUser = await insertUser(email, hashedPassword);

        // Send the response with the new user data
        res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
        // Handle errors, such as duplicate email
        if (error.message === 'Email is already taken') {
            return res.status(400).json({ error: 'Email is already taken' });
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Login route
router.post('/login', async (req, res, next) => {
    const invalidMessage = 'Invalid credentials.';
    try {
        const user = await selectUserByEmail(req.body.email);
        if (!user) return next(new Error(invalidMessage));

        const match = await compare(req.body.password, user.password);
        if (!match) return next(new Error(invalidMessage));

        const token = sign({ user: req.body.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ id: user.id, email: user.email, token });
    } catch (error) {
        next(error);
    }
});

// Delete route
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        // Delete the user by ID
        const result = await deleteUser(id);

        // If no rows were deleted, the user was not found
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Successfully deleted
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
});



export default router;
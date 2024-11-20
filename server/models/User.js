import { pool } from '../helpers/db.js';

const insertUser = async (email, hashedPassword) => {
    try {
        // Check if email already exists
        const existingUser = await pool.query('SELECT * FROM account WHERE email = $1', [email]);

        if (existingUser.rows.length > 0) {
            throw new Error('Email is already taken');
        }

        // Insert new user if email does not exist
        const result = await pool.query(
            'INSERT INTO account (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashedPassword]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`Error inserting user: ${error.message}`);
        throw error;  // Re-throw the error to be handled in the route handler
    }
};




const selectUserByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM account WHERE email = $1', [email]);
        return result.rows[0]; // Return the user if found
    } catch (error) {
        console.error(`Error selecting user by email: ${error.message}`);
        throw new Error('Failed to fetch user');
    }
};

const deleteUser = async (id) => {
    try {
        const result = await pool.query('DELETE FROM account WHERE id = $1 RETURNING *', [id]);
        return result; // The result will have a rowCount property
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error; // Let the route handler catch the error
    }
};




const updateUserPassword = async (email, hashedPassword) => {
    try {
        const result = await pool.query(
            'UPDATE account SET password = $1 WHERE email = $2 RETURNING *',
            [hashedPassword, email]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`Error updating user password: ${error.message}`);
        throw new Error('Failed to update password');
    }
};

const updateUserEmail = async (oldEmail, newEmail) => {
    try {
        const result = await pool.query(
            'UPDATE account SET email = $1 WHERE email = $2 RETURNING *',
            [newEmail, oldEmail]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`Error updating user email: ${error.message}`);
        throw new Error('Failed to update email');
    }
};

export { insertUser, selectUserByEmail, deleteUser, updateUserPassword, updateUserEmail };
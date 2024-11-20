CREATE TABLE GroupMembers (
    group_member_id SERIAL PRIMARY KEY,
    group_id INT REFERENCES Groups(group_id) ON DELETE CASCADE,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

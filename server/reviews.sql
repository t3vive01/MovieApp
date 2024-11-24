CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    comment TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 0 AND rating <= 5)
);

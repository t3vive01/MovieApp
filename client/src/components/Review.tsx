import React, { useState, useEffect } from 'react';

interface Review {
    id: number;
    username: string;
    comment: string;
    rating: number;
}

const Review: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState({ username: '', comment: '', rating: 0 });

    // Fetch reviews from the backend
    useEffect(() => {
        fetch('/api/reviews')
            .then((response) => response.json())
            .then((data) => setReviews(data))
            .catch((error) => console.error('Error fetching reviews:', error));
    }, []);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview),
            });
            if (response.ok) {
                const addedReview = await response.json();
                setReviews((prev) => [...prev, addedReview]);
                setNewReview({ username: '', comment: '', rating: 0 });
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div>
            <h1>Reviews</h1>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>
                        <strong>{review.username}</strong>: {review.comment} (Rating: {review.rating}/5)
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={newReview.username}
                    onChange={(e) => setNewReview({ ...newReview, username: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Your review"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Rating (0-5)"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: +e.target.value })}
                    min="0"
                    max="5"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Review;

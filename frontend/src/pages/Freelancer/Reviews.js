import React, { useState } from "react";
import "./FreelancerProfile.css"; // Add CSS for styling

const FreelancerProfile = () => {
  const [reviews, setReviews] = useState([
    { rating: 5, comment: "Great work, highly recommended!" },
  ]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && comment.trim()) {
      const newReview = { rating, comment };
      setReviews([newReview, ...reviews]); // Add new review to list
      setRating(0);
      setComment("");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>John Doe</h2>
        <p>Web Developer | React & Node.js</p>
        <p>⭐⭐⭐⭐⭐ (4.8/5)</p>
        <p>Experienced in frontend and backend development.</p>
      </div>

      {/* Review Form */}
      <div className="review-section">
        <h3>Leave a Review</h3>
        <form onSubmit={handleReviewSubmit} className="review-form">
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
          <textarea
            placeholder="Write a review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit Review</button>
        </form>
      </div>

      {/* Display Reviews */}
      <div className="reviews-list">
        <h3>Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p>⭐ {review.rating}/5</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfile;

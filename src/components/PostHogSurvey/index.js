console.log("PostHogSurvey is loading");
console.log("PostHogSurvey is loading");
console.log("PostHogSurvey is loading");


// src/components/PostHogSurvey/index.js
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

console.log("PostHogSurvey is loading");

export default function PostHogSurvey({ 
  question = "How would you rate your experience?", 
  placeholder = "Please share your feedback...",
  buttonText = "Submit",
  thankYouMessage = "Thank you for your feedback!",
  surveyId = "custom-docusaurus-survey",
  surveyName = "Docusaurus User Feedback"
}) {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.posthog) {
      // Capture survey shown event
      window.posthog.capture('survey shown', {
        $survey_id: surveyId,
        $survey_name: surveyName
      });
    }
  }, [surveyId, surveyName]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof window !== 'undefined' && window.posthog) {
      // Send survey data to PostHog
      window.posthog.capture('survey sent', {
        $survey_id: surveyId,
        $survey_name: surveyName,
        response: feedback,
        rating: rating
      });
      console.log("Survey data sent to PostHog", {
        surveyId,
        surveyName,
        response: feedback,
        rating
      });
    } else {
      console.warn('PostHog not available. Survey data not sent.');
    }
    
    // Reset form and show thank you message
    setSubmitted(true);
    setFeedback('');
    setRating(null);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  // Rating component with stars or numbers
  const RatingSelector = () => {
    return (
      <div className={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            className={`${styles.ratingButton} ${rating === star ? styles.selected : ''}`}
            onClick={() => handleRatingChange(star)}
            aria-label={`Rate ${star} out of 5`}
          >
            {star}
          </button>
        ))}
      </div>
    );
  };

  console.log("PostHogSurvey is rendering");

  return (
    <div className={styles.surveyContainer}>
      {!submitted ? (
        <form onSubmit={handleSubmit} className={styles.surveyForm}>
          <h3 className={styles.surveyQuestion}>{question}</h3>
          
          <RatingSelector />
          
          <textarea
            className={styles.feedbackInput}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={placeholder}
            rows={3}
          />
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={!rating}
          >
            {buttonText}
          </button>
        </form>
      ) : (
        <div className={styles.thankYouMessage}>
          {thankYouMessage}
        </div>
      )}
    </div>
  );
}
import React from 'react';
import DocItemFooter from '@theme-original/DocItem/Footer';
import PostHogWrapper from '@site/src/components/PostHogWrapper';

export default function DocItemFooterWrapper(props) {
  // Simple survey component that doesn't rely on useDoc
  const SurveyComponent = () => {
    const [rating, setRating] = React.useState(null);
    const [comment, setComment] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);
    
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Send data to PostHog if available
      if (window.posthog) {
        window.posthog.capture('survey sent', {
          rating: rating,
          comment: comment,
          page: window.location.pathname
        });
      }
      
      setSubmitted(true);
      setRating(null);
      setComment('');
    };
    
    const surveyStyle = {
      marginBottom: '2rem',
      padding: '1rem',
      borderRadius: '8px',
      backgroundColor: 'var(--ifm-background-surface-color)',
      border: '1px solid var(--ifm-color-emphasis-300)'
    };
    
    if (submitted) {
      return (
        <div style={surveyStyle}>
          <p style={{ textAlign: 'center', margin: 0 }}>Thank you for your feedback!</p>
        </div>
      );
    }
    
    return (
      <div style={surveyStyle}>
        <h4 style={{ marginTop: 0 }}>Was this page helpful?</h4>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => setRating(value)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: rating === value ? '2px solid var(--ifm-color-primary)' : '1px solid var(--ifm-color-emphasis-300)',
                backgroundColor: rating === value ? 'var(--ifm-color-primary)' : 'transparent',
                color: rating === value ? 'white' : 'inherit',
                cursor: 'pointer'
              }}
            >
              {value}
            </button>
          ))}
        </div>
        <textarea
          placeholder="Tell us what you think about this documentation..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid var(--ifm-color-emphasis-300)',
            marginBottom: '1rem'
          }}
          rows={3}
        />
        <button
          onClick={handleSubmit}
          disabled={!rating}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--ifm-color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: rating ? 'pointer' : 'not-allowed',
            opacity: rating ? 1 : 0.6
          }}
        >
          Submit feedback
        </button>
      </div>
    );
  };

  console.log('DocItemFooterWrapper is rendering');

  // Render survey above original footer
  return (
    <>
      <PostHogWrapper />
      <SurveyComponent />
      <DocItemFooter {...props} />
    </>
  );
}
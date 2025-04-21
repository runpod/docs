import React, { useEffect, useState } from 'react';
import PostHogSurvey from './PostHogSurvey';

export default function PostHogWrapper() {
  const [posthogInitialized, setPosthogInitialized] = useState(false);
  console.log("PostHogWrapper is rendering");
  useEffect(() => {
    // Check if PostHog is available
    if (typeof window !== 'undefined' && window.posthog) {
      setPosthogInitialized(true);
    }
  }, []);

  if (!posthogInitialized) {
    return null;
  }

  return <PostHogSurvey />;
} 
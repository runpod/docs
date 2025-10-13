
document.addEventListener('DOMContentLoaded', (event) => {
    // Function to handle feedback clicks
    const handleFeedback = (isHelpful) => {
        const pagePath = window.location.pathname;
        posthog.capture('Feedback Submitted', {
            page: pagePath,
            helpful: isHelpful
        });
    };

    // Find the feedback buttons. 
    // Note: This is a best-effort attempt to find the buttons. 
    // If this doesn't work, you may need to provide more specific CSS selectors.
    const feedbackContainer = document.querySelector('.feedback-toolbar');
    if (feedbackContainer) {
        const yesButton = Array.from(feedbackContainer.querySelectorAll('button')).find(button => button.textContent.trim() === 'Yes');
        const noButton = Array.from(feedbackContainer.querySelectorAll('button')).find(button => button.textContent.trim() === 'No');

        if (yesButton) {
            yesButton.addEventListener('click', () => handleFeedback(true));
        }

        if (noButton) {
            noButton.addEventListener('click', () => handleFeedback(false));
        }
    }
});

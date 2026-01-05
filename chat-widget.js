// Runpod Docs Chat Widget
const WIDGET_BASE_URL = "https://runpod-assistant-doc-backend.vercel.app";

const script = document.createElement("script");
script.src = `${WIDGET_BASE_URL}/chat-widget.js`;
script.async = true;
script.setAttribute("data-api-url", `${WIDGET_BASE_URL}/api`);
script.setAttribute("data-title", "Runpod Assistant");
script.setAttribute("data-greeting", "Hi! How can I help you with Runpod today?");
script.setAttribute("data-primary-color", "#5D29F0");
document.head.appendChild(script);

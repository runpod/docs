import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

export default function RawTextRedirect() {
  const location = useLocation();
  
  useEffect(() => {
    // Get the current path without the leading slash
    const path = location.pathname.substring(1);
    
    // Redirect to the same path, but as a direct file request
    // This bypasses Docusaurus routing and loads the file directly from the static directory
    window.location.replace(`/${path}`);
  }, [location]);
  
  return (
    <div>
      <p>Redirecting to file...</p>
    </div>
  );
} 
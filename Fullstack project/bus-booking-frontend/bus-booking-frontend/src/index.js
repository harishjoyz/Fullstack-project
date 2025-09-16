import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Import CSS files
import "./index.css";
import "./App.css";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console for debugging
    console.error("React Error Boundary caught an error:", error, errorInfo);
    
    // You can also log to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#333'
        }}>
          <h1>🚨 Something went wrong</h1>
          <p>We're sorry, but something unexpected happened.</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            🔄 Reload Page
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ marginTop: '20px', textAlign: 'left' }}>
              <summary>Error Details (Development)</summary>
              <pre style={{ 
                background: '#f8f9fa', 
                padding: '10px', 
                borderRadius: '5px',
                overflow: 'auto',
                fontSize: '12px'
              }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Performance monitoring
const reportWebVitals = (metric) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', metric);
  }
  
  // Send to analytics service in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Google Analytics
    // gtag('event', metric.name, {
    //   event_category: 'Web Vitals',
    //   event_label: metric.id,
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   non_interaction: true,
    // });
  }
};

// Main App Component with Error Boundary
const AppWithErrorBoundary = () => (
  <ErrorBoundary>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ErrorBoundary>
);

// Get root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Make sure you have a div with id='root' in your HTML.");
}

// Create root and render
const root = createRoot(rootElement);

// Render with error handling
try {
  root.render(<AppWithErrorBoundary />);
} catch (error) {
  console.error("Failed to render app:", error);
  
  // Fallback error display
  rootElement.innerHTML = `
    <div style="
      padding: 20px;
      text-align: center;
      font-family: system-ui, -apple-system, sans-serif;
      color: #333;
    ">
      <h1>🚨 Failed to Load App</h1>
      <p>We're sorry, but the application failed to load.</p>
      <button onclick="window.location.reload()" style="
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      ">
        🔄 Reload Page
      </button>
    </div>
  `;
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Performance monitoring
if (process.env.NODE_ENV === 'production') {
  // Import and measure web vitals
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
    getTTFB(reportWebVitals);
  }).catch((error) => {
    console.log('Web Vitals not available:', error);
  });
}

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
  // Set page title
  document.title = '🚌 Bus Booking System';
  
  // Add skip link for accessibility
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main content landmark
  const mainContent = document.querySelector('main') || document.querySelector('.container');
  if (mainContent) {
    mainContent.id = 'main-content';
    mainContent.setAttribute('role', 'main');
  }
});

// Export for potential external use
export { reportWebVitals };
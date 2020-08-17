import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import AuthFailure from './Components/AuthFailure/AuthFailure';
import AuthService from './Services/AuthService';

// Security Warning: Be aware that this code sample uses the browser's sessionStorage to store tokens. 
// This means the token could be extracted if the site is vulnerable to an XSS attack or if 
// untrusted/malicious scripts are executed in your web app. Keep this in mind when using this authentication flow.

let authService = new AuthService();

authService.HandlePageLoadEvent().then(() => {
    // auth flow was successful.
    // start the application now.
    ReactDOM.render(<App authServiceInstance={authService} />, document.getElementById('root'));
}).catch((error) => {
    // auth flow has failed.
    // display an error instead of starting the main application.
    ReactDOM.render(<AuthFailure errorMessage={error} />, document.getElementById('root'));
});

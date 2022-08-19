import React from 'react';

function Login() {
  return (
    <div>
      <input type="email" placeholder="insert your email" data-testid="email-input" />
      <input
        type="password"
        placeholder="insert your password"
        data-testid="password-input"
      />
      <button type="button" data-testid="login-submit-btn">Enter</button>
    </div>
  );
}

export default Login;

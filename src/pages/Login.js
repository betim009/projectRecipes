import React, { useContext, useState } from 'react';
import AppContext from '../AppContext/AppContext';

function Login() {
  const [disabled, setDisabled] = useState(true);
  const { email,
    setEmail,
    password,
    setPassword,
  } = useContext(AppContext);

  const validate = () => {
    const max = 6;
    if (/\S+@\S+\.\S+/.test(email) && password.length >= max) {
      return setDisabled(false);
    }
    return setDisabled(true);
  };

  return (
    <div>
      <input
        type="email"
        placeholder="insert your email"
        data-testid="email-input"
        onChange={ ({ target }) => { setEmail(target.value); validate(); } }
        value={ email }
      />
      <input
        type="password"
        placeholder="insert your password"
        data-testid="password-input"
        onChange={ ({ target }) => { setPassword(target.value); validate(); } }
        value={ password }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disabled }
      >
        Enter

      </button>
    </div>
  );
}

export default Login;

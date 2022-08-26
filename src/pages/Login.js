import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import '../style/signin.css';

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

  const history = useHistory();
  const saveStorage = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  return (
    <div className="text-center div-center">
      <form className="form-signin">
        <div className="form-floating">
          <h1 className="h4 mb-2">Please sign in</h1>
          <input
            type="email"
            placeholder="type your email"
            data-testid="email-input"
            onChange={ ({ target }) => { setEmail(target.value); validate(); } }
            value={ email }
          />
        </div>
        <input
          type="password"
          placeholder="type your password"
          data-testid="password-input"
          onChange={ ({ target }) => { setPassword(target.value); validate(); } }
          value={ password }
        />
        <button
          className="btn btn-primary btn-block bt mt-1"
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ saveStorage }
        >
          Enter

        </button>
      </form>
    </div>
  );
}

export default Login;

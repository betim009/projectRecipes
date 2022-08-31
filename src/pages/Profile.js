import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const [emailState, setEmailState] = useState('');
  useEffect(() => {
    if (localStorage.getItem('user')) {
      const { email } = JSON.parse(localStorage.getItem('user'));
      setEmailState(email);
    }
  }, []);
  const history = useHistory();

  const handleClear = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" search={ false } />
      <div className="container centro">
        <p
          className="h5 text-center"
          data-testid="profile-email"
        >
          { emailState }

        </p>
        <button
          className="btn bg-amarelo btn-block"
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }

        >
          Done Recipes
        </button>
        <button
          className="btn bg-amarelo btn-block"
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }

        >
          Favorite Recipes
        </button>
        <button
          className="btn bg-amarelo btn-block"
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleClear }

        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleClear = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" search={ false } />
      <div>
        <p data-testid="profile-email">{ email }</p>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }

        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }

        >
          Favorite Recipes
        </button>
        <button
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

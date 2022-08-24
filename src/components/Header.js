import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, search }) {
  const history = useHistory();
  const [searchBar, setSearchBar] = useState(false);

  return (
    <header>
      <div>
        <h1 data-testid="page-title">{ title }</h1>
      </div>
      <div>
        <button
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile icon"
          />
        </button>
      </div>
      { search
&& (
  <div>
    <button
      type="button"
      onClick={ () => setSearchBar((prev) => !prev) }
    >
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="search icon"
      />

    </button>
  </div>) }
      <div>
        {
          searchBar
          && <SearchBar title={ title } />
        }
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;

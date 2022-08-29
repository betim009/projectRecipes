import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Header({ title, search }) {
  const history = useHistory();
  const [searchBar, setSearchBar] = useState(false);

  return (
    <header className="mb-2">
      <nav className="navbar navbar-expand-md bg-primary">
        <div className="container-fluid justify-content-center">
          <h1 className="h3 text-light m-1" data-testid="page-title">{ title }</h1>
          <button
            type="button"
            onClick={ () => history.push('/profile') }
          >
            <img
              src={ profileIcon }
              data-testid="profile-top-btn"
              alt="profile icon"
            />
          </button>
          { search
&& (

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
) }
          <div>
            {
              searchBar
            && <SearchBar title={ title } />
            }
          </div>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;

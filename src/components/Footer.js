import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer" className="footer">
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="A button that sends you to the drink page"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/foods') }
      >
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="A button that sends you to the meal page"
        />
      </button>
    </footer>
  );
}

export default Footer;

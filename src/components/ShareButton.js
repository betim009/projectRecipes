import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButton({ pathname }) {
  const [isLinkCopied, setIsLinkCopied] = useState(true);
  return (
    <div>
      <button
        type="button"
        onClick={ () => {
          copy(`http://localhost:3000${pathname}`);
          setIsLinkCopied(false);
        } }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="A button that share the recipe"
        />
      </button>
      <p hidden={ isLinkCopied }>Link copied!</p>
    </div>
  );
}

ShareButton.propTypes = {
  pathname: PropTypes.string.isRequired,
};

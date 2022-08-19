import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Provider from '../AppContext/Provider';

const renderWithRouterAndContext = (component, AppContext, historyEntries = ['/']) => {
  const history = createMemoryHistory({ initialEntries: historyEntries });
  return {
    ...render(
      <Provider value={ AppContext }>
        <Router history={ history }>
          {component}
        </Router>
      </Provider>,
    ),
    history,
  };
};

export default renderWithRouterAndContext;

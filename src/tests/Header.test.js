import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import Provider from '../AppContext/Provider';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';

describe('O componente Header', () => {
  const profileIcon = 'profile-top-btn';
  const searchIcon = 'search-top-btn';

  it('está presente na página Foods, com busca, e vai para a rota Profile', () => {
    const pageFoods = renderWithRouterAndContext(
      <Foods />, Provider,
    );
    const { history } = pageFoods;

    const profileImage = screen.getByTestId(profileIcon);
    const searchImage = screen.getByTestId(searchIcon);
    const header = screen.getByRole('heading');

    expect(header).toBeDefined();
    expect(profileImage).toBeDefined();
    expect(searchImage).toBeDefined();

    userEvent.click(profileImage);
    expect(history.location.pathname).toBe('/profile');
  });
  it('Está presente na página Drinks e exibe o campo de busca clicando no botão', () => {
    renderWithRouterAndContext(
      <Drinks />, Provider,
    );

    const profileImage = screen.getByTestId(profileIcon);
    const searchImage = screen.getByTestId(searchIcon);
    const header = screen.getByRole('heading');
    // const searchBar = screen.getByTestId('search-input');

    expect(header).toBeDefined();
    expect(profileImage).toBeDefined();
    expect(searchImage).toBeDefined();

    userEvent.click(searchImage);
    expect(screen.getByTestId('search-input')).toBeDefined();
  });
});

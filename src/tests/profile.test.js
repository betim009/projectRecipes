import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import App from '../App';

describe('Testes da página <Page />', () => {
  it('1. Testa login.', () => {
    const { history } = renderWithRouterAndContext(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPass = screen.getByTestId('password-input');
    const btn = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'betim009@gmail.com');
    userEvent.type(inputPass, '1234612331');
    userEvent.click(btn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods');

    const iconPerfil = screen.getByTestId('profile-top-btn');
    userEvent.click(iconPerfil);

    const text = screen.getByText('Profile');
    expect(text).toBeInTheDocument();

    const btnDone = screen.getByTestId(/profile-done-btn/i);
    const btnFav = screen.getByTestId(/profile-favorite-btn/i);
    const btnLgt = screen.getByTestId(/profile-logout-btn/i);

    expect(btnDone && btnFav && btnLgt).toBeInTheDocument();

    const emailId = screen.getByTestId('profile-email');
    expect(emailId).toBeInTheDocument();

    const foodIcon = screen.getByTestId('food-bottom-btn');
    const recipeIcon = screen.getByTestId('drinks-bottom-btn');

    expect(foodIcon && recipeIcon).toBeInTheDocument();

    // userEvent.click(btnDone);
  });
  it('2. Testa rota de done-recipes.', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/profile');

    const btnDone = screen.getByTestId('profile-done-btn');

    userEvent.click(btnDone);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/done-recipes');
  });
  it('2. Testa rota de favorite-recipes.', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/profile');

    const btnFav = screen.getByTestId('profile-favorite-btn');

    userEvent.click(btnFav);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorite-recipes');
  });
  it('3. Testa rota logout para /.', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/profile');

    const btnLgt = screen.getByTestId(/profile-logout-btn/i);

    userEvent.click(btnLgt);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});

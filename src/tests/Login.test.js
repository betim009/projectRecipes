import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import App from '../App';
import Provider from '../AppContext/Provider';

describe('A página Login', () => {
  it('Verifica o input de email', () => {
    const pageLogin = renderWithRouterAndContext(
      <App />, Provider,
    );

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'izabel@gmail.com');
    userEvent.type(passwordInput, '1234567');

    expect(emailInput).toHaveValue('izabel@gmail.com');
    expect(passwordInput).toHaveValue('1234567');
    expect(button).toBeEnabled();

    const { history } = pageLogin;
    userEvent.click(button);
    expect(history.location.pathname).toBe('/foods');
  });
});

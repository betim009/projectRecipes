import React, { useContext } from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event'
import AppContext from '../AppContext/AppContext'
import Login from '../pages/Login'

describe('A página Login', () => {
    it('Verifica o input de email', () => {
        const email = 'izabel@gmail.com'
        const password = '123456'
        renderWithRouter(
            <AppContext.Provider value={{ email, setEmail, password, setPassword }}>
                <Login />
            </AppContext.Provider>
        );

         const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const button = screen.getByTestId('login-submit-btn'); 

         expect(emailInput).toBeInTheDocument;
         expect(passwordInput).toBeInTheDocument;
         expect(button).toBeInTheDocument;
         expect(button).toBeDisabled;

         userEvent.type(emailInput, 'izabel@gmail.com');
         userEvent.type(passwordInput, '123456');

         expect(button).toBeEnabled;

    })
});
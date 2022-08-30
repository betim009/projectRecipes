import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import App from '../App';

describe('Testes da página <Page />', () => {
  it('1. Testa Receitas.', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods');

    const botao = screen.findByTestId(/'Beef-category-filter'/i);
    expect(botao).toBeDefined();
  });
});

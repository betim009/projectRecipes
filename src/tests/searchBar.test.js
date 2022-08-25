import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import App from '../App';

describe('Testes do component <SearchBar />', () => {
  it('1. Testa se o botões e títulos estão na tela.', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeDefined();

    const foodBtn = screen.getByTestId(/search-top-btn/i);
    expect(foodBtn).toBeDefined();

    const foodsText = screen.getByText('Foods');
    expect(foodsText).toBeInTheDocument();
  });
  it('2. Testando botão "search-top-btn".', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const serachButton = screen.getByTestId(/search-top-btn/i);
    userEvent.click(serachButton);

    const inputText = screen.getByTestId(/search-input/i);
    expect(inputText).toBeDefined();

    const radioIg = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId(/name-search-radio/i);
    const radioFl = screen.getByTestId('first-letter-search-radio');

    expect(radioFl && radioName && radioIg).toBeDefined();

    const buttonSearch = screen.getByTestId(/exec-search-btn/i);
    expect(buttonSearch).toBeDefined();
  });
  it('3. Testando busca por Rice', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const serachButton = screen.getByTestId(/search-top-btn/i);
    userEvent.click(serachButton);

    const inputText = screen.getByTestId(/search-input/i);
    userEvent.type(inputText, 'rice');

    const radioIg = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioIg);

    const buttonSearch = screen.getByTestId(/exec-search-btn/i);
    userEvent.click(buttonSearch);

    const element = await screen.findByTestId('0-recipe-card');
    await expect(element).toBeInTheDocument();
  });
  it('4. Testando a busca por um único elemento', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const serachButton = screen.getByTestId(/search-top-btn/i);
    userEvent.click(serachButton);

    const inputText = screen.getByTestId('search-input');
    userEvent.type(inputText, 'gohan');

    const radioName = screen.getByTestId('name-search-radio');
    userEvent.click(radioName);

    const buttonSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(buttonSearch);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/foods/53033');
    });
  });
  it('5. Testando a busca quando não possui nenhum elemento, por igridient', async () => {
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const serachButton = screen.getByTestId(/search-top-btn/i);
    userEvent.click(serachButton);

    const textInput = screen.getByTestId(/search-input/i);
    const radioName = screen.getByTestId(/name-search-radio/i);

    userEvent.type(textInput, 'goku');
    userEvent.click(radioName);

    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);

    await waitFor(() => { expect(global.alert).toHaveBeenCalledTimes(1); });
  });
  it('6. testando por busca em first letter', async () => {
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    const n = 3;

    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const iconBtn = screen.getByTestId('search-top-btn');
    userEvent.click(iconBtn);

    const searchBtn = screen.getByTestId(/exec-search-btn/i);
    const textInput = screen.getByTestId(/search-input/i);
    const radioFirst = screen.getByTestId(/first-letter-search-radio/i);
    const radioName = screen.getByTestId(/ingredient-search-radio/i);

    userEvent.type(textInput, 'z');
    userEvent.click(radioFirst);
    userEvent.click(searchBtn);
    await waitFor(() => { expect(global.alert).toHaveBeenCalledTimes(1); });

    userEvent.type(textInput, 'goku');
    userEvent.click(radioFirst);
    userEvent.click(searchBtn);
    await waitFor(() => { expect(global.alert).toHaveBeenCalledTimes(2); });

    userEvent.click(radioName);
    userEvent.type(textInput, 'z');
    userEvent.click(searchBtn);
    await waitFor(() => { expect(global.alert).toHaveBeenCalledTimes(n); });
  });
  it('7. fetch first letter', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const iconBtn = screen.getByTestId('search-top-btn');
    userEvent.click(iconBtn);

    const searchBtn = screen.getByTestId(/exec-search-btn/i);
    const textInput = screen.getByTestId(/search-input/i);
    const radioFirst = screen.getByTestId(/first-letter-search-radio/i);
    userEvent.type(textInput, 'a');
    userEvent.click(radioFirst);
    userEvent.click(searchBtn);
    const element = await screen.findByTestId('0-recipe-card');
    expect(element).toBeInTheDocument();
  });
});

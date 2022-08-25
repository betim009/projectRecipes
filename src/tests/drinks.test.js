import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import App from '../App';

describe('Testes do component <SearchBar />', () => {
  it('8. fetchs', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/drinks');
    const IconButton = screen.getByTestId(/search-top-btn/i);
    userEvent.click(IconButton);
    const input = screen.getByTestId(/search-input/i);
    const nameRadio = screen.getByTestId('name-search-radio');
    const igridientRadio = screen.getByTestId('ingredient-search-radio');
    const firstRadio = screen.getByTestId('first-letter-search-radio');
    const search = screen.getByTestId(/exec-search-btn/i);

    userEvent.type(input, 'vodka');
    userEvent.click(nameRadio);

    userEvent.click(search);
    const div = await screen.findByTestId(/0-recipe-card/i);
    await expect(div).toBeInTheDocument();

    userEvent.click(igridientRadio);
    userEvent.type(input, 'ice');
    userEvent.click(search);
    const div2 = await screen.findByTestId('0-recipe-card');
    expect(div2).toBeInTheDocument();

    userEvent.click(firstRadio);
    userEvent.type(input, 'i');
    userEvent.click(search);
    const div3 = await screen.findByTestId('0-recipe-card');
    await expect(div3).toBeInTheDocument();
  });
  it('alerts', async () => {
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/drinks');
    const IconButton = screen.getByTestId('search-top-btn');
    userEvent.click(IconButton);
    const input = screen.getByTestId('search-input');
    const firstRadio = screen.getByTestId('first-letter-search-radio');
    const search = screen.getByTestId('exec-search-btn');

    userEvent.click(firstRadio);
    userEvent.type(input, 'go');
    userEvent.click(search);
    await waitFor(() => { expect(global.alert).toHaveBeenCalledTimes(1); });
  });
  //   it('second alert', async () => {
  //     jest.spyOn(global, 'alert').mockImplementation(() => {});
  //     const { history } = renderWithRouterAndContext(<App />);
  //     history.push('/drinks');
  //     const IconButton = screen.getByTestId('search-top-btn');
  //     userEvent.click(IconButton);

  //     const input = screen.getByTestId('search-input');
  //     const nameRadio = screen.getByTestId('name-search-radio');
  //     const search = screen.getByTestId('exec-search-btn');

//     userEvent.click(nameRadio);
//     userEvent.type(input, 'namehilarios');
//     userEvent.click(search);
//     await waitFor(() => { expect(global.alert).toHaveBeenCalledTimes(1); });
//   });
});

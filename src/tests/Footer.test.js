import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import Provider from '../AppContext/Provider';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';

describe('O componente footer', () => {
  const drinkIcon = 'drinks-bottom-btn';
  const foodIcon = 'food-bottom-btn';

  it('estará presente na página Foods', () => {
    const pageFoods = renderWithRouterAndContext(
      <Foods />, Provider,
    );
    const { history } = pageFoods;

    const drinkImage = screen.getByTestId(drinkIcon);
    const mealImage = screen.getByTestId(foodIcon);

    expect(screen.getByTestId('footer')).toBeDefined();
    expect(drinkImage)
      .toHaveAttribute('alt', 'A button that sends you to the drink page');
    expect(mealImage).toHaveAttribute('alt', 'A button that sends you to the meal page');

    userEvent.click(drinkImage);
    expect(history.location.pathname).toBe('/drinks');
  });
  it('estará presente na página Drinks', () => {
    const pageDrinks = renderWithRouterAndContext(
      <Drinks />, Provider,
    );
    const { history } = pageDrinks;

    const drinkImage = screen.getByTestId(drinkIcon);
    const mealImage = screen.getByTestId(foodIcon);

    expect(screen.getByTestId('footer')).toBeDefined();
    expect(drinkImage).toBeDefined();
    expect(mealImage).toBeDefined();

    userEvent.click(mealImage);
    expect(history.location.pathname).toBe('/foods');
  });
  it('estará presente na página Profile', () => {
    const pageProfile = renderWithRouterAndContext(
      <Profile />, Provider,
    );
    const { history } = pageProfile;

    const drinkImage = screen.getByTestId(drinkIcon);
    const mealImage = screen.getByTestId(foodIcon);

    expect(screen.getByTestId('footer')).toBeDefined();
    expect(drinkImage).toBeDefined();
    expect(mealImage).toBeDefined();

    userEvent.click(mealImage);
    expect(history.location.pathname).toBe('/foods');
  });
});

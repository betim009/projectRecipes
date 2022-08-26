import { screen } from '@testing-library/react';
import React from 'react';
import Provider from '../AppContext/Provider';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const mockStorage = {
  alcoholicOrNot: '',
  category: 'Side',
  id: '52977',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  name: 'Corba',
  nationality: 'Turkish',
  type: 'food',
};

const string = `{
  alcoholicOrNot: '',
  category: 'Side',
  id: '52977',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  name: 'Corba',
  nationality: 'Turkish',
  type: 'food',
}`;

describe('A página Favorite Recipes', () => {
  it('é renderizada com os cards favoritados', () => {
    localStorage.setItem('favoriteRecipes', string);
    renderWithRouterAndContext(
      <FavoriteRecipes />, Provider,
    );

    const img = screen.getByTestId('0-horizontal-image');
    const text = screen.getByTestId('0-horizontal-top-text');
    const name = screen.getByTestId('0-horizontal-name');
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    const heartBtn = screen.getByTestId('0-horizontal-favorite-btn');

    expect(img).toHaveAttribute('src', mockStorage.image);
    expect(text)
      .toHaveTextContent(`${mockStorage.nationality} - ${mockStorage.category}`);
    expect(name).toHaveTextContent(mockStorage.name);
    expect(shareBtn).toHaveAttribute('alt', 'A button that share the recipe');
    expect(heartBtn).toHaveAttribute('alt', 'A button that favorite the recipe');
  });
//   it('estará presente na página Drinks', () => {
//     renderWithRouterAndContext(
//       <FavoriteRecipes />, Provider,
//     );
//   });
//   it('estará presente na página Profile', () => {
//     renderWithRouterAndContext(
//       <FavoriteRecipes />, Provider,
//     );
//   });
});

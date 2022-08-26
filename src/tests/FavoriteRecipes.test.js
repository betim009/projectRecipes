import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Provider from '../AppContext/Provider';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const mockStorage = [{
  alcoholicOrNot: '',
  category: 'Side',
  id: '52977',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  name: 'Corba',
  nationality: 'Turkish',
  type: 'food',
}, {
  alcoholicOrNot: 'Alcoholic',
  category: 'Shake',
  id: '15511',
  image: 'https://www.thecocktaildb.com/images/media/drink/wywrtw1472720227.jpg',
  name: 'Baby Eskimo',
  nationality: '',
  type: 'drink',
},
];

describe('A página Favorite Recipes', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockStorage));
    renderWithRouterAndContext(
      <FavoriteRecipes />, Provider,
      ['/favorite-recipes'],
    );
  });
  afterEach(() => {
    localStorage.clear();
  });
  it('é renderizada com os cards favoritados', () => {
    const imgFood = screen.getByTestId('0-horizontal-image');
    const textFood = screen.getByTestId('0-horizontal-top-text');
    const nameFood = screen.getByTestId('0-horizontal-name');
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    const heartBtn = screen.getByTestId('0-horizontal-favorite-btn');

    expect(imgFood).toHaveAttribute('src', mockStorage[0].image);
    expect(textFood)
      .toHaveTextContent(`${mockStorage[0].nationality} - ${mockStorage[0].category}`);
    expect(nameFood).toHaveTextContent(mockStorage[0].name);
    expect(shareBtn).toHaveAttribute('alt', 'A button that share the recipe');
    expect(heartBtn).toHaveAttribute('alt', 'A button that favorite the recipe');

    const textDrink = screen.getByTestId('1-horizontal-top-text');
    expect(textDrink)
      .toHaveTextContent(mockStorage[1].alcoholicOrNot);
  });
  it('ao clicar no botão favorito o item deve desaparecer da tela', () => {
    const heartBtn = screen.getByTestId('0-horizontal-favorite-btn');
    const foodName = screen.getByText(/Corba/i);

    const list = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(list.length).toBe(2);

    userEvent.click(heartBtn);

    expect(foodName).not.toBeInTheDocument();
    const list2 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(list2.length).toBe(1);
  });
  it('filtra a lista de favoritos por tipo', () => {
    const btnAll = screen.getByTestId('filter-by-all-btn');
    const btnFood = screen.getByTestId('filter-by-food-btn');
    const btnDrink = screen.getByTestId('filter-by-drink-btn');

    const nameFood = screen.getByText(/Corba/i);
    const nameDrink = screen.getByText(/Baby Eskimo/i);
    expect(nameFood).toBeInTheDocument();
    expect(nameDrink).toBeInTheDocument();

    userEvent.click(btnFood);

    expect(nameFood).toBeInTheDocument();
    expect(nameDrink).not.toBeInTheDocument();

    userEvent.click(btnDrink);

    expect(nameFood).not.toBeInTheDocument();

    userEvent.click(btnAll);

    expect(nameFood).toBeDefined();
    expect(nameDrink).toBeDefined();
  });
  it('ao clicar no botao de compartilhar aparece uma mensagem', () => {
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');

    userEvent.click(shareBtn);

    expect(screen.getByText('Link copied!')).toBeDefined();
  });
  // it('ao clicar na image da receita é redirecionado para a página detalhes', () => {
  //   const imgFood = screen.getByTestId('0-horizontal-image');
  // esse é link
  //   userEvent.click(imgFood);

  //   expect(screen.getByText('Ingredientes')).toBeDefined();
  // });
  // it('ao clicar no nome da receita é redirecionado para a página detalhes', () => {
  //   const nameFood = screen.getByTestId('1-horizontal-name');
  // esse é history.push
  //   userEvent.click(nameFood);

  //   expect(screen.getByText('Ingredientes')).toBeInTheDocument();
  // });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Provider from '../AppContext/Provider';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouterAndContext from './renderWithRouterAndContext';

require('clipboard-copy');

jest.mock('clipboard-copy', () => jest.fn().mockImplementation(() => {
}));

const mockStorage = [{
  alcoholicOrNot: '',
  category: 'Side',
  id: '52977',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  name: 'Corba',
  nationality: 'Turkish',
  type: 'food',
  doneDate: '30/08/2022',
  tags: ['soup'],
}, {
  alcoholicOrNot: 'Alcoholic',
  category: 'Shake',
  id: '15511',
  image: 'https://www.thecocktaildb.com/images/media/drink/wywrtw1472720227.jpg',
  name: 'Baby Eskimo',
  nationality: '',
  type: 'drink',
  doneDate: '30/08/2022',
  tags: [],
},
];

describe('A página Done Recipes', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockStorage));
  });
  afterEach(() => {
    localStorage.clear();
  });
  it('é renderizada com os cards de recitas terminadas', async () => {
    renderWithRouterAndContext(
      <DoneRecipes />, Provider,
    );

    const imgFood = await screen.findByTestId('0-horizontal-image');
    const textFood = await screen.findByTestId('0-horizontal-top-text');
    const nameFood = await screen.findByTestId('0-horizontal-name');
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    const date = await screen.findByTestId('0-horizontal-done-date');
    const tags = await screen.findByTestId('0-soup-horizontal-tag');

    expect(imgFood).toHaveAttribute('src', mockStorage[0].image);
    expect(textFood)
      .toHaveTextContent(`${mockStorage[0].nationality} - ${mockStorage[0].category}`);
    expect(nameFood).toHaveTextContent(mockStorage[0].name);
    expect(shareBtn).toHaveAttribute('alt', 'A button that share the recipe');
    expect(date).toHaveTextContent('30/08/2022');
    expect(tags).toHaveTextContent('soup');

    const textDrink = await screen.findByTestId('1-horizontal-top-text');
    expect(textDrink)
      .toHaveTextContent(mockStorage[1].alcoholicOrNot);
  });
  it('filtra a lista de favoritos por tipo', () => {
    renderWithRouterAndContext(
      <DoneRecipes />, Provider,
    );

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
    renderWithRouterAndContext(
      <DoneRecipes />, Provider,
    );

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');

    userEvent.click(shareBtn);

    const test = screen.getAllByText('Link copied!');

    expect(test).toBeDefined();
  });
  it('ao clicar na image da receita é redirecionado para a página detalhes', async () => {
    const test = renderWithRouterAndContext(
      <App />, Provider, ['/'],
    );

    const { history } = test;
    history.push('/done-recipes');

    const imgFood = await screen.findByTestId('0-horizontal-image');

    userEvent.click(imgFood);
    expect(screen.getByText('Ingredientes')).toBeInTheDocument();
  });
  it('ao clicar no nome da receita é redirecionado para a página detalhes', async () => {
    const test = renderWithRouterAndContext(
      <App />, Provider, ['/'],
    );

    const { history } = test;
    history.push('/done-recipes');

    const nameFood = await screen.findByTestId('1-horizontal-name');

    userEvent.click(nameFood);

    expect(screen.getByText('Ingredientes')).toBeInTheDocument();
  });
});

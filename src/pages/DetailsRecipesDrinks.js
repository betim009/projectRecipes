import React, { useContext, useEffect } from 'react';
import AppContext from '../AppContext/AppContext';
import RecCard from '../components/RecCard';

export default function DetailsRecipesDrinks() {
  const { setId, data, setData, ingredientList, setIngedientList,
    measureList, setMeasureList } = useContext(AppContext);

  const drinksIdAPI = async (drinkId) => {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
    const response = await request.json();
    setData(...response.drinks);
    const info = response.drinks[0];

    const ingredient = Object.entries(info).filter((e) => e[0].includes('strIngredient'));
    const ingListFilter = ingredient.map((e) => e.slice(1))
      .filter((it) => it[0] !== '' && it[0] !== null);
    setIngedientList(ingListFilter);

    const measure = Object.entries(info).filter((e) => e[0].includes('strMeasure'));
    const meListFilter = measure.map((e) => e.slice(1))
      .filter((it) => it[0] !== '' && it[0] !== null);
    setMeasureList(meListFilter);
  };

  useEffect(() => {
    const { pathname } = window.location;
    const strings = pathname.split('/');
    setId(strings[2]);
    drinksIdAPI(strings[2]);
  }, []);

  return (
    <div>
      <img
        src={ data.strDrinkThumb }
        alt={ data.strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ data.strDrink }</h1>
      <h3 data-testid="recipe-category">
        Categoria:
        {''}
        { data.strCategory }
        {''}
        {'-'}
        {''}
        { data.strAlcoholic }
      </h3>
      <div>
        <h3>
          Ingredientes
        </h3>
        <ol>
          {ingredientList.map((item, index) => (
            <li key={ item } data-testid={ `${index}-ingredient-name-and-measure` }>
              {item}
              {' '}
              -
              {' '}
              {measureList[index]}
            </li>
          ))}
        </ol>
      </div>
      <p data-testid="instructions">{ data.strInstructions }</p>
      <div>
        <h3>
          Recomendações
        </h3>
        <RecCard index="0" type="foods" />
        <RecCard index="1" type="foods" />
        <RecCard index="2" type="foods" />
        <RecCard index="3" type="foods" />
        <RecCard index="4" type="foods" />
        <RecCard index="5" type="foods" />
      </div>
    </div>
  );
}

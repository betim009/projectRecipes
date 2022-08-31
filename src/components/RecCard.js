import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import '../style/image.css';

function RecCard({ index, type }) {
  const [recomendationDrink, setRecomendationDrink] = useState({});
  const [recomendationFood, setRecomendationFood] = useState({});

  async function recFoodsAPI() {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const response = await request.json();
    const info = response.meals;
    setRecomendationFood(info[index]);
  }

  async function recDrinksAPI() {
    const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const response = await request.json();
    const info2 = response.drinks;
    setRecomendationDrink(info2[index]);
  }

  useEffect(() => {
    recDrinksAPI();
    recFoodsAPI();
  }, []);

  return (
    <div className="col-6 border text-center">
      {type === 'foods'
        ? (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            <img
              className="img-carrosel"
              src={ recomendationFood.strMealThumb }
              alt={ recomendationFood.strMeal }
            />
            <p>{recomendationFood.strCategory}</p>
            <h5 data-testid={ `${index}-recomendation-title` }>
              {recomendationFood.strMeal}
            </h5>
          </div>
        )
        : (
          <div data-testid={ `${index}-recomendation-card` } key={ index }>
            <img
              className="img-carrosel"
              src={ recomendationDrink.strDrinkThumb }
              alt={ recomendationDrink.strDrink }
            />
            <p>{recomendationDrink.strCategory}</p>
            <h5 data-testid={ `${index}-recomendation-title` }>
              {recomendationDrink.strDrink}
            </h5>
          </div>
        )}
    </div>
  );
}

export default RecCard;

RecCard.propTypes = {
  index: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

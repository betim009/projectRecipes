export default function Recipe() {
  const { infos } = props;
  return (
    <div>
      <h1 data-testid="recipe-title">{infos.strDrink}</h1>
      <img
        src={ infos.strDrinkThumb }
        alt="foto-Food"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-category">{infos.strCategory}</p>
      <FavoriteButton />
      <ShareButton pathname={ pathname } />
      <div>
        <h3>
          Ingredientes
        </h3>
        <ol>
          {ingredientList.map((item, index) => (
            <label key={ item } htmlFor="checkbox">
              <input name="checkbox" type="checkbox" />
              <li data-testid={ `${index}-ingredient-step` }>
                {`${item} - ${measureList[index]}`}
              </li>
            </label>
          ))}
        </ol>
      </div>
      <p data-testid="instructions">{infos.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">
        Finalizar Receita
      </button>
    </div>
  );
}

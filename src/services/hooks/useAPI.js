import { useContext } from 'react';
import AppContext from '../../AppContext/AppContext';

export default function useAPI(url) {
  const { setIngedientList, setMeasureList } = useContext(AppContext);

  const get = async (drinkOrFood) => {
    const result = {
      infos: [],
      ingredients: [],
      measures: [],
    };

    const request = await fetch(url);
    const response = await request.json();
    const infos = response[drinkOrFood][0];

    const filtra = (searchable) => (e) => e[0].includes(searchable);
    const ingredient = Object.entries(infos).filter(filtra('strIngredient'));
    result.ingredients = ingredient.map((e) => e.slice(1))
      .filter((it) => it[0] !== '' && it[0] !== null);

    const measure = Object.entries(infos).filter(filtra('strMeasure'));
    result.measures = measure.map((e) => e.slice(1))
      .filter((it) => it[0] !== '' && it[0] !== null);

    result.infos = infos;
    setIngedientList(result.ingredients);
    setMeasureList(result.measures);
    return result;
  };
  return { get };
}

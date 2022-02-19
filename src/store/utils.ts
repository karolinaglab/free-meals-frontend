import { IngredientMeasure } from "@/entities/ingredient_measure";
import { Meal } from "@/entities/meal";
import { SearchMealApiResponse } from "@/entities/search_meals_response";

export function convertMealResponseToMealObject(
  meal: SearchMealApiResponse
): Meal {
  const ingredientsNames: string[] = [];
  const ingredientsMeasures: string[] = [];
  for (const key in meal) {
    if (key.includes("strIngredient") && meal[key]) {
      ingredientsNames.push(meal[key] as string);
    }
    if (key.includes("strMeasure") && meal[key]) {
      ingredientsMeasures.push(meal[key] as string);
    }
  }

  const mealIngredients: IngredientMeasure[] = ingredientsNames.map(
    (ingredient, index) => {
      return {
        name: ingredient,
        measure: ingredientsMeasures[index],
      };
    }
  );
  return {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
    strDrinkAlternate: meal.strDrinkAlternate,
    strCategory: meal.strCategory,
    strArea: meal.strArea,
    strInstructions: meal.strInstructions,
    strTags: meal.strTags,
    strYoutube: meal.strYoutube,
    strSource: meal.strSource,
    strImageSource: meal.strImageSource,
    strCreativeCommonsConfirmed: meal.strCreativeCommonsConfirmed,
    dateModified: meal.dateModified,
    ingredients: mealIngredients,
  };
}

import { IngredientMeasure } from "@/entities/ingredient_measure";
import { Meal } from "@/entities/meal";
import { SearchMealApiResponse } from "@/entities/search_meals_response";
import MealService from "@/services/meal_service";
import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

@Module({ namespaced: true })
class MealModule extends VuexModule {
  public meals: Meal[] = [];
  public meal: Meal | null = null;

  // getters
  get getMeal(): Meal | null {
    return this.meal;
  }

  get getMeals(): Meal[] {
    return this.meals;
  }

  // mutations
  @Mutation
  public setMeals(meals: SearchMealApiResponse[]): void {
    const convertedMeals: Meal[] = meals.map((meal) => {
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
    });
    this.meals = convertedMeals;
  }

  @Mutation
  public setMeal(meal: SearchMealApiResponse): void {
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
    this.meal = {
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

  // actions
  @Action({ rawError: true })
  public async fetchAllByFirstLetter(mealFirstLetter: string): Promise<void> {
    try {
      const response = await MealService.searchAllByFirstLetter(
        mealFirstLetter
      );
      const meals = response.data.meals;
      this.context.commit("setMeals", meals);
    } catch (error) {
      console.error(error);
    }
  }

  @Action({ rawError: true })
  public async fetchMealsByName(name: string): Promise<void> {
    try {
      const response = await MealService.searchMealsByName(name);
      const meals = response.data.meals;
      this.context.commit("setMeals", meals);
    } catch (error) {
      console.error(error);
    }
  }

  @Action({ rawError: true })
  public async fetchMealByID(id: string): Promise<void> {
    try {
      const response = await MealService.searchMealByID(id);
      const meal = response.data.meals[0];
      this.context.commit("setMeal", meal);
    } catch (error) {
      console.error(error);
    }
  }
}

export default MealModule;

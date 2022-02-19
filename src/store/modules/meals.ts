import { Meal } from "@/entities/meal";
import { SearchMealApiResponse } from "@/entities/search_meals_response";
import MealService from "@/services/meal_service";
import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { convertMealResponseToMealObject } from "../utils";

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
      return convertMealResponseToMealObject(meal);
    });
    this.meals = convertedMeals;
  }

  @Mutation
  public setMeal(meal: SearchMealApiResponse): void {
    this.meal = convertMealResponseToMealObject(meal);
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

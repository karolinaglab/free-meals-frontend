import { Meal } from "@/entities/meal";
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
  public setMeals(meals: Meal[]): void {
    this.meals = meals;
  }

  @Mutation
  public setMeal(meal: Meal): void {
    this.meal = meal;
  }

  // actions
  @Action({ rawError: true })
  public async fetchAllByFirstLetter(mealFirstLetter: string): Promise<void> {
    try {
      const response = await MealService.searchAllByFirstLetter(
        mealFirstLetter
      );
      const meals = response.data;
      this.context.commit("setMeals", meals);
    } catch (error) {
      console.error(error);
    }
  }

  @Action({ rawError: true })
  public async fetchMealByName(name: string): Promise<void> {
    try {
      const response = await MealService.searchMealByName(name);
      const meal = response.data;
      this.context.commit("setMeals", meal);
    } catch (error) {
      console.error(error);
    }
  }
}

export default MealModule;

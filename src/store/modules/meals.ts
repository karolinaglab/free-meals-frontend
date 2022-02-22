import { Meal } from "@/entities/MealDetails";
import { SearchMealApiResponse } from "@/entities/SearchMealResponse";
import MealService from "@/services/MealService";
import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { convertMealResponseToMealObject } from "../utils";

@Module({ namespaced: true })
class MealModule extends VuexModule {
  public meals: Meal[] = [];
  public favouriteMeals: Meal[] = localStorage.getItem("favourites")
    ? JSON.parse(localStorage.getItem("favourites") as string)
    : [];
  public meal: Meal | null = null;

  // getters
  get getMeal(): Meal | null {
    return this.meal;
  }

  get getMeals(): Meal[] {
    return this.meals;
  }

  get getFavouriteMeals(): Meal[] {
    return this.favouriteMeals;
  }

  // mutations
  @Mutation
  public setMeals(meals: SearchMealApiResponse[]): void {
    if (meals) {
      const convertedMeals: Meal[] = meals.map((meal) => {
        return convertMealResponseToMealObject(meal);
      });
      this.meals = convertedMeals;
    } else {
      this.meals = [];
    }
  }

  @Mutation
  public setMeal(meal: SearchMealApiResponse): void {
    this.meal = convertMealResponseToMealObject(meal);
  }

  @Mutation
  public addMealToFavourites(meal: Meal): void {
    this.favouriteMeals.push(meal);
    localStorage.setItem("favourites", JSON.stringify(this.favouriteMeals));
  }

  @Mutation
  public removeFromFavourites(meal: Meal): void {
    this.favouriteMeals = this.favouriteMeals.filter(
      (favMeal) => favMeal.idMeal !== meal.idMeal
    );
    localStorage.setItem("favourites", JSON.stringify(this.favouriteMeals));
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

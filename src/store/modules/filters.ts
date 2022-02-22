import { Meal } from "@/entities/MealDetails";
import { VuexModule, Module, Mutation } from "vuex-module-decorators";

@Module({ namespaced: true })
class FiltersModule extends VuexModule {
  public categories: string[] = [];
  public tags: string[] = [];
  public areas: string[] = [];

  get getCategories(): string[] {
    return this.categories;
  }

  get getTags(): string[] {
    return this.tags;
  }

  get getAreas(): string[] {
    return this.areas;
  }

  @Mutation
  public setFilters(meals: Meal[]): void {
    const newCategories: string[] = [];
    const newTags: string[] = [];
    const newAreas: string[] = [];
    meals.forEach((meal) => {
      if (meal.strCategory) {
        newCategories.push(...meal.strCategory.split(","));
      }
      if (meal.strTags) {
        newTags.push(...meal.strTags.split(","));
      }
      if (meal.strArea) {
        newAreas.push(...meal.strArea.split(","));
      }
    });
    const categoriesSet = new Set(newCategories);
    const tagsSet = new Set(newTags);
    const areasSet = new Set(newAreas);
    this.categories = [...categoriesSet];
    this.tags = [...tagsSet];
    this.areas = [...areasSet];
  }
}

export default FiltersModule;

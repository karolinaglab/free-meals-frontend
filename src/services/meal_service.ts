import axios from "axios";
import { API_URL } from "@/utils/config";
import { SearchMealApiResponse } from "@/entities/search_meals_response";

class MealService {
  searchMealsByName(mealName: string) {
    return axios.get<{ meals: SearchMealApiResponse[] }>(
      `${API_URL}/search.php`,
      {
        params: {
          s: mealName,
        },
      }
    );
  }

  searchMealByID(mealID: string) {
    return axios.get<{ meals: SearchMealApiResponse[] }>(
      `${API_URL}/lookup.php`,
      {
        params: {
          i: mealID,
        },
      }
    );
  }

  searchAllByFirstLetter(mealFirstLetter: string) {
    return axios.get<{ meals: SearchMealApiResponse[] }>(
      `${API_URL}/search.php`,
      {
        params: {
          f: mealFirstLetter,
        },
      }
    );
  }

  getRandomMeal() {
    return axios.get<{ meals: SearchMealApiResponse[] }>(
      `${API_URL}/random.php`
    );
  }

  filterMealsByIngredient(ingredient: string) {
    return axios.get<{ meals: SearchMealApiResponse[] }>(`${API_URL}/filter.php`, {
      params: {
        i: ingredient,
      },
    });
  }
  filterMealsByCategory(category: string) {
    return axios.get<{ meals: SearchMealApiResponse[] }>(`${API_URL}/filter.php`, {
      params: {
        c: category,
      },
    });
  }

  filterMealsByArea(area: string) {
    return axios.get<{ meals: SearchMealApiResponse[] }>(`${API_URL}/filter.php`, {
      params: {
        a: area,
      },
    });
  }

  getAllMealCategories() {
    return axios.get(`${API_URL}/categories.php`);
  }

  getAllCategories() {
    return axios.get(`${API_URL}/list.php`, {
      params: {
        c: "list",
      },
    });
  }

  getAllIngredients() {
    return axios.get(`${API_URL}/list.php`, {
      params: {
        i: "list",
      },
    });
  }

  getAllAreas() {
    return axios.get(`${API_URL}/list.php`, {
      params: {
        a: "list",
      },
    });
  }
}

export default new MealService();

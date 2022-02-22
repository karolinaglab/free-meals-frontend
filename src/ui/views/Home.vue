<template>
  <div class="main-container">
    <div class="cards-container">
      <meal-details-card v-if="chosenMealID" :meal="getMeal" />
      <meal-card
        class="cards-item"
        v-for="meal in getMeals"
        :key="meal.idMeal"
        :meal="meal"
        @click="getMealDetails(meal.idMeal)"
        v-bind:class="{
          'cards-item--notactive': chosenMealID && meal.idMeal !== chosenMealID,
        }"
      ></meal-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Meal } from "@/entities/MealDetails";
import MealCard from "@/ui/components/meals-view/MealCard.vue";
import MealDetailsCard from "@/ui/components/meals-view/MealDetailsCard.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const meals = namespace("meals");
const filters = namespace("filters");

@Component({
  components: { MealCard, MealDetailsCard },
})
export default class Home extends Vue {
  private chosenMealID = "";

  @meals.Action
  public fetchAllByFirstLetter!: (mealFirstLetter: string) => Promise<void>;

  @meals.Action
  public fetchMealsByName!: (mealName?: string) => Promise<void>;

  @meals.Action
  public fetchMealByID!: (mealID: string) => Promise<void>;

  @meals.Getter
  public getMeals!: Meal[];

  @meals.Getter
  public getMeal!: Meal | null;

  @filters.Mutation
  public setFilters!: (meals: Meal[]) => void;

  public getMealDetails(mealID: string): void {
    if (this.chosenMealID === mealID) {
      this.chosenMealID = "";
    } else {
      this.fetchMealByID(mealID);
      this.chosenMealID = mealID;
    }
  }

  @Watch("getMeals")
  mealsUpdated(): void {
    if (this.getMeals) {
      this.setFilters(this.getMeals);
    }
  }

  created(): void {
    this.fetchMealsByName();
  }
}
</script>

<style lang="scss" scoped>
.cards-container {
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
}

.cards-item--notactive {
  opacity: 50%;
}
</style>

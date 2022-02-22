<template>
  <div class="card" @click="$emit('click')">
    <img class="card-img" :src="meal.strMealThumb" :alt="meal.strMeal" />
    <div class="fav-wrapper">
      <button
        @click="addOrRemoveFromFavourites"
        @mouseover="changeIconToFilled"
        @mouseout="changeIconToEmpty"
        class="fav-button"
      >
        <b-icon
          v-if="iconFilled"
          icon="suit-heart-fill"
          aria-hidden="true"
          class="fav-icon"
          font-scale="2"
        >
        </b-icon>
        <b-icon
          v-else
          icon="suit-heart"
          aria-hidden="true"
          class="fav-icon"
          font-scale="2"
        >
        </b-icon>
      </button>
    </div>
    <p class="card-title">{{ meal.strMeal }}</p>
  </div>
</template>

<script lang="ts">
import { Meal } from "@/entities/MealDetails";
import { Component, Vue, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
const meals = namespace("meals");

@Component({
  components: {},
})
export default class MealCard extends Vue {
  @Prop({ required: true }) readonly meal!: Meal;

  private iconFilled = false;
  private isFavourite = false;

  @meals.Mutation
  addMealToFavourites!: (meal: Meal) => void;

  @meals.Mutation
  removeFromFavourites!: (meal: Meal) => void;

  @meals.Getter
  public getFavouriteMeals!: Meal[];

  public addOrRemoveFromFavourites(event: Event): void {
    event.stopPropagation();
    if (this.isFavourite) {
      this.removeFromFavourites(this.meal);
      this.isFavourite = false;
      this.iconFilled = false;
    } else {
      this.addMealToFavourites(this.meal);
      this.isFavourite = true;
      this.iconFilled = true;
    }
  }

  public changeIconToFilled(): void {
    this.iconFilled = true;
  }

  public changeIconToEmpty(): void {
    if (!this.isFavourite) {
      this.iconFilled = false;
    }
  }

  created(): void {
    if (
      this.getFavouriteMeals &&
      this.getFavouriteMeals.filter((meal) => meal.idMeal === this.meal.idMeal)
        .length > 0
    ) {
      this.isFavourite = true;
      this.iconFilled = true;
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 270px;
  transition: transform 0.2s;
  position: relative;
  font-size: 14px;

  &:hover {
    transform: scale(1.04);
    cursor: pointer;
  }

  .card-img {
    border-radius: 5px 5px 0 0;
    width: 100%;
    height: 200px;
  }

  .card-title {
    letter-spacing: 2px;
    margin-top: 5px;
    padding-bottom: 5px;
  }

  .fav-wrapper {
    position: absolute;
    bottom: 20%;
    right: 7%;

    .fav-button {
      border: none;
      background-color: transparent;
    }

    .fav-icon {
      color: #ffffff;
    }
  }
}
</style>

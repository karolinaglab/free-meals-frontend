<template>
  <div class="fav-wrapper" v-b-hover="handleShowFavourites">
    <button class="fav-button">
      <b-icon
        icon="suit-heart-fill"
        aria-hidden="true"
        class="fav-icon"
        font-scale="2"
      >
      </b-icon>
    </button>
    <ul class="fav-list" v-if="showFavourites">
      <p>Favourites</p>
      <li
        class="fav-item"
        v-for="meal in getFavouriteMeals"
        :key="meal.idMeal"
        @click="test(meal.strMeal)"
      >
        <img class="fav-img" :src="meal.strMealThumb" alt="fav" />
        {{ meal.strMeal }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Meal } from "@/entities/MealDetails";
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const meals = namespace("meals");

@Component({
  components: {},
})
export default class FavouritesList extends Vue {
  private showFavourites = false;

  @meals.Getter
  public getFavouriteMeals!: Meal[];

  @meals.Action
  public fetchMealsByName!: (mealName?: string) => Promise<void>;

  public handleShowFavourites(isHovered: boolean): void {
    if (isHovered) {
      this.showFavourites = true;
    } else {
      this.showFavourites = false;
    }
  }

  public test(mealName: string): void {
    this.fetchMealsByName(mealName);
  }
}
</script>
<style lang="scss" scoped>
.fav-wrapper {
  position: relative;
}

.fav-button {
  background-color: transparent;
  border: none;

  .fav-icon {
    color: #ffffff;
  }
}

.fav-list {
  width: 300px;
  height: 300px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  right: 3px;
  top: 0px;
  border-radius: 10px;
  text-transform: uppercase;
  list-style: none;
  text-align: left;
  padding-top: 10px;
  overflow: auto;

  .fav-item {
    padding-right: 30px;
    font-size: 12px;
    margin-bottom: 10px;
    cursor: pointer;

    &:hover {
      opacity: 60%;
    }
  }

  .fav-img {
    width: 40px;
    border-radius: 10px;
  }
}
</style>

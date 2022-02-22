<template>
  <div class="navbar">
    <input
      class="navbar-input"
      type="text"
      placeholder="Search..."
      @keyup="searchMeals"
      v-model="mealName"
    />
    <favourites-list />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FavouritesList from "@/ui/components/navbar/FavouritesList.vue";
import { namespace } from "vuex-class";
const meals = namespace("meals");

@Component({
  components: { FavouritesList },
})
export default class NavBar extends Vue {
  private mealName = "";

  @meals.Action
  public fetchMealsByName!: (mealName?: string) => Promise<void>;

  // type doesn't matter here, so it's set to 'any'
  private searchRequestDelay: any;

  public searchMeals(): void {
    if (this.searchRequestDelay) {
      clearTimeout(this.searchRequestDelay);
    }
    // it waits some time so user can finish typing before request is send
    this.searchRequestDelay = setTimeout(() => {
      if (this.mealName === "") {
        this.fetchMealsByName();
      } else {
        this.fetchMealsByName(this.mealName);
      }
    }, 500);
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 60px;
  width: 100%;
  background-color: #ffd480;
  position: fixed;
  top: 0;
  z-index: 1;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.75);

  .navbar-input {
    background-color: transparent;
    margin: 0 auto;
    width: 30%;
    text-transform: uppercase;
    border: 1px solid;
    border-radius: 5px;
    border-color: #b1b1b4;
    padding: 0.3rem 1.5rem;

    &:hover {
      border: solid 2px;
      border-color: #b1b1b4;
    }

    &:focus {
      outline: 0;
      border: solid 2px;
      border-color: #b1b1b4;
    }
  }
}
</style>

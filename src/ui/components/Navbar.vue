<template>
  <div>
    <input
      type="text"
      placeholder="Search.."
      @keyup="searchMeals"
      v-model="mealName"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const meals = namespace("meals");

@Component({
  components: {},
})
export default class Navbar extends Vue {
  private mealName = "";

  @meals.Action
  public fetchMealsByName!: (mealName: string) => Promise<void>;

  public searchMeals(): void {
    if (this.mealName === "") {
      this.fetchMealsByName("Soup");
    } else {
      this.fetchMealsByName(this.mealName);
    }
  }
}
</script>
<style lang="scss" scoped></style>

<template>
  <div></div>
</template>

<script lang="ts">
import { Meal } from "@/entities/meal";
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const meals = namespace("meals");

@Component({
  components: {},
})
export default class Home extends Vue {
  @meals.Action
  public fetchAllByFirstLetter!: (mealFirstLetter: string) => Promise<void>;

  @meals.Getter
  public getMeals!: Meal | null;

  created(): void {
    this.fetchAllByFirstLetter('a');
  }
}
</script>

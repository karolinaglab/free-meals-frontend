<template>
  <div class="detailed-card">
    <iframe
      v-if="convertedYoutubeLink"
      width="400"
      height="300"
      :src="convertedYoutubeLink"
    >
    </iframe>
    <article v-if="meal">
      <h1>Instructions</h1>
      <p class="card-text">{{ meal.strInstructions }}</p>
      <h1>Ingredients + Measure</h1>
      <p v-for="(ingredient, index) in meal.ingredients" :key="index">
        {{ ingredient.name }} - {{ ingredient.measure }}
      </p>
    </article>
  </div>
</template>

<script lang="ts">
import { Meal } from "@/entities/meal";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class MealDetailsCard extends Vue {
  @Prop({ required: true }) readonly meal!: Meal;

  private convertedYoutubeLink = "";

  @Watch("meal")
  mealUpdated(): void {
    if (this.meal && this.meal.strYoutube) {
      this.convertedYoutubeLink = this.meal.strYoutube?.replace(
        "watch?v=",
        "embed/"
      );
    }
  }

  created(): void {
    if (this.meal && this.meal.strYoutube) {
      this.convertedYoutubeLink = this.meal.strYoutube?.replace(
        "watch?v=",
        "embed/"
      );
    }
  }
}
</script>
<style lang="scss" scoped>
.detailed-card {
  display: flex;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 100%;

  article {
    margin-left: 30px;
    text-align: left;
    max-height: 300px;
    overflow: auto;
  }
}

.card-text {
  margin-right: 30px;
}
</style>

<template>
  <div class="card" @click="$emit('click')">
    <img :src="meal.strMealThumb" :alt="meal.strMeal" />
    <p class="card-title">{{ meal.strMeal }}</p>
  </div>
</template>

<script lang="ts">
import { Meal } from "@/entities/meal";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class MealCard extends Vue {
  @Prop({ required: true }) readonly meal!: Meal;

  public test(): void {
      console.log('elo')
  }
 }
</script>
<style lang="scss" scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 250px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.04);
    cursor: pointer;
  }

  img {
    border-radius: 5px 5px 0 0;
    width: 100%;
    height: 200px;
  }

  p {
    letter-spacing: 2px;
    margin-top: 5px;
    padding-bottom: 5px;
  }
}
</style>

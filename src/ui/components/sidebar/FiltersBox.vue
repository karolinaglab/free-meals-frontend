<template>
  <div>
    <div v-if="filters" class="filters-wrapper">
      <p class="filters-item" v-for="(filter, index) in filters" :key="index">
        <span @click="removeFilter" class="filters-remove">X</span> {{ filter }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class FavouritesList extends Vue {
  @Prop({ required: true }) readonly filters!: string[];

  public removeFilter(): void {
    // TODO: handle removing filter
  }
}
</script>
<style lang="scss" scoped>
.filters-wrapper {
  display: flex;
  flex-flow: wrap;
  gap: 5px;
  border: 1px solid;
  border-radius: 10px;
  padding: 10px 10px;
  width: 250px;
  margin: 0 auto;
  text-transform: uppercase;
  font-size: 13px;
  margin-bottom: 30px;

  .filters-item {
    background-color: #ffffff;
    padding: 5px 5px;
    border-radius: 10px;
  }

  .filters-remove {
    font-weight: 800;
    cursor: pointer;
    &:hover {
        opacity: 50%;
    }
  }
}
</style>

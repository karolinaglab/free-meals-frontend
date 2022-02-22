<template>
  <div class="sidebar">
    <h1>Category</h1>
    <filters-box :filters="getAreas" />
    <h1>Area</h1>
    <filters-box :filters="getCategories" />
    <h1>Tags</h1>
    <filters-box :filters="getTags" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FiltersBox from "@/ui/components/sidebar/FiltersBox.vue";
import { namespace } from "vuex-class";
const filters = namespace("filters");

@Component({
  components: { FiltersBox },
})
export default class SideBar extends Vue {
  @filters.Getter
  public getCategories!: string[];

  @filters.Getter
  public getTags!: string[];

  @filters.Getter
  public getAreas!: string[];
}
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: #b1b1b4;
  height: 100%;
  width: 300px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  // z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 80px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.75);

  .filter-list {
    list-style-type: none;
    color: #ffffff;
    /* margin-top: 70px; */
    font-size: 17px;
    text-align: left;
    text-decoration: none;

    .filter-item {
      text-transform: uppercase;
      font-weight: 500;
      padding-bottom: 10px;
      color: #ffffff;
    }
  }
}

@media only screen and (max-width: 991px) {
  .sidebar {
    display: none;
    padding-top: 15px;
  }
}
</style>

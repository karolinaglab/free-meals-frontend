<template>
  <div class="sidebar">
    <ul class="filter-list">
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class SideBar extends Vue {}
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
  padding-top: 15px;
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

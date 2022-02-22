import Vue from "vue";
import Vuex from "vuex";
import MealModule from "./modules/meals";
import FiltersModule from "./modules/filters";

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    meals: MealModule,
    filters: FiltersModule
  },
});

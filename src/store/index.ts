import Vue from "vue";
import Vuex from "vuex";
import MealModule from "./modules/meals";

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
  },
});

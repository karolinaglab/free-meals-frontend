module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/ui/styles/_variables.scss";
          `,
      },
    },
  },
};

const collections = require('./src/11ty/collections');
const filters = require('./src/11ty/filters');
const duration = require('./src/11ty/shortcodes/duration').duration;
const trackImage = require('./src/11ty/shortcodes/trackImage').trackImage;
const icon = require('./src/11ty/shortcodes/icon').icon;
const movieTitle = require('./src/11ty/shortcodes/movieTitle').movieTitle;
const sass = require("eleventy-plugin-sass");
const babel = require('eleventy-plugin-babel');

const prod = process.env.ELEVENTY_ENV === 'prod';

module.exports = function (eleventyConfig) {
  // Collections
  for (collection in collections) {
    eleventyConfig.addCollection(collection, collections[collection]);
  }

  // Filters
  for (filter in filters) {
    eleventyConfig.addFilter(filter, filters[filter]);
  }

  // Shortcodes
  eleventyConfig.addLiquidShortcode('duration', duration);
  eleventyConfig.addLiquidShortcode('trackImage', trackImage);
  eleventyConfig.addLiquidShortcode('icon', icon);
  eleventyConfig.addLiquidShortcode('movieTitle', movieTitle);

  // SASS
  eleventyConfig.addPlugin(sass, {
    watch: 'src/styles/**/*.scss',
    outputDir: '_site/css',
    cleanCSS: prod,
    sourcemaps: !prod,
  });

  // JS
  // eleventyConfig.addPlugin(babel, {
  //   watch: 'src/js/*.js',
  //   outputDir: '_site/js',
  //   uglify: prod,
  // });

  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");

  return {
    dir: {
      input: 'src'
    },
  };
};

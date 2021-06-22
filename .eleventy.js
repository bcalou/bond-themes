const collections = require('./src/11ty/collections');
const filters = require('./src/11ty/filters');
const duration = require('./src/11ty/shortcodes/duration').duration;

module.exports = function (eleventyConfig) {
  // Collections
  eleventyConfig.addCollection('movies', collections.movies);
  eleventyConfig.addCollection('tracks', collections.tracks);

  // Filters
  eleventyConfig.addFilter('byMovie', filters.byMovie);

  // Duration
  eleventyConfig.addLiquidShortcode('duration', duration);

  return {
    dir: {
      input: 'src',
    },
  };
};

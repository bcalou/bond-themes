module.exports = {
  movies: (collection) =>
    collection
      .getFilteredByGlob('src/movies/*.md')
      .sort((a, b) => a.data.year - b.data.year),

  tracks: (collection) => collection.getFilteredByGlob('src/tracks/*.md'),
};

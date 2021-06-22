module.exports = {
  movies: (collection) =>
    collection
      .getFilteredByGlob('src/movies/*.md')
      .sort((a, b) => a.data.year - b.data.year),

  tracks: (collection) =>
    collection.getFilteredByGlob('src/tracks/*.md').sort((a, b) => {
      if (a.data.track > b.data.track) return 1;
      if (a.data.track < b.data.track) return -1;
      return 0;
    }),
};

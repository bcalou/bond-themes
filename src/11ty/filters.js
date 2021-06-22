module.exports = {
  byMovie: (collection, movieId) =>
    collection.filter((item) => item.url.indexOf(movieId) > -1),
};

module.exports = {
  movies: (collection) =>
    collection
      .getFilteredByGlob('src/movies/*.md')
      .sort((a, b) => a.data.year - b.data.year),

  tracks: (collection) =>
    collection.getFilteredByGlob('src/tracks/*.md').sort((a, b) => {
      if (a.data.index > b.data.index) return 1;
      if (a.data.index < b.data.index) return -1;
      return 0;
    }),

  themes: (collection) => {
    const themes = [];

    collection.getFilteredByGlob('src/tracks/*.md').forEach(track => {
      if (track.data.themes) {
        const trackThemes = track.data.themes.split(', ');
        let currentThemeTitle;

        trackThemes.forEach(trackTheme => {
          const [title, partTitle, level] = trackTheme.split('|');

          // Find the theme in the existing array
          let theme = themes.find(theme => theme.data.page.fileSlug === title);
          
          // If it's not in the array yet, get the file and add it
          if (!theme) {
            theme = collection.getFilteredByGlob(`src/themes/${title}.md`)[0];
            theme._movies = [];
            theme._parts = [];
            theme._count = 0;
            themes.push(theme);
          }

          // When we get to a new theme, add it to the occurences count
          if (title !== currentThemeTitle) {
            theme._count++;
            currentThemeTitle = title;
          }

          // Add the movie to the theme meta data if not present yet
          if (!theme._movies.find(movie => movie === track.data.movie)) {
            theme._movies.push(track.data.movie);
          }

          // Add the theme part to the meta data if not present yet
          if (
            partTitle
            && !theme._parts.find(part => part.title === partTitle)
          ) {
            theme._parts.push({
              title: partTitle
            })
          }
        });
      }
    });

    return themes;
  }
}

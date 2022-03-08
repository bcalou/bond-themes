module.exports = {
  movieTitle: async (slug) => {
    return {
      'dr-no': 'Dr. No',
      'from-russia-with-love': 'From Russia With Love',
      'goldfinger': 'Goldfinger',
      'on-her-majestys-secret-service': 'On Her Majesty\'s secret service'
    }[slug]
  },
};

module.exports = {
  icon: async (icon, title) => {
    return `<svg>
      ${title ? ' <title>' + title + '</title>' : ''}
      <use xlink:href="#icon-${icon}"></use>
    </svg>`;
  },
};

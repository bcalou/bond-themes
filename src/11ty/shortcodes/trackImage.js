const Image = require('@11ty/eleventy-img');
const prod = process.env.ELEVENTY_ENV === 'prod';

module.exports = {
  trackImage: async (movie, index, title) => {
    const images = await Image(`src/assets/img/${movie}/${index}.png`, {
      widths: prod ? [350] : [null],
      formats: prod ? ['avif', 'webp', 'jpeg'] : ['jpeg'],
      outputDir: '_site/img',
    });

    const url = images.jpeg[0].url;
    const sources = Object.values(images)
      .map((imageFormat) => getSourceTag(imageFormat))
      .join('\n');

    return `<picture>
      ${sources}
      <img width="350px" src="${url}" alt="${title} scene" loading="lazy" decoding="async" />
    </picture>`;
  }
}

function getSourceTag(imageFormat) {
  const srcset = imageFormat
    .filter((format) => format.width <= 700)
    .map((entry) => entry.srcset)
    .join(', ');

  return `<source type="${imageFormat[0].sourceType}" srcset="${srcset}">`;
}

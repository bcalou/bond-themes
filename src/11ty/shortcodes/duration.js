module.exports = {
  /**
   * Get the duration between two timecodes
   *
   * Exemple 1 (seconds)
   * From: 00:00:00
   * To: 00:00:07
   * Result: 7s
   *
   * Exemple 2 (minutes and seconds)
   * From: 00:00:00
   * To: 00:03:07
   * Result: 3m 7s
   */
  duration: async (from, to) => {
    const [fromH, fromM, fromS] = from.split(':');
    const [toH, toM, toS] = to.split(':');

    const duration = (toH - fromH) * 3600 + (toM - fromM) * 60 + (toS - fromS);
    const seconds = duration % 60;
    let minutes;

    if (duration !== seconds) {
      minutes = (duration - seconds) / 60;
    }

    return (minutes ? `${minutes}m ` : '') + `${seconds}s`;
  },
};

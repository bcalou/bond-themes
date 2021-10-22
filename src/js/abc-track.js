let abcTemplate = document.createElement('template');

abcTemplate.innerHTML = `
  <article class="abcTrack">
    <div class="abcTrack__sheet"></div>
    <button>Play</button>
    <hr/>
  </article>
`;

class Abc extends HTMLElement {
  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(abcTemplate.content.cloneNode(true));

    this.synth = new ABCJS.synth.CreateSynth();
    this.$sheet = shadowRoot.querySelector('.abcTrack__sheet');
    
    this.$playButton = shadowRoot.querySelector('button');
    this.$playButton.addEventListener('click', this.play.bind(this));

    window.addEventListener('resize', this.render.bind(this));
  }
  
  static get observedAttributes() {
    return ['abc', 'swing'];
  }
  
  attributeChangedCallback(attr, old, val) {
    this[attr] = val || true;

    if (this.abc) {
      this.render();
    }
  }
  
  render() {
    this.rendering = ABCJS.renderAbc(this.$sheet, this.abc, {
      staffwidth: window.innerWidth - 50,
      wrap: {
        minSpacing: 1.8,
        maxSpacing: 2.7,
        preferredMeasuresPerLine: 4
      }
    });
  }

  play() {
    this.synth.init({
      audioContext: new AudioContext(),
      visualObj: this.rendering[0],
      options: {
        sequenceCallback: this.swing ? this.swingCallback : null
      }
    }).then(() => {
      this.synth.prime().then(() => {
        this.synth.start();
      }).catch(error => console.error(error));
    }).catch(error => console.error(error));
  }

  // Swingify the tracks
  swingCallback(tracks) {
    const swing = 0.05;
    const track = tracks[0];

    // We assume that the first note is an eighth note
    // (so multiply by 2 to get a quarter length)
    const quarterLength = (track[0].end - track[0].start) * 2

    // Return true if the given note should be affected by the swing
    function shouldBeSwung(track, index) {
      return track[index].end - track[index].start >= 0.1
      && (
        index <= 1 
        || (
          track[index - 1].end - track[index - 1].start >= 0.1
          && (
            track[index - 2].end - track[index - 2].start >= 0.1
            || track[index].start - track[index - 2].end > quarterLength
          )
        )
      )
    }

    // Apply the offsets
    function applyOffsets(track) {
      track.forEach(event => {
        if (event.endOffset) {
          event.end += swing;
        } else if (event.startOffset) {
          event.start += swing;
        }
      });
    }
    
    track.forEach((event, index) => {
      if (shouldBeSwung(track, index)) {
        // The first note and multiple of the quarter note length are on beat
        if (!index || quarterLength - (event.start % quarterLength) < 0.01) {
          event.endOffset = true; // This is the beat - Make it longer
        } else {
          event.startOffset = true; // This is the offbeat - Start it later
        }
      }
    });

    applyOffsets(track);
  }
}

customElements.define('abc-track', Abc);
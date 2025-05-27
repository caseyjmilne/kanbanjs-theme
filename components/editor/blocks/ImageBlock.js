class ImageBlock extends Component {

  constructor(state) {

    super();
    this.state = state;

    this.state.subscribe(() => this.requestUpdate());
  }

  render() {

    const div = document.createElement('div');
    div.className = 'canvas-block image-block';
    div.dataset.type = 'image';

    const img = document.createElement('img');
    img.src = this.state.src || 'https://picsum.photos/200/300';
    img.alt = 'Image Block';
    img.style.maxWidth = '100%';

    img.addEventListener('click', () => {
      const newSrc = prompt('Enter new image URL:', this.state.src);
      if (newSrc) {
        this.state.src = newSrc;
      }
    });

    div.appendChild(img);
    return div;

  }

  serialize() {
    return {
      type: 'image',
      src: this.state.src
    };
  }

  load(data) {
    if (typeof data.src === 'string') {
      this.state.src = data.src;
    }
  }

}

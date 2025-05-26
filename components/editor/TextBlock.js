class TextBlock extends Component {
  constructor(state) {
    super();
    this.state = state;

    this.state.subscribe(() => this.requestUpdate());
  }

  render() {
    const div = document.createElement('div');
    div.className = 'canvas-block text-block';
    div.contentEditable = true;
    div.textContent = this.state.value;
    div.dataset.type = 'text';

    div.addEventListener('input', () => {
      this.state.value = div.textContent;
    });

    return div;
  }

  serialize() {
    return {
      type: 'text',
      value: this.state.value
    };
  }

  load(data) {
    if (typeof data.value === 'string') {
      this.state.value = data.value;
    }
  }
}

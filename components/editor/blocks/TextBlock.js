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
    div.textContent = this.state.content;
    div.dataset.type = 'text';

    div.addEventListener('input', () => {
      this.state.content = div.textContent;
    });

    return div;
  }

  serialize() {
    return {
      type: 'text',
      content: this.state.content
    };
  }

  load(data) {

    console.log('data at load...')
    console.log(data)

    if (typeof data.content === 'string') {
      this.state.content = data.content;
    }
  }
}

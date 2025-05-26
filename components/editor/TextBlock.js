class TextBlock extends Component {

  constructor(state) {
    super();
    this.state = state;

    this.state.subscribe(() => this.requestUpdate());
  }

  render() {

    const div = document.createElement('div');
    div.textContent = this.state.value;
    div.contentEditable = true;

    div.addEventListener('input', () => {
      this.state.value = div.textContent;
    });

    return div;
    
  }

}

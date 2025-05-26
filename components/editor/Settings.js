class Settings {
  constructor() {
    console.log('Settings initialized...');
    this.panel = document.querySelector('.settings');
    this.selectedBlock = null;

    document.addEventListener('block:select', (e) => {
      this.selectedBlock = e.detail.block;
      this.render();
    });
  }

  render() {
    this.panel.innerHTML = ''; // Clear previous

    if (!this.selectedBlock) {
      this.panel.innerHTML = '<p>No block selected</p>';
      return;
    }

    const type = this.selectedBlock.dataset.type;

    switch (type) {
      case 'text':
        this.renderTextSettings();
        break;
      case 'image':
        this.renderImageSettings();
        break;
      case 'button':
        this.renderButtonSettings();
        break;
      default:
        this.panel.innerHTML = `<p>No settings for type: ${type}</p>`;
    }
  }

  renderTextSettings() {
    const input = document.createElement('textarea');
    input.value = this.selectedBlock.textContent;
    input.addEventListener('input', () => {
      this.selectedBlock.textContent = input.value;
    });
    this.panel.appendChild(this.labelWrap('Text Content', input));
  }

  renderImageSettings() {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = this.selectedBlock.querySelector('img')?.src || '';
    input.addEventListener('input', () => {
      const img = this.selectedBlock.querySelector('img');
      if (img) img.src = input.value;
    });
    this.panel.appendChild(this.labelWrap('Image URL', input));
  }

  renderButtonSettings() {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = this.selectedBlock.textContent.trim();
    input.addEventListener('input', () => {
      this.selectedBlock.textContent = input.value;
    });
    this.panel.appendChild(this.labelWrap('Button Label', input));
  }

  labelWrap(labelText, input) {
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '1rem';

    const label = document.createElement('label');
    label.textContent = labelText;
    label.style.display = 'block';
    label.style.marginBottom = '0.25rem';

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    return wrapper;
  }
}

window.Settings = Settings;
new Settings();

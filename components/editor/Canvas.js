class Canvas {

  blocks = []

  constructor() {
    console.log('Canvas initialized...');
    this.mount();
  }

  mount() {
    this.canvas = document.querySelector('.canvas');
    if (!this.canvas) {
      console.error('Canvas container not found');
      return;
    }

    // Setup drop listeners
    this.canvas.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.canvas.classList.add('canvas--dragover');
    });

    this.canvas.addEventListener('dragleave', () => {
      this.canvas.classList.remove('canvas--dragover');
    });

    this.canvas.addEventListener('drop', (e) => {
      e.preventDefault();
      this.canvas.classList.remove('canvas--dragover');
      const toolType = e.dataTransfer.getData('text/plain');
      this.addBlock(toolType);
    });
  }

  addBlock(type) {

    let block;

    // Special handling for "text" block using TextBlock class
    if (type === 'text') {
      const state = new ReactiveValue('Editable text...');
      const textComponent = new TextBlock(state);
      block = textComponent.mount(this.canvas);

      console.log(block)

      block.classList.add('canvas-block'); // Ensure consistent class
      block.dataset.type = 'text';
      this.blocks.push(textComponent); // Optional: track components
    } else {
      block = document.createElement('div');
      block.className = 'canvas-block';
      block.dataset.type = type;

      switch (type) {
        case 'image':
          block.innerHTML = '<img src="https://via.placeholder.com/150" alt="Image Block">';
          break;

        case 'video':
          block.innerHTML = '<video controls width="200"><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">Your browser does not support video.</video>';
          break;

        case 'button':
          block.innerHTML = '<button class="canvas-button">Click me</button>';
          break;

        default:
          block.textContent = `Unknown block: ${type}`;
      }
    }

    // Shared block logic
    block.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent bubbling
      document.querySelectorAll('.canvas-block').forEach(el => el.classList.remove('selected'));
      block.classList.add('selected');

      document.dispatchEvent(new CustomEvent('block:select', {
        detail: { block }
      }));
    });

    this.canvas.appendChild(block);
  }


  getBlocksData() {

    const blocks = Array.from(this.canvas.querySelectorAll('.canvas-block'));

    return blocks.map(block => {

      const type = block.dataset.type;

      switch (type) {
        case 'text':
          return { type, content: block.textContent };

        case 'image':
          const img = block.querySelector('img');
          return { type, src: img?.src || '' };

        case 'video':
          const video = block.querySelector('video source');
          return { type, src: video?.src || '' };

        case 'button':
          return { type, label: block.textContent };

        default:
          return { type: 'unknown', raw: block.innerHTML };
      }
    });

  }

  clear() {
    this.canvas.innerHTML = '';
    this.blocks = [];
  }

  addBlockFromData(data) {
    
    switch (data.type) {
      case 'text': {
        const state = new ReactiveValue('');
        const textBlock = new TextBlock(state);
        textBlock.load({ value: data.value }); // call .load() to apply saved value
        textBlock.mount(this.canvas);
        this.blocks.push(textBlock);
        break;
      }

      case 'image':
        this.addBlock('image', data.src);
        break;

      case 'button':
        this.addBlock('button', data.label);
        break;

      case 'video':
        this.addBlock('video', data.src);
        break;

      default:
        console.warn('Unknown block type:', data.type);
    }

  }

}

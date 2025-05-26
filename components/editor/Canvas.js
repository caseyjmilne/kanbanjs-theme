class Canvas {

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
    const block = document.createElement('div');
    block.className = 'canvas-block';
    block.dataset.type = type;

    block.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent bubbling
      document.querySelectorAll('.canvas-block').forEach(el => el.classList.remove('selected'));
      block.classList.add('selected');

      // Dispatch custom event
      document.dispatchEvent(new CustomEvent('block:select', {
        detail: { block }
      }));
    });

    switch (type) {
      case 'text':
        block.textContent = 'Editable text...';
        block.contentEditable = true;
        break;

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

    this.canvas.appendChild(block);
  }
}

window.Canvas = Canvas;
new Canvas();

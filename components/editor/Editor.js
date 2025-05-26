class Editor {

  constructor() {
    console.log('Editor initialized...');
    this.mount();
  }

  mount() {
    const canvas = document.querySelector('.canvas');
    if (!canvas) {
      console.error('Canvas not found');
      return;
    }

    // Add visible, editable block
    const block = document.createElement('div');
    block.className = 'text-block';
    block.contentEditable = true;
    block.textContent = 'Click to edit this block...';
    canvas.appendChild(block);
  }
  
}

window.Editor = Editor;
new Editor();

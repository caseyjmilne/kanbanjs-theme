class Editor {
  
  constructor() {

    this.mount();
    this.bindUI();
    this.load();

  }

  mount() {

    const canvasEl = document.querySelector('.canvas');
    if (!canvasEl) {
      console.error('Canvas not found');
      return;
    }

    // Initialize subcomponents
    this.toolbox = new Toolbox();
    this.canvas = new Canvas();
    this.settings = new Settings();
    this.debug = new Debug(this.canvas);

  }

  bindUI() {

    const saveBtn = document.getElementById('save-button');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.save());
    }

    const clearBtn = document.getElementById('clear-canvas');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Clear all blocks?')) {
          this.canvas.clear();
        }
      });
    }

  }

  save() {

    if (!this.canvas || typeof this.canvas.getBlocksData !== 'function') {
      console.warn('Canvas not ready or getBlocksData() missing');
      return;
    }

    const data = this.canvas.getBlocksData();
    localStorage.setItem('editorData', JSON.stringify(data));

    document.dispatchEvent(new CustomEvent('editor:update'));

  }

  load() {

    const raw = localStorage.getItem('editorData');
    if (!raw) {
      console.warn('No saved data found');
      return;
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.error('Invalid saved data');
      return;
    }

    if (!Array.isArray(data)) {
      console.error('Saved data must be an array');
      return;
    }

    this.canvas.clear(); // Clear current blocks

    data.forEach(block => {
      this.canvas.addBlockFromData(block);
    });

  }

}

window.Editor = Editor;
new Editor();

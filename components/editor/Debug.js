class Debug {

  constructor(canvas, storageKey = 'editorData') {
    
    this.canvas = canvas;
    this.storageKey = storageKey;
    this.elSave = document.querySelector('.editor-debug__save-data');
    this.elMarkup = document.querySelector('.editor-debug__markup-contents');

    this.refresh(); // initial display

    // Optional: auto-update
    document.addEventListener('editor:update', () => this.refresh());
  }

  refresh() {
    // 1. Show stored save data (from localStorage)
    const rawData = localStorage.getItem(this.storageKey);
    this.elSave.textContent = rawData
      ? this.formatJSON(rawData)
      : '// no saved data';

    // 2. Show current canvas markup
    this.elMarkup.textContent = this.canvas.canvas.innerHTML;
  }

  formatJSON(str) {
    try {
      return JSON.stringify(JSON.parse(str), null, 2);
    } catch (e) {
      return '// invalid JSON in storage';
    }
  }
}

class Toolbox {
    
  constructor() {
    console.log('Toolbox initialized...');
    this.tools = ['Text', 'Image', 'Video', 'Button'];
    this.mount();
  }

  mount() {
    const toolbox = document.querySelector('.toolbox');
    if (!toolbox) {
      console.error('Toolbox container not found');
      return;
    }

    const list = document.createElement('div');
    list.className = 'toolbox-items';

    this.tools.forEach(toolName => {
      const item = document.createElement('div');
      item.className = 'toolbox-item';
      item.textContent = toolName;
      item.setAttribute('draggable', 'true');
      item.dataset.tool = toolName.toLowerCase();

      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', item.dataset.tool);
        item.classList.add('dragging');
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });

      list.appendChild(item);
    });

    toolbox.appendChild(list);
  }
}

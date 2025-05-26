class Component {

  constructor() {
    this.needsUpdate = true;
    this.children = [];
  }

  mount(parentEl) {
    this.parentEl = parentEl;
    this.el = this.render();

    console.log(this.el)

    parentEl.appendChild(this.el);
    this.children.forEach(child => child.mount(this.el));
    return this.el;
  }

  requestUpdate() {
    this.needsUpdate = true;
    ComponentScheduler.schedule(this);
  }

  render() {
    // Override in subclass — return DOM element
    return document.createElement('div');
  }

  update() {
    const newEl = this.render();
    this.parentEl.replaceChild(newEl, this.el);
    this.el = newEl;
    this.needsUpdate = false;
  }
  
}

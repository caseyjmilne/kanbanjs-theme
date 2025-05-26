class ComponentScheduler {

  static queue = new Set();
  static scheduled = false;

  static schedule(component) {
    ComponentScheduler.queue.add(component);
    if (!ComponentScheduler.scheduled) {
      ComponentScheduler.scheduled = true;
      requestAnimationFrame(ComponentScheduler.flush);
    }
  }

  static flush() {
    ComponentScheduler.queue.forEach(comp => {
      if (comp.needsUpdate) comp.update();
    });
    ComponentScheduler.queue.clear();
    ComponentScheduler.scheduled = false;
  }
  
}

class ReactiveValue {

  constructor(value) {
    this._value = value;
    this.subscribers = new Set();
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.subscribers.forEach(fn => fn(val));
  }

  subscribe(fn) {
    this.subscribers.add(fn);
  }
  
}

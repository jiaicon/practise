import * as THREE from './../../node_modules/three/build/three.module.js';

class Event {
  constructor(options = {}) {
    this.name = 'event';

    this.camera = options.camera || null;

    this.raycaster = new THREE.Raycaster();

    this.container = document.querySelector('#container');
  }

  onClickEarthFn(event) {
    const x = event.clientX;
    const y = event.clientY;

    const mouse = new THREE.Vector2();
    mouse.x = x;
    mouse.y = y;
    this.raycaster.setFromCamera(mouse, this.camera);
  }

  onClickEarth() {
    console.log(111)
    this.container.addEventListener('mouseup', this.onClickEarthFn.bind(this));
    const timer = setTimeout(() => {
      this.container.removeEventListener('mouseup', this.onClickEarthFn.bind(this));
      clearTimeout(timer);
    }, 300)
  }

  addEarthEvent() {
    this.container.addEventListener('mousedown', this.onClickEarth.bind(this))
  }
}

export default Event;

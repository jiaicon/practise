import * as THREE from './../../node_modules/three/build/three.module.js';

class Event {
  constructor(options = {}) {
    this.name = 'event';

    this.camera = options.camera || null;

    this.raycaster = new THREE.Raycaster();

    this.mouse = new THREE.Vector2();

    this.stopRotationObjects = options.stopRotationObjects || [];

    this.container = document.querySelector('#container');
  }

  renewAll() {
    this._intersectObjects.forEach(intersectObject => {
      intersectObject.material.color.set(0xffffff);
    })
  }

  onHoverEarth(event) {
    const size = this.renderer.getSize(new THREE.Vector2());
    const px = this.renderer.domElement.getBoundingClientRect().left;
    const py = this.renderer.domElement.getBoundingClientRect().top;
    const pw = this.renderer.domElement.offsetWidth;
    const ph = this.renderer.domElement.offsetHeight;
    this.mouse.x = ((event.clientX - px) / pw) * 2 - 1;
    this.mouse.y = -((event.clientY - py) / ph) * 2 + 1;
    // 通过摄像机和鼠标位置更新射线
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // 鼠标hover时阻止自转
    const intersects1 = this.raycaster.intersectObjects(this._intersectObjects, false);
    if (this.stopRotationObjects.includes(intersects1?.[0]?.object.name)) {
      this.rotation = false;
    } else {
      if (!this.rotation) {
        this.rotation = true;
      }
    }

    // 保存hover的点
    let currentIntersect = null;
    // 计算物体和射线的焦点
    const intersects = this.raycaster.intersectObjects(this._intersectObjects, true);
    if (intersects.length) {
      if (!currentIntersect) {
        console.log('mouse enter')
      }
      const intersect = intersects[0].object;
      currentIntersect = intersect;
      this.renewAll()
      if (intersect.name === 'testLine') {
        intersect.material.color.set(0xff0000);
      }
      if (intersect.parent.name === 'chinaMap') {
        intersect.material.color.set(0xffff00);
      }
    } else {
      this.renewAll();
      if (currentIntersect) {
        console.log('mouse leave')
      }

      currentIntersect = null
    }
  }

  addEarthEvent(intersectObjects = []) {
    this._intersectObjects = intersectObjects;
    this.container.addEventListener('mousemove', this.onHoverEarth.bind(this));
  }
}

export default Event;

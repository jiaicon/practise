import * as THREE from './../../node_modules/three/build/three.module.js';

class Event {
  constructor(options = {}) {
    this.name = 'event';

    this.camera = options.camera || null;

    this.raycaster = new THREE.Raycaster();

    this.mouse = new THREE.Vector2();

    // 保存当前鼠标触碰的物体
    this.currentIntersect = null;

    this.container = document.querySelector('#container');
  }

  onHoverEarth(event) {
    const size = this.renderer.getSize(new THREE.Vector2());
    this.mouse.x = (event.clientX / size.x) * 2 - 1;
    this.mouse.y = -(event.clientY / size.y) * 2 + 1;
    // 通过摄像机和鼠标位置更新射线
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const allMesh = this.allMesh.children;

    // 鼠标hover时阻止自转
    const intersects1 = this.raycaster.intersectObjects(allMesh, false);
    if (intersects1?.[0]?.object.name === 'earth' || intersects1?.[0]?.object.name === 'cloud' || intersects1?.[0]?.object?.parent.name === 'allMesh') {
      this.rotation = false;
    } else {
      if (!this.rotation) {
        this.rotation = true;
      }
    }
    // 计算物体和射线的焦点
    const intersects = this.raycaster.intersectObjects(allMesh, true);
    if (intersects.length) {
      const intersect = intersects[0].object;
      if (intersect.name === 'testLine') {
        intersect.material.color.set(0xff0000);
      }
      if (intersect.parent.name === 'chinaMap') {
        intersect.material.color.set(0xffff00);
      }
    } else {
      this.currentIntersect = null;
    }
  }

  addEarthEvent() {
    this.container.addEventListener('mousemove', this.onHoverEarth.bind(this));
  }
}

export default Event;

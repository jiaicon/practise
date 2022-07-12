import Feature from './Feature.js';
import FeatureType from './FeatureType.js';
import * as THREE from './../../node_modules/three/build/three.module.js';
import CoordinateTransform from '/demo4/CoordinateTransform.js';

class Point extends Feature {
  constructor(options) {
    super(FeatureType.POINT);
    // 点的形状 默认方形
    this.shape = options.shape || 'square';
    // 数据
    this.dataset = options.dataset || [];

    this.color = options.color || '#fffa32';

    this.size = options.size || 1;
    
    this.coloredByHeight = options.coloredByHeight || false;

    this.init();
  }
  init() {
    if (this.shape === 'square') {
      this.mesh = this.createSquarePoint();
    } else {
      this.mesh = this.createCirclePoint();
    }
  }

  createSquarePoint() {
    let geometry = new THREE.BufferGeometry();

    let pxyz_arr = [];
    let colors = [];

    let max, min;
    if (this.coloredByHeight) {
      [max, min] = this.getMaxMinAlt();
    }

    for (let i = 0; i < this.dataset.length; i++) {
      let pcoor = this.dataset[i];
      let pxyz = CoordinateTransform.cartographicToXYZ(pcoor[0], pcoor[1], this.ingoreAlt ? 0 : pcoor[2]);
      pxyz_arr.push(pxyz.x, pxyz.y, pxyz.z);

      if (this.coloredByHeight) {
        let normalization = (pcoor[2] - min) / (max - min);
        colors.push(normalization * 20, normalization, normalization);
      }
    }

    let vertices = new Float32Array(pxyz_arr);

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    let material;
    if (this.coloredByHeight) {
      geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
      material = new THREE.PointsMaterial({
        size: this.size * 0.1,
        vertexColors: true
      });
    } else {
      material = new THREE.PointsMaterial({
        color: this.color,
        size: this.size * 0.1
      });
    }

    let point = new THREE.Points(geometry, material);
    point.lookAt(new THREE.Vector3(0, 0, 0))

    return point;
  }

  createCirclePoint() {
    let canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;

    let context = canvas.getContext("2d");
    context.fillStyle = "#fffa32";

    context.arc(50, 50, 45, 0, 2 * Math.PI);
    context.fill();

    let texture = new THREE.Texture(canvas);

    texture.needsUpdate = true;

    let geometry = new THREE.BufferGeometry();

    let pxyz_arr = [];
    for (let i = 0; i < this.dataset.length; i++) {
      let pcoor = this.dataset[i];
      let pxyz = CoordinateTransform.cartographicToXYZ(pcoor[0], pcoor[1], this.ingoreAlt ? 0 : pcoor[2]);
      pxyz_arr.push(pxyz.x, pxyz.y, pxyz.z);
    }

    let vertices = new Float32Array(pxyz_arr);

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    let material = new THREE.PointsMaterial({
      color: this.color,
      size: this.size * 0.1,
      map: texture,
      transparent: true
    });

    let point = new THREE.Points(geometry, material);
    point.lookAt(new THREE.Vector3(0, 0, 0))

    return point;
  }

  getMaxMinAlt() {
    let min = Infinity;
    let max = -Infinity;

    for (let i = 0; i < this.dataset.length; i++) {
      let pcoor = this.dataset[i];
      let alt = pcoor[2] || 0;
      min = Math.min(min, alt);
      if (min === undefined) console.log(i);
      max = Math.max(max, alt);
    }

    return [max, min];
  }

  removePoint() {

  }
}

export default Point;

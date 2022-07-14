import Feature from './Feature.js';
import FeatureType from './FeatureType.js';
import * as THREE from './../../node_modules/three/build/three.module.js';
import CoordinateTransform from '/demo4/CoordinateTransform.js';

const wavePng = '/demo4/assets/wave.png';

class BreathPoint extends Feature {
  constructor(options = {}) {
    super(FeatureType.BREATHPOINT);

    this.color = options.color || 0xffffff;

    this.feature = options.feature || null;

    this.size = options.size || 1;

    this.init();
  }
  init() {
    this.mesh = this.createPoint();
  }
  createPoint() {
    const geometry = new THREE.PlaneBufferGeometry(1, 1);
    const pxyz = CoordinateTransform.cartographicToXYZ(this.feature[0], this.feature[1], 300);

    // const vertices = new Float32Array([pxyz.x, pxyz.y, pxyz.z]);

    // geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(wavePng);
    const pointMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      color: this.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    })

    this.pointMesh = new THREE.Mesh(geometry, pointMaterial);

    this.pointMesh.size = this.size * 0.5;
    this.pointMesh._s = 1;
    this.pointMesh.position.set(pxyz.x, pxyz.y, pxyz.z);
    this.pointMesh.scale.set(this.size * 1, this.size * 1, this.size * 1);

    // mesh姿态设置
    // mesh在球面上的法线方向(球心和球面坐标构成的方向向量)
    const coordVec3 = new THREE.Vector3(pxyz.x, pxyz.y, pxyz.z).normalize();
    // mesh默认在XOY平面上，法线方向沿着z轴new THREE.Vector3(0, 0, 1)
    const meshNormal = new THREE.Vector3(0, 0, 1);
    // 四元数属性.quaternion表示mesh的角度状态
    //.setFromUnitVectors();计算两个向量之间构成的四元数值
    this.pointMesh.quaternion.setFromUnitVectors(meshNormal, coordVec3);

    this.addWaveAnimate();

    return this.pointMesh;
  }
  addWaveAnimate() {
    const mesh = this.pointMesh;
    mesh._s += 0.007;
    mesh.scale.set(
      mesh.size * mesh._s,
      mesh.size * mesh._s,
      mesh.size * mesh._s
    );
    if (mesh._s <= 1.5) {
      mesh.material.opacity = (mesh._s - 1) * 2; //2等于1/(1.5-1.0)，保证透明度在0~1之间变化
    } else if (mesh._s > 1.5 && mesh._s <= 2) {
      mesh.material.opacity = 1 - (mesh._s - 1.5) * 2; //2等于1/(2.0-1.5) mesh缩放2倍对应0 缩放1.5被对应1
    } else {
      mesh._s = 1.0;
    }

    requestAnimationFrame(this.addWaveAnimate.bind(this))
  }
}

export default BreathPoint;

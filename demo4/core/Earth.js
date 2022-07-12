import EarthParams from './EarthParams.js';
import * as THREE from './../../node_modules/three/build/three.module.js';
import { OrbitControls } from './../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import FeatureType from './FeatureType.js';

const earth_img = '/demo4/assets/earth2.jpg';
const galaxy_img = '/demo4/assets/galaxy.png';
const cloud_img = '/demo4/assets/cloud.jpg';
const { EARTH_RADIUS, SHRINK_SCALE } = EarthParams;
/**
 * Earth
 */
class Earth {
  constructor(options = {}) {
    this.rotation = options.rotation || false;
    this.cloud = options.cloud || false;
    this.showAxes = options.showAxes || false;

    this.init();
  }
  init() {
    document.addEventListener('DOMContentLoaded', () => {
      // 创建渲染器
      this.initRenderer();
      // 创建场景
      this.initScene();
      // 创建相机
      this.initCamera();
      // 初始化光照
      this.initLight();
      // 初始化控制器
      this.initControll();
      // 初始化地球
      this.initEarth();

      // 执行动画并渲染
      this.animate();
    })
  }
  initRenderer() {
    this.container = document.querySelector('#container');
    this.container.setAttribute('style', `
      border: none;
      cursor: pointer;
      width: 100%;
      height: 100vh;
      background-color: #EEEEEE;
    `)
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: this.renderer
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.container.appendChild(this.renderer.domElement);
    this.renderer.setClearColor(0x000000, 1.0);
  }
  initScene() {
    this.scene = new THREE.Scene();
    if (this.showAxes) {
      const axesHelper = new THREE.AxesHelper(20);
      this.scene.add(axesHelper);
    }
  }
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 1, 10000);
    this.camera.position.set(0, 0, 31);
    this.camera.lookAt({ x: 0, y: 0, z: 0 });
  }
  initLight() {
    this.light = new THREE.AmbientLight(0xFFFFFF);
    this.light.position.set(100, 100, 200);
    this.scene.add(this.light);
  }
  initControll() {
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.renderer.clear();
  }
  initEarth() {
    const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS * SHRINK_SCALE, 40, 30);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(earth_img),
      side: THREE.DoubleSide
    });

    this.earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    this.earthMesh.rotation.y = -(Math.PI / 2).toFixed(2);
    this.scene.add(this.earthMesh);

    if (this.cloud) {
      this.createCloud();
    }

    // 点数组
    this.featureMeshes = [];
  }
  createCloud() {
    // 创建包裹地球的云
    const cloudGeometry = new THREE.SphereGeometry(EARTH_RADIUS * SHRINK_SCALE + 0.3, 40, 30);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(cloud_img),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    })
    this.cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    this.scene.add(this.cloudMesh);
  }
  addFeature(feature) {
    let featureType = feature.type;
    console.log(feature)
    switch (featureType) {
      case FeatureType.POINT:
        this.addPoint(feature);
        break;
      case FeatureType.LINE:
        this.addLine(feature);
        break;
    }
  }
  addPoint(feature) {
    setTimeout(() => {
      this.scene.add(feature.mesh);
      this.featureMeshes.push(feature.mesh);
    }, 200)
  }
  addLine(feature) {
    setTimeout(() => {
      this.scene.add(feature.mesh);
      // this.featureMeshes.push(feature.mesh);
    }, 200)
  }
  updateFetures() {
    this.featureMeshes.forEach(mesh => {
      mesh.rotation.y -= 0.0015;
    })
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  animate() {
    if (this.rotation) {
      this.earthMesh && (this.earthMesh.rotation.y -= 0.0015);
      this.cloudMesh && (this.cloudMesh.rotation.y += 0.002);
      this.updateFetures();
    }
    this.render();
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default Earth;


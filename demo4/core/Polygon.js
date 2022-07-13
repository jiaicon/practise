import Feature from './Feature.js';
import FeatureType from './FeatureType.js';
import * as THREE from './../../node_modules/three/build/three.module.js';
import CoordinateTransform from '/demo4/CoordinateTransform.js';

class Polygon extends Feature {
  constructor(options = {}) {
    super(FeatureType.POLYGON);

    this.data = options.data || [];
    this.color = options.color || 0xffffff;

    this.init();
  }
  init() {
    this.mesh = this.createExtrudeMesh();
  }
  createExtrudeMesh() {
    const province = new THREE.Group();
    const features = this.data;

    features.forEach((feature) => {
      const name = feature.properties.name;
      const coordinates = feature.geometry.coordinates;
      if (feature.geometry.type === 'MultiPolygon') {
        coordinates.forEach((coordinate) => {
          coordinate.forEach((polygon) => {
            const line = this.createPolygon(polygon, name);
            province.add(line)
          })
        })
      }
      if (feature.geometry.type === 'Polygon') {
        coordinates.forEach((coordinate) => {
          const line = this.createPolygon(coordinate, name);
          province.add(line)
        })
      }
    })

    return province;
  }

  createPolygon(polygon, name) {
    const lineMaterial = new THREE.LineBasicMaterial({ color: typeof this.color === 'string' ? this.color : this.color(name) }); //0x3BFA9E
    const positions = [];
    const linGeometry = new THREE.BufferGeometry();
    for (let i = 0; i < polygon.length; i++) {
      var pos = CoordinateTransform.cartographicToXYZ(polygon[i][0], polygon[i][1]);
      positions.push(pos.x, pos.y, pos.z);
    }
    linGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const line = new THREE.Line(linGeometry, lineMaterial);

    return line;
  }
}

export default Polygon;

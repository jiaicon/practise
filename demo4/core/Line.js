import Feature from './Feature.js';
import FeatureType from './FeatureType.js';
import * as THREE from './../../node_modules/three/build/three.module.js';
import CoordinateTransform from '/demo4/CoordinateTransform.js';

class Line extends Feature {
  constructor(options = {}) {
    super(FeatureType.LINE);

    this.init(options.feature);
  }
  init(feature) {
    const posStart = CoordinateTransform.cartographicToXYZ(feature[0][0], feature[0][1]);
    const posEnd = CoordinateTransform.cartographicToXYZ(feature[1][0], feature[1][1]);

    const { v1, v2 } = this.getBezierPoint(posStart, posEnd);

    // 使用QuadraticBezierCurve3() 创建 三维二次贝塞尔曲线
    const curve = new THREE.CubicBezierCurve3(
      posStart,
      v1, v2,
      posEnd
    )

    const lineGeometry = new THREE.BufferGeometry()
    // 获取曲线 上的50个点
    var points = curve.getPoints(50)
    var positions = []
    var colors = []
    var color = new THREE.Color()

    // 给每个顶点设置演示 实现渐变
    for (var j = 0; j < points.length; j++) {
      color.setHSL(0.81666 + j, 0.88, 0.715 + j * 0.0025) // 粉色
      colors.push(color.r, color.g, color.b)
      positions.push(points[j].x, points[j].y, points[j].z)
    }
    // 放入顶点 和 设置顶点颜色
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3, true))
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3, true))

    const material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors, side: THREE.DoubleSid })
    this.mesh = new THREE.Line(lineGeometry, material)
  }
  getVCenter(start, end) {
    const v = start.add(end);
    return v.divideScalar(2);
  }
  getLenVcetor(v1, v2, len) {
    const v1v2Len = v1.distanceTo(v2);
    return v1.lerp(v2, len / v1v2Len);
  }
  getBezierPoint(v0, v3) {
    // 获取贝塞尔控制点    
    const angle = (v0.angleTo(v3) * 180) / Math.PI; // 0 ~ Math.PI       // 计算向量夹角 
    const aLen = angle * 0.06;
    const hLen = angle * angle * 50;
    const p0 = new THREE.Vector3(0, 0, 0); // 法线向量      
    const rayLine = new THREE.Ray(p0, this.getVCenter(v0.clone(), v3.clone())); // 顶点坐标 
    const vtop = rayLine.at(hLen / rayLine.at(1).distanceTo(p0)); // 几倍位置     
    // 控制点坐标      
    const v1 = this.getLenVcetor(v0.clone(), vtop, aLen);
    const v2 = this.getLenVcetor(v3.clone(), vtop, aLen);
    return {
      v1: v1,
      v2: v2
    };
  }
}

export default Line;

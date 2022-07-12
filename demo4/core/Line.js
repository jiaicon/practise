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

    const { x: x0, y: y0, z: z0 } = posStart;
    const { x: x1, y: y1, z: z1 } = posEnd;

    const line3 = new THREE.Line3();
    line3.start = posStart;
    line3.end = posEnd;

    const center = line3.getCenter();

    // 使用QuadraticBezierCurve3() 创建 三维二次贝塞尔曲线
    const curve = new THREE.QuadraticBezierCurve3(
      posStart,
      // { x: (x0 + x1) / 2, y: (y0 + y1) / 2 + 2, z: (z0 + z1) / 2 },
      center,
      posEnd
    )

    // 绘制 目标位置
    // spotCircle([x0, y0, z0])
    // spotCircle([x1, y1, z1])

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
    lineGeometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3, true))
    lineGeometry.addAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3, true))

    const material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors, side: THREE.DoubleSid })
    this.mesh = new THREE.Line(lineGeometry, material)
  }
}

export default Line;

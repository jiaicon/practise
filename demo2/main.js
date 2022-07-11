!function (a) { var b = /iPhone/i, c = /iPod/i, d = /iPad/i, e = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, f = /Android/i, g = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i, h = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i, i = /IEMobile/i, j = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, k = /BlackBerry/i, l = /BB10/i, m = /Opera Mini/i, n = /(CriOS|Chrome)(?=.*\bMobile\b)/i, o = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, p = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"), q = function (a, b) { return a.test(b) }, r = function (a) { var r = a || navigator.userAgent, s = r.split("[FBAN"); return "undefined" != typeof s[1] && (r = s[0]), s = r.split("Twitter"), "undefined" != typeof s[1] && (r = s[0]), this.apple = { phone: q(b, r), ipod: q(c, r), tablet: !q(b, r) && q(d, r), device: q(b, r) || q(c, r) || q(d, r) }, this.amazon = { phone: q(g, r), tablet: !q(g, r) && q(h, r), device: q(g, r) || q(h, r) }, this.android = { phone: q(g, r) || q(e, r), tablet: !q(g, r) && !q(e, r) && (q(h, r) || q(f, r)), device: q(g, r) || q(h, r) || q(e, r) || q(f, r) }, this.windows = { phone: q(i, r), tablet: q(j, r), device: q(i, r) || q(j, r) }, this.other = { blackberry: q(k, r), blackberry10: q(l, r), opera: q(m, r), firefox: q(o, r), chrome: q(n, r), device: q(k, r) || q(l, r) || q(m, r) || q(o, r) || q(n, r) }, this.seven_inch = q(p, r), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window ? this : void 0 }, s = function () { var a = new r; return a.Class = r, a }; "undefined" != typeof module && module.exports && "undefined" == typeof window ? module.exports = r : "undefined" != typeof module && module.exports && "undefined" != typeof window ? module.exports = s() : "function" == typeof define && define.amd ? define("isMobile", [], a.isMobile = s()) : a.isMobile = s() }(this);
// import { BufferGeometry } from '../../core/BufferGeometry';
// import { Vector2 } from '../../math/Vector2';
// import { Vector3 } from '../../math/Vector3';
// import { BufferAttribute } from '../../core/BufferAttribute';

function Sine() {
  this.easeInOut = function() {

  }
  this.easeOut = function() {

  }
}

/**
 * @author Mugen87 / https://github.com/Mugen87
 */

function PRingBufferGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength) {

  THREE.BufferGeometry.call(this);

  this.type = 'PRingBufferGeometry';

  this.parameters = {
    innerRadius: innerRadius,
    outerRadius: outerRadius,
    thetaSegments: thetaSegments,
    phiSegments: phiSegments,
    thetaStart: thetaStart,
    thetaLength: thetaLength
  };

  innerRadius = innerRadius || 20;
  outerRadius = outerRadius || 50;

  thetaStart = thetaStart !== undefined ? thetaStart : 0;
  thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;

  thetaSegments = thetaSegments !== undefined ? Math.max(3, thetaSegments) : 8;
  phiSegments = phiSegments !== undefined ? Math.max(1, phiSegments) : 1;

  // these are used to calculate buffer length
  var vertexCount = (thetaSegments + 1) * (phiSegments + 1);
  var indexCount = thetaSegments * phiSegments * 2 * 3;

  // buffers
  var indices = new THREE.BufferAttribute(new (indexCount > 65535 ? Uint32Array : Uint16Array)(indexCount), 1);
  var vertices = new THREE.BufferAttribute(new Float32Array(vertexCount * 3), 3);
  var normals = new THREE.BufferAttribute(new Float32Array(vertexCount * 3), 3);
  var uvs = new THREE.BufferAttribute(new Float32Array(vertexCount * 2), 2);

  // some helper variables
  var index = 0, indexOffset = 0, segment;
  var radius = innerRadius;
  var radiusStep = ((outerRadius - innerRadius) / phiSegments);
  var vertex = new THREE.Vector3();
  var uv = new THREE.Vector2();
  var j, i;

  // generate vertices, normals and uvs

  // values are generate from the inside of the ring to the outside

  var phiStep = 1 / phiSegments;
  var thetaStep = 1 / thetaSegments;
  for (j = 0; j <= phiSegments; j++) {

    for (i = 0; i <= thetaSegments; i++) {

      segment = thetaStart + i / thetaSegments * thetaLength;

      // vertex
      vertex.x = radius * Math.cos(segment);
      vertex.y = radius * Math.sin(segment);
      vertices.setXYZ(index, vertex.x, vertex.y, vertex.z);

      // normal
      normals.setXYZ(index, 0, 0, 1);

      // uv
      // uv.x = ( vertex.x / outerRadius + 1 ) / 2;
      // uv.y = ( vertex.y / outerRadius + 1 ) / 2;
      uv.x = i * thetaStep;
      uv.y = j * phiStep;
      uvs.setXY(index, uv.x, uv.y);

      // increase index
      index++;

    }

    // increase the radius for next row of vertices
    radius += radiusStep;

  }

  // generate indices

  for (j = 0; j < phiSegments; j++) {

    var thetaSegmentLevel = j * (thetaSegments + 1);

    for (i = 0; i < thetaSegments; i++) {

      segment = i + thetaSegmentLevel;

      // indices
      var a = segment;
      var b = segment + thetaSegments + 1;
      var c = segment + thetaSegments + 2;
      var d = segment + 1;

      // face one
      indices.setX(indexOffset, a); indexOffset++;
      indices.setX(indexOffset, b); indexOffset++;
      indices.setX(indexOffset, c); indexOffset++;

      // face two
      indices.setX(indexOffset, a); indexOffset++;
      indices.setX(indexOffset, c); indexOffset++;
      indices.setX(indexOffset, d); indexOffset++;

    }

  }

  // build geometry

  this.setIndex(indices);
  this.addAttribute('position', vertices);
  this.addAttribute('normal', normals);
  this.addAttribute('uv', uvs);

}

PRingBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
PRingBufferGeometry.prototype.constructor = PRingBufferGeometry;

THREE.PRingBufferGeometry = PRingBufferGeometry;

// export { RingBufferGeometry };
/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */

THREE.CopyShader = {

  uniforms: {

    "tDiffuse": { value: null },
    "opacity": { value: 1.0 }

  },

  vertexShader: [

    "varying vec2 vUv;",

    "void main() {",

    "vUv = uv;",
    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"

  ].join("\n"),

  fragmentShader: [

    "uniform float opacity;",

    "uniform sampler2D tDiffuse;",

    "varying vec2 vUv;",

    "void main() {",

    "vec4 texel = texture2D( tDiffuse, vUv );",
    "gl_FragColor = opacity * texel;",

    "}"

  ].join("\n")

};

/**
 * @author felixturner / http://airtight.cc/
 *
 * RGB Shift Shader
 * Shifts red and blue channels from center in opposite directions
 * Ported from http://kriss.cx/tom/2009/05/rgb-shift/
 * by Tom Butterworth / http://kriss.cx/tom/
 *
 * amount: shift distance (1 is width of input)
 * angle: shift angle in radians
 */

THREE.RGBShiftShader = {

  uniforms: {

    "tDiffuse": { value: null },
    "amount": { value: 0.005 },
    "angle": { value: 0.0 }

  },

  vertexShader: [

    "varying vec2 vUv;",

    "void main() {",

    "vUv = uv;",
    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"

  ].join("\n"),

  fragmentShader: [

    "uniform sampler2D tDiffuse;",
    "uniform float amount;",
    "uniform float angle;",

    "varying vec2 vUv;",

    "void main() {",

    // "vec2 offset = amount * vec2( cos(angle), sin(angle));",
    "vec2 offset = amount * vec2( vUv.x - .5, vUv.y - .5 );",
    "vec4 cr = texture2D(tDiffuse, vUv + offset);",
    "vec4 cga = texture2D(tDiffuse, vUv);",
    "vec4 cb = texture2D(tDiffuse, vUv - offset);",
    "gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);",

    "}"

  ].join("\n")

};

THREE.AlphaColorShader = {

  uniforms: {

    color: { value: new THREE.Color(0xffffff) },
    fogType: { value: 1 },
    fogNear: { value: 10.0 },
    fogFar: { value: 30.0 }
  },

  vertexShader: [
    "attribute float alpha;",
    "varying float vAlpha;",
    "void main() {",
    "vAlpha = alpha;",
    "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
    "gl_PointSize = 4.0;",
    "gl_Position = projectionMatrix * mvPosition;",
    "}",

  ].join("\n"),

  fragmentShader: [
    // "uniform vec3 color;",
    //   	"varying float vAlpha;",
    //   	"void main() {",

    //       	"gl_FragColor = vec4( color, vAlpha * ( gl_FragCoord.z ) );",


    //   	"}"

    "uniform vec3 color;",
    "uniform int fogType;",
    "uniform float fogNear;",
    "uniform float fogFar;",

    "varying float vAlpha;",

    "void main() {",
    // vec4 texture = texture2D( map, vUV );
    // if ( texture.a < alphaTest ) discard;
    // gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );

    "vec3 fogColor = vec3(0,0,0);",

    "gl_FragColor = vec4( color, vAlpha * ( gl_FragCoord.z ) );",
    "if ( fogType > 0 ) {",
    "float depth = gl_FragCoord.z / gl_FragCoord.w;",
    "float fogFactor = 0.0;",
    "if ( fogType == 1 ) {",
    "fogFactor = smoothstep( fogNear, fogFar, depth );",
    "} else {",
    // "const float LOG2 = 1.442695;",
    // "float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );",
    // "fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );",
    "}",
    "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",
    "}",
    "}"

  ].join("\n"),

  transparent: true

};

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Simple fake tilt-shift effect, modulating two pass Gaussian blur (see above) by vertical position
 *
 * - 9 samples per pass
 * - standard deviation 2.7
 * - "h" and "v" parameters should be set to "1 / width" and "1 / height"
 * - "r" parameter control where "focused" horizontal line lies
 */

THREE.VerticalTiltShiftShader = {

  uniforms: {

    "tDiffuse": { value: null },
    "v": { value: 1.0 / 512.0 },
    "r": { value: 0.35 }

  },

  vertexShader: [

    "\
		varying vec2 vUv;\
		\
		void main() {\
			\
			vUv = uv;\
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\
			\
		}"

  ].join("\n"),

  fragmentShader: [

    "uniform sampler2D tDiffuse;\
		uniform float v;\
		uniform float r;\
		\
		varying vec2 vUv;\
		\
		void main() {\
			\
			vec4 sum = vec4( 0.0 );\
			\
			float vv = v * abs( vUv.y - 0.5 ) * 1.5;\
			\
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * vv ) ) * 0.051;\
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * vv ) ) * 0.0918;\
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * vv ) ) * 0.12245;\
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * vv ) ) * 0.1531;\
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;\
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * vv ) ) * 0.1531;\
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * vv ) ) * 0.12245;\
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * vv ) ) * 0.0918;\
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * vv ) ) * 0.051;\
			\
			gl_FragColor = sum;\
			\
		}"

  ].join("\n")

};

/**
 * @author alteredq / http://alteredqualia.com/
 * @author davidedc / http://www.sketchpatch.net/
 *
 * NVIDIA FXAA by Timothy Lottes
 * http://timothylottes.blogspot.com/2011/06/fxaa3-source-released.html
 * - WebGL port by @supereggbert
 * http://www.glge.org/demos/fxaa/
 */

THREE.FXAAShader = {

  uniforms: {

    "tDiffuse": { value: null },
    "resolution": { value: new THREE.Vector2(1 / 1024, 1 / 512) }

  },

  vertexShader: [

    "void main() {",

    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"

  ].join("\n"),

  fragmentShader: [

    "uniform sampler2D tDiffuse;",
    "uniform vec2 resolution;",

    "#define FXAA_REDUCE_MIN   (1.0/128.0)",
    "#define FXAA_REDUCE_MUL   (1.0/8.0)",
    "#define FXAA_SPAN_MAX     8.0",

    "void main() {",

    "vec3 rgbNW = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( -1.0, -1.0 ) ) * resolution ).xyz;",
    "vec3 rgbNE = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( 1.0, -1.0 ) ) * resolution ).xyz;",
    "vec3 rgbSW = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( -1.0, 1.0 ) ) * resolution ).xyz;",
    "vec3 rgbSE = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( 1.0, 1.0 ) ) * resolution ).xyz;",
    "vec4 rgbaM  = texture2D( tDiffuse,  gl_FragCoord.xy  * resolution );",
    "vec3 rgbM  = rgbaM.xyz;",
    "vec3 luma = vec3( 0.299, 0.587, 0.114 );",

    "float lumaNW = dot( rgbNW, luma );",
    "float lumaNE = dot( rgbNE, luma );",
    "float lumaSW = dot( rgbSW, luma );",
    "float lumaSE = dot( rgbSE, luma );",
    "float lumaM  = dot( rgbM,  luma );",
    "float lumaMin = min( lumaM, min( min( lumaNW, lumaNE ), min( lumaSW, lumaSE ) ) );",
    "float lumaMax = max( lumaM, max( max( lumaNW, lumaNE) , max( lumaSW, lumaSE ) ) );",

    "vec2 dir;",
    "dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));",
    "dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));",

    "float dirReduce = max( ( lumaNW + lumaNE + lumaSW + lumaSE ) * ( 0.25 * FXAA_REDUCE_MUL ), FXAA_REDUCE_MIN );",

    "float rcpDirMin = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + dirReduce );",
    "dir = min( vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX),",
    "max( vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),",
    "dir * rcpDirMin)) * resolution;",
    "vec4 rgbA = (1.0/2.0) * (",
    "texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (1.0/3.0 - 0.5)) +",
    "texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (2.0/3.0 - 0.5)));",
    "vec4 rgbB = rgbA * (1.0/2.0) + (1.0/4.0) * (",
    "texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (0.0/3.0 - 0.5)) +",
    "texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (3.0/3.0 - 0.5)));",
    "float lumaB = dot(rgbB, vec4(luma, 0.0));",

    "if ( ( lumaB < lumaMin ) || ( lumaB > lumaMax ) ) {",

    "gl_FragColor = rgbA;",

    "} else {",
    "gl_FragColor = rgbB;",

    "}",

    "}"

  ].join("\n")

};

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.EffectComposer = function (renderer, renderTarget) {

  this.renderer = renderer;

  if (renderTarget === undefined) {

    var parameters = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: false
    };
    var size = renderer.getSize();
    renderTarget = new THREE.WebGLRenderTarget(size.width, size.height, parameters);

  }

  this.renderTarget1 = renderTarget;
  this.renderTarget2 = renderTarget.clone();

  this.writeBuffer = this.renderTarget1;
  this.readBuffer = this.renderTarget2;

  this.passes = [];

  if (THREE.CopyShader === undefined)
    console.error("THREE.EffectComposer relies on THREE.CopyShader");

  this.copyPass = new THREE.ShaderPass(THREE.CopyShader);

};

Object.assign(THREE.EffectComposer.prototype, {

  swapBuffers: function () {

    var tmp = this.readBuffer;
    this.readBuffer = this.writeBuffer;
    this.writeBuffer = tmp;

  },

  addPass: function (pass) {

    this.passes.push(pass);

    var size = this.renderer.getSize();
    pass.setSize(size.width, size.height);

  },

  insertPass: function (pass, index) {

    this.passes.splice(index, 0, pass);

  },

  render: function (delta) {

    var maskActive = false;

    var pass, i, il = this.passes.length;

    for (i = 0; i < il; i++) {

      pass = this.passes[i];

      if (pass.enabled === false) continue;

      pass.render(this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive);

      if (pass.needsSwap) {

        if (maskActive) {

          var context = this.renderer.context;

          context.stencilFunc(context.NOTEQUAL, 1, 0xffffffff);

          this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, delta);

          context.stencilFunc(context.EQUAL, 1, 0xffffffff);

        }

        this.swapBuffers();

      }

      if (THREE.MaskPass !== undefined) {

        if (pass instanceof THREE.MaskPass) {

          maskActive = true;

        } else if (pass instanceof THREE.ClearMaskPass) {

          maskActive = false;

        }

      }

    }

  },

  reset: function (renderTarget) {

    if (renderTarget === undefined) {

      var size = this.renderer.getSize();

      renderTarget = this.renderTarget1.clone();
      renderTarget.setSize(size.width, size.height);

    }

    this.renderTarget1.dispose();
    this.renderTarget2.dispose();
    this.renderTarget1 = renderTarget;
    this.renderTarget2 = renderTarget.clone();

    this.writeBuffer = this.renderTarget1;
    this.readBuffer = this.renderTarget2;

  },

  setSize: function (width, height) {

    this.renderTarget1.setSize(width, height);
    this.renderTarget2.setSize(width, height);

    for (var i = 0; i < this.passes.length; i++) {

      this.passes[i].setSize(width, height);

    }

  }

});


THREE.Pass = function () {

  // if set to true, the pass is processed by the composer
  this.enabled = true;

  // if set to true, the pass indicates to swap read and write buffer after rendering
  this.needsSwap = true;

  // if set to true, the pass clears its buffer before rendering
  this.clear = false;

  // if set to true, the result of the pass is rendered to screen
  this.renderToScreen = false;

};

Object.assign(THREE.Pass.prototype, {

  setSize: function (width, height) { },

  render: function (renderer, writeBuffer, readBuffer, delta, maskActive) {

    console.error("THREE.Pass: .render() must be implemented in derived pass.");

  }

});

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.RenderPass = function (scene, camera, overrideMaterial, clearColor, clearAlpha) {

  THREE.Pass.call(this);

  this.scene = scene;
  this.camera = camera;

  this.overrideMaterial = overrideMaterial;

  this.clearColor = clearColor;
  this.clearAlpha = (clearAlpha !== undefined) ? clearAlpha : 0;

  this.clear = true;
  this.needsSwap = false;

};

THREE.RenderPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

  constructor: THREE.RenderPass,

  render: function (renderer, writeBuffer, readBuffer, delta, maskActive) {

    var oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;

    this.scene.overrideMaterial = this.overrideMaterial;

    var oldClearColor, oldClearAlpha;

    if (this.clearColor) {

      oldClearColor = renderer.getClearColor().getHex();
      oldClearAlpha = renderer.getClearAlpha();

      renderer.setClearColor(this.clearColor, this.clearAlpha);

    }

    renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear);

    if (this.clearColor) {

      renderer.setClearColor(oldClearColor, oldClearAlpha);

    }

    this.scene.overrideMaterial = null;
    renderer.autoClear = oldAutoClear;
  }

});

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.MaskPass = function (scene, camera) {

  THREE.Pass.call(this);

  this.scene = scene;
  this.camera = camera;

  this.clear = true;
  this.needsSwap = false;

  this.inverse = false;

};

THREE.MaskPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

  constructor: THREE.MaskPass,

  render: function (renderer, writeBuffer, readBuffer, delta, maskActive) {

    var context = renderer.context;
    var state = renderer.state;

    // don't update color or depth

    state.buffers.color.setMask(false);
    state.buffers.depth.setMask(false);

    // lock buffers

    state.buffers.color.setLocked(true);
    state.buffers.depth.setLocked(true);

    // set up stencil

    var writeValue, clearValue;

    if (this.inverse) {

      writeValue = 0;
      clearValue = 1;

    } else {

      writeValue = 1;
      clearValue = 0;

    }

    state.buffers.stencil.setTest(true);
    state.buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE);
    state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 0xffffffff);
    state.buffers.stencil.setClear(clearValue);

    // draw into the stencil buffer

    renderer.render(this.scene, this.camera, readBuffer, this.clear);
    renderer.render(this.scene, this.camera, writeBuffer, this.clear);

    // unlock color and depth buffer for subsequent rendering

    state.buffers.color.setLocked(false);
    state.buffers.depth.setLocked(false);

    // only render where stencil is set to 1

    state.buffers.stencil.setFunc(context.EQUAL, 1, 0xffffffff);  // draw if == 1
    state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);

  }

});


THREE.ClearMaskPass = function () {

  THREE.Pass.call(this);

  this.needsSwap = false;

};

THREE.ClearMaskPass.prototype = Object.create(THREE.Pass.prototype);

Object.assign(THREE.ClearMaskPass.prototype, {

  render: function (renderer, writeBuffer, readBuffer, delta, maskActive) {

    renderer.state.buffers.stencil.setTest(false);

  }

});

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ShaderPass = function (shader, textureID) {

  THREE.Pass.call(this);

  this.textureID = (textureID !== undefined) ? textureID : "tDiffuse";

  if (shader instanceof THREE.ShaderMaterial) {

    this.uniforms = shader.uniforms;

    this.material = shader;

  } else if (shader) {

    this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    this.material = new THREE.ShaderMaterial({

      defines: shader.defines || {},
      uniforms: this.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader

    });

  }

  this.camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);
  this.scene = new THREE.Scene();

  this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
  this.scene.add(this.quad);

};

THREE.ShaderPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

  constructor: THREE.ShaderPass,

  render: function (renderer, writeBuffer, readBuffer, delta, maskActive) {

    if (this.uniforms[this.textureID]) {

      this.uniforms[this.textureID].value = readBuffer.texture;

    }

    this.quad.material = this.material;

    if (this.renderToScreen) {

      renderer.render(this.scene, this.camera);

    } else {

      renderer.render(this.scene, this.camera, writeBuffer, this.clear);

    }

  }

});

/**
 * @author mpk / http://polko.me/
 */

THREE.SMAAPass = function (width, height) {

  THREE.Pass.call(this);

  // render targets

  this.edgesRT = new THREE.WebGLRenderTarget(width, height, {
    depthBuffer: false,
    stencilBuffer: false,
    generateMipmaps: false,
    minFilter: THREE.LinearFilter,
    format: THREE.RGBFormat
  });

  this.weightsRT = new THREE.WebGLRenderTarget(width, height, {
    depthBuffer: false,
    stencilBuffer: false,
    generateMipmaps: false,
    minFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat
  });

  // textures

  var areaTextureImage = new Image();
  areaTextureImage.src = this.getAreaTexture();

  this.areaTexture = new THREE.Texture();
  this.areaTexture.image = areaTextureImage;
  this.areaTexture.format = THREE.RGBFormat;
  this.areaTexture.minFilter = THREE.LinearFilter;
  this.areaTexture.generateMipmaps = false;
  this.areaTexture.needsUpdate = true;
  this.areaTexture.flipY = false;

  var searchTextureImage = new Image();
  searchTextureImage.src = this.getSearchTexture();

  this.searchTexture = new THREE.Texture();
  this.searchTexture.image = searchTextureImage;
  this.searchTexture.magFilter = THREE.NearestFilter;
  this.searchTexture.minFilter = THREE.NearestFilter;
  this.searchTexture.generateMipmaps = false;
  this.searchTexture.needsUpdate = true;
  this.searchTexture.flipY = false;

  // materials - pass 1

  if (THREE.SMAAShader === undefined) {
    console.error("THREE.SMAAPass relies on THREE.SMAAShader");
  }

  this.uniformsEdges = THREE.UniformsUtils.clone(THREE.SMAAShader[0].uniforms);

  this.uniformsEdges["resolution"].value.set(1 / width, 1 / height);

  this.materialEdges = new THREE.ShaderMaterial({
    defines: THREE.SMAAShader[0].defines,
    uniforms: this.uniformsEdges,
    vertexShader: THREE.SMAAShader[0].vertexShader,
    fragmentShader: THREE.SMAAShader[0].fragmentShader
  });

  // materials - pass 2

  this.uniformsWeights = THREE.UniformsUtils.clone(THREE.SMAAShader[1].uniforms);

  this.uniformsWeights["resolution"].value.set(1 / width, 1 / height);
  this.uniformsWeights["tDiffuse"].value = this.edgesRT.texture;
  this.uniformsWeights["tArea"].value = this.areaTexture;
  this.uniformsWeights["tSearch"].value = this.searchTexture;

  this.materialWeights = new THREE.ShaderMaterial({
    defines: THREE.SMAAShader[1].defines,
    uniforms: this.uniformsWeights,
    vertexShader: THREE.SMAAShader[1].vertexShader,
    fragmentShader: THREE.SMAAShader[1].fragmentShader
  });

  // materials - pass 3

  this.uniformsBlend = THREE.UniformsUtils.clone(THREE.SMAAShader[2].uniforms);

  this.uniformsBlend["resolution"].value.set(1 / width, 1 / height);
  this.uniformsBlend["tDiffuse"].value = this.weightsRT.texture;

  this.materialBlend = new THREE.ShaderMaterial({
    uniforms: this.uniformsBlend,
    vertexShader: THREE.SMAAShader[2].vertexShader,
    fragmentShader: THREE.SMAAShader[2].fragmentShader
  });

  this.needsSwap = false;

  this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  this.scene = new THREE.Scene();

  this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
  this.scene.add(this.quad);

};

THREE.SMAAPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

  constructor: THREE.SMAAPass,

  render: function (renderer, writeBuffer, readBuffer, delta, maskActive) {

    // pass 1

    this.uniformsEdges["tDiffuse"].value = readBuffer.texture;

    this.quad.material = this.materialEdges;

    renderer.render(this.scene, this.camera, this.edgesRT, this.clear);

    // pass 2

    this.quad.material = this.materialWeights;

    renderer.render(this.scene, this.camera, this.weightsRT, this.clear);

    // pass 3

    this.uniformsBlend["tColor"].value = readBuffer.texture;

    this.quad.material = this.materialBlend;

    if (this.renderToScreen) {

      renderer.render(this.scene, this.camera);

    } else {

      renderer.render(this.scene, this.camera, writeBuffer, this.clear);

    }

  },

  setSize: function (width, height) {

    this.edgesRT.setSize(width, height);
    this.weightsRT.setSize(width, height);

    this.materialEdges.uniforms['resolution'].value.set(1 / width, 1 / height);
    this.materialWeights.uniforms['resolution'].value.set(1 / width, 1 / height);
    this.materialBlend.uniforms['resolution'].value.set(1 / width, 1 / height);

  },

  getAreaTexture: function () {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAIwCAIAAACOVPcQAACBeklEQVR42u39W4xlWXrnh/3WWvuciIzMrKxrV8/0rWbY0+SQFKcb4owIkSIFCjY9AC1BT/LYBozRi+EX+cV+8IMsYAaCwRcBwjzMiw2jAWtgwC8WR5Q8mDFHZLNHTarZGrLJJllt1W2qKrsumZWZcTvn7L3W54e1vrXX3vuciLPPORFR1XE2EomorB0nVuz//r71re/y/1eMvb4Cb3N11xV/PP/2v4UBAwJG/7H8urx6/25/Gf8O5hypMQ0EEEQwAqLfoN/Z+97f/SW+/NvcgQk4sGBJK6H7N4PFVL+K+e0N11yNfkKvwUdwdlUAXPHHL38oa15f/i/46Ih6SuMSPmLAYAwyRKn7dfMGH97jaMFBYCJUgotIC2YAdu+LyW9vvubxAP8kAL8H/koAuOKP3+q6+xGnd5kdYCeECnGIJViwGJMAkQKfDvB3WZxjLKGh8VSCCzhwEWBpMc5/kBbjawT4HnwJfhr+pPBIu7uu+OOTo9vsmtQcniMBGkKFd4jDWMSCRUpLjJYNJkM+IRzQ+PQvIeAMTrBS2LEiaiR9b/5PuT6Ap/AcfAFO4Y3dA3DFH7/VS+M8k4baEAQfMI4QfbVDDGIRg7GKaIY52qAjTAgTvGBAPGIIghOCYAUrGFNgzA7Q3QhgCwfwAnwe5vDejgG44o/fbm1C5ZlYQvQDARPAIQGxCWBM+wWl37ZQESb4gImexGMDouhGLx1Cst0Saa4b4AqO4Hk4gxo+3DHAV/nx27p3JziPM2pVgoiia5MdEzCGULprIN7gEEeQ5IQxEBBBQnxhsDb5auGmAAYcHMA9eAAz8PBol8/xij9+C4Djlim4gJjWcwZBhCBgMIIYxGAVIkH3ZtcBuLdtRFMWsPGoY9rN+HoBji9VBYdwD2ZQg4cnO7OSq/z4rU5KKdwVbFAjNojCQzTlCLPFSxtamwh2jMUcEgg2Wm/6XgErIBhBckQtGN3CzbVacERgCnfgLswhnvqf7QyAq/z4rRZm1YglYE3affGITaZsdIe2FmMIpnOCap25I6jt2kCwCW0D1uAD9sZctNGXcQIHCkINDQgc78aCr+zjtw3BU/ijdpw3zhCwcaONwBvdeS2YZKkJNJsMPf2JKEvC28RXxxI0ASJyzQCjCEQrO4Q7sFArEzjZhaFc4cdv+/JFdKULM4px0DfUBI2hIsy06BqLhGTQEVdbfAIZXYMPesq6VoCHICzUyjwInO4Y411//LYLs6TDa9wvg2CC2rElgAnpTBziThxaL22MYhzfkghz6GAs2VHbbdM91VZu1MEEpupMMwKyVTb5ij9+u4VJG/5EgEMMmFF01cFai3isRbKbzb+YaU/MQbAm2XSMoUPAmvZzbuKYRIFApbtlrfFuUGd6vq2hXNnH78ZLh/iFhsQG3T4D1ib7k5CC6vY0DCbtrohgLEIClXiGtl10zc0CnEGIhhatLBva7NP58Tvw0qE8yWhARLQ8h4+AhQSP+I4F5xoU+VilGRJs6wnS7ruti/4KvAY/CfdgqjsMy4pf8fodQO8/gnuX3f/3xi3om1/h7THr+co3x93PP9+FBUfbNUjcjEmhcrkT+8K7ml7V10Jo05mpIEFy1NmCJWx9SIKKt+EjAL4Ez8EBVOB6havuT/rByPvHXK+9zUcfcbb254+9fydJknYnRr1oGfdaiAgpxu1Rx/Rek8KISftx3L+DfsLWAANn8Hvw0/AFeAGO9DFV3c6D+CcWbL8Dj9e7f+T1k8AZv/d7+PXWM/Z+VvdCrIvuAKO09RpEEQJM0Ci6+B4xhTWr4cZNOvhktabw0ta0rSJmqz3Yw5/AKXwenod7cAhTmBSPKf6JBdvH8IP17h95pXqw50/+BFnj88fev4NchyaK47OPhhtI8RFSvAfDSNh0Ck0p2gLxGkib5NJj/JWCr90EWQJvwBzO4AHcgztwAFN1evHPUVGwfXON+0debT1YeGON9Yy9/63X+OguiwmhIhQhD7l4sMqlG3D86Suc3qWZ4rWjI1X7u0Ytw6x3rIMeIOPDprfe2XzNgyj6PahhBjO4C3e6puDgXrdg+/5l948vF3bqwZetZ+z9Rx9zdIY5pInPK4Nk0t+l52xdK2B45Qd87nM8fsD5EfUhIcJcERw4RdqqH7Yde5V7m1vhNmtedkz6EDzUMF/2jJYWbC+4fzzA/Y+/8PPH3j9dcBAPIRP8JLXd5BpAu03aziOL3VVHZzz3CXWDPWd+SH2AnxIqQoTZpo9Ckc6HIrFbAbzNmlcg8Ag8NFDDAhbJvTBZXbC94P7t68EXfv6o+21gUtPETU7bbkLxvNKRFG2+KXzvtObonPP4rBvsgmaKj404DlshFole1Glfh02fE7bYR7dZ82oTewIBGn1Md6CG6YUF26X376oevOLzx95vhUmgblI6LBZwTCDY7vMq0op5WVXgsObOXJ+1x3qaBl9j1FeLxbhU9w1F+Wiba6s1X/TBz1LnUfuYDi4r2C69f1f14BWfP+p+W2GFKuC9phcELMYRRLur9DEZTUdEH+iEqWdaM7X4WOoPGI+ZYD2+wcQ+y+ioHUZ9dTDbArzxmi/bJI9BND0Ynd6lBdve/butBw8+f/T9D3ABa3AG8W3VPX4hBin+bj8dMMmSpp5pg7fJ6xrBFE2WQQEWnV8Qg3FbAWzYfM1rREEnmvkN2o1+acG2d/9u68GDzx91v3mAjb1zkpqT21OipPKO0b9TO5W0nTdOmAQm0TObts3aBKgwARtoPDiCT0gHgwnbArzxmtcLc08HgF1asN0C4Ms/fvD5I+7PhfqyXE/b7RbbrGyRQRT9ARZcwAUmgdoz0ehJ9Fn7QAhUjhDAQSw0bV3T3WbNa59jzmiP6GsWbGXDX2ytjy8+f9T97fiBPq9YeLdBmyuizZHaqXITnXiMUEEVcJ7K4j3BFPurtB4bixW8wTpweL8DC95szWMOqucFYGsWbGU7p3TxxxefP+r+oTVktxY0v5hbq3KiOKYnY8ddJVSBxuMMVffNbxwIOERShst73HZ78DZrHpmJmH3K6sGz0fe3UUj0eyRrSCGTTc+rjVNoGzNSv05srAxUBh8IhqChiQgVNIIBH3AVPnrsnXQZbLTm8ammv8eVXn/vWpaTem5IXRlt+U/LA21zhSb9cye6jcOfCnOwhIAYXAMVTUNV0QhVha9xjgA27ODJbLbmitt3tRN80lqG6N/khgot4ZVlOyO4WNg3OIMzhIZQpUEHieg2im6F91hB3I2tubql6BYNN9Hj5S7G0G2tahslBWKDnOiIvuAEDzakDQKDNFQT6gbn8E2y4BBubM230YIpBnDbMa+y3dx0n1S0BtuG62lCCXwcY0F72T1VRR3t2ONcsmDjbmzNt9RFs2LO2hQNyb022JisaI8rAWuw4HI3FuAIhZdOGIcdjLJvvObqlpqvWTJnnQbyi/1M9O8UxWhBs//H42I0q1Yb/XPGONzcmm+ri172mHKvZBpHkJaNJz6v9jxqiklDj3U4CA2ugpAaYMWqNXsdXbmJNd9egCnJEsphXNM+MnK3m0FCJ5S1kmJpa3DgPVbnQnPGWIDspW9ozbcO4K/9LkfaQO2KHuqlfFXSbdNzcEcwoqNEFE9zcIXu9/6n/ym/BC/C3aJLzEKPuYVlbFnfhZ8kcWxV3dbv4bKl28566wD+8C53aw49lTABp9PWbsB+knfc/Li3eVizf5vv/xmvnPKg5ihwKEwlrcHqucuVcVOxEv8aH37E3ZqpZypUulrHEtIWKUr+txHg+ojZDGlwnqmkGlzcVi1dLiNSJiHjfbRNOPwKpx9TVdTn3K05DBx4psIk4Ei8aCkJahRgffk4YnEXe07T4H2RR1u27E6wfQsBDofUgjFUFnwC2AiVtA+05J2zpiDK2Oa0c5fmAecN1iJzmpqFZxqYBCYhFTCsUNEmUnIcZ6aEA5rQVhEywG6w7HSW02XfOoBlQmjwulOFQAg66SvJblrTEX1YtJ3uG15T/BH1OfOQeuR8g/c0gdpT5fx2SKbs9EfHTKdM8A1GaJRHLVIwhcGyydZsbifAFVKl5EMKNU2Hryo+06BeTgqnxzYjThVySDikbtJPieco75lYfKAJOMEZBTjoITuWHXXZVhcUDIS2hpiXHV9Ku4u44bN5OYLDOkJo8w+xJSMbhBRHEdEs9JZUCkQrPMAvaHyLkxgkEHxiNkx/x2YB0mGsQ8EUWj/stW5YLhtS5SMu+/YBbNPDCkGTUybN8krRLBGPlZkVOA0j+a1+rkyQKWGaPHPLZOkJhioQYnVZ2hS3zVxMtgC46KuRwbJNd9nV2PHgb36F194ecf/Yeu2vAFe5nm/bRBFrnY4BauE8ERmZRFUn0k8hbftiVYSKMEme2dJCJSCGYAlNqh87bXOPdUkGy24P6d1ll21MBqqx48Fvv8ZHH8HZFY7j/uAq1xMJUFqCSUlJPmNbIiNsmwuMs/q9CMtsZsFO6SprzCS1Z7QL8xCQClEelpjTduDMsmWD8S1PT152BtvmIGvUeDA/yRn83u/x0/4qxoPHjx+PXY9pqX9bgMvh/Nz9kpP4pOe1/fYf3axUiMdHLlPpZCNjgtNFAhcHEDxTumNONhHrBduW+vOyY++70WWnPXj98eA4kOt/mj/5E05l9+O4o8ePx67HFqyC+qSSnyselqjZGaVK2TadbFLPWAQ4NBhHqDCCV7OTpo34AlSSylPtIdd2AJZlyzYQrDJ5lcWGNceD80CunPLGGzsfD+7wRb95NevJI5docQ3tgCyr5bGnyaPRlmwNsFELViOOx9loebGNq2moDOKpHLVP5al2cymWHbkfzGXL7kfRl44H9wZy33tvt+PB/Xnf93e+nh5ZlU18wCiRUa9m7kib9LYuOk+hudQNbxwm0AQqbfloimaB2lM5fChex+ylMwuTbfmXQtmWlenZljbdXTLuOxjI/fDDHY4Hjx8/Hrse0zXfPFxbUN1kKqSCCSk50m0Ajtx3ub9XHBKHXESb8iO6E+qGytF4nO0OG3SXzbJlhxBnKtKyl0NwybjvYCD30aMdjgePHz8eu56SVTBbgxJMliQ3Oauwg0QHxXE2Ez/EIReLdQj42Gzb4CLS0YJD9xUx7bsi0vJi5mUbW1QzL0h0PFk17rtiIPfJk52MB48fPx67npJJwyrBa2RCCQRTbGZSPCxTPOiND4G2pYyOQ4h4jINIJh5wFU1NFZt+IsZ59LSnDqBjZ2awbOku+yInunLcd8VA7rNnOxkPHj9+PGY9B0MWJJNozOJmlglvDMXDEozdhQWbgs/U6oBanGzLrdSNNnZFjOkmbi5bNt1lX7JLLhn3vXAg9/h4y/Hg8ePHI9dzQMEkWCgdRfYykYKnkP7D4rIujsujaKPBsB54vE2TS00ccvFY/Tth7JXeq1hz+qgVy04sAJawTsvOknHfCwdyT062HA8eP348Zj0vdoXF4pilKa2BROed+9fyw9rWRXeTFXESMOanvDZfJuJaSXouQdMdDJZtekZcLLvEeK04d8m474UDuaenW44Hjx8/Xns9YYqZpszGWB3AN/4VHw+k7WSFtJ3Qicuqb/NlVmgXWsxh570xg2UwxUw3WfO6B5nOuO8aA7lnZxuPB48fPx6znm1i4bsfcbaptF3zNT78eFPtwi1OaCNOqp1x3zUGcs/PN++AGD1+fMXrSVm2baTtPhPahbPhA71wIHd2bXzRa69nG+3CraTtPivahV/55tXWg8fyRY/9AdsY8VbSdp8V7cKrrgdfM//z6ILQFtJ2nxHtwmuoB4/kf74+gLeRtvvMaBdeSz34+vifx0YG20jbfTa0C6+tHrwe//NmOG0L8EbSdp8R7cLrrQe/996O+ai3ujQOskpTNULa7jOjXXj99eCd8lHvoFiwsbTdZ0a78PrrwTvlo966pLuRtB2fFe3Cm6oHP9kNH/W2FryxtN1nTLvwRurBO+Kj3pWXHidtx2dFu/Bm68Fb81HvykuPlrb7LGkX3mw9eGs+6h1Y8MbSdjegXcguQLjmevDpTQLMxtJ2N6NdyBZu9AbrwVvwUW+LbteULUpCdqm0HTelXbhNPe8G68Gb8lFvVfYfSNuxvrTdTWoXbozAzdaDZzfkorOj1oxVxlIMlpSIlpLrt8D4hrQL17z+c3h6hU/wv4Q/utps4+bm+6P/hIcf0JwQ5oQGPBL0eKPTYEXTW+eL/2DKn73J9BTXYANG57hz1cEMviVf/4tf5b/6C5pTQkMIWoAq7hTpOJjtAM4pxKu5vg5vXeUrtI09/Mo/5H+4z+Mp5xULh7cEm2QbRP2tFIKR7WM3fPf/jZ3SWCqLM2l4NxID5zB72HQXv3jj/8mLR5xXNA5v8EbFQEz7PpRfl1+MB/hlAN65qgDn3wTgH13hK7T59bmP+NIx1SHHU84nLOITt3iVz8mNO+lPrjGAnBFqmioNn1mTyk1ta47R6d4MrX7tjrnjYUpdUbv2rVr6YpVfsGG58AG8Ah9eyUN8CX4WfgV+G8LVWPDGb+Zd4cU584CtqSbMKxauxTg+dyn/LkVgA+IR8KHtejeFKRtTmLLpxN6mYVLjYxwXf5x2VofiZcp/lwKk4wGOpYDnoIZPdg/AAbwMfx0+ge9dgZvYjuqKe4HnGnykYo5TvJbG0Vj12JagRhwKa44H95ShkZa5RyLGGdfYvG7aw1TsF6iapPAS29mNS3NmsTQZCmgTzFwgL3upCTgtBTRwvGMAKrgLn4evwin8+afJRcff+8izUGUM63GOOuAs3tJkw7J4kyoNreqrpO6cYLQeFUd7TTpr5YOTLc9RUUogUOVJQ1GYJaFLAW0oTmKyYS46ZooP4S4EON3xQ5zC8/CX4CnM4c1PE8ApexpoYuzqlP3d4S3OJP8ZDK7cKWNaTlqmgDiiHwl1YsE41w1zT4iRTm3DBqxvOUsbMKKDa/EHxagtnta072ejc3DOIh5ojvh8l3tk1JF/AV6FU6jh3U8HwEazLgdCLYSQ+MYiAI2ltomkzttUb0gGHdSUUgsIYjTzLG3mObX4FBRaYtpDVNZrih9TgTeYOBxsEnN1gOCTM8Bsw/ieMc75w9kuAT6A+/AiHGvN/+Gn4KRkiuzpNNDYhDGFndWRpE6SVfm8U5bxnSgVV2jrg6JCKmneqey8VMFgq2+AM/i4L4RUbfSi27lNXZ7R7W9RTcq/q9fk4Xw3AMQd4I5ifAZz8FcVtm9SAom/dyN4lczJQW/kC42ZrHgcCoIf1oVMKkVItmMBi9cOeNHGLqOZk+QqQmrbc5YmYgxELUUN35z2iohstgfLIFmcMV7s4CFmI74L9+EFmGsi+tGnAOD4Yk9gIpo01Y4cA43BWGygMdr4YZekG3OBIUXXNukvJS8tqa06e+lSDCtnqqMFu6hWHXCF+WaYt64m9QBmNxi7Ioy7D+fa1yHw+FMAcPt7SysFLtoG4PXAk7JOA3aAxBRqUiAdU9Yp5lK3HLSRFtOim0sa8euEt08xvKjYjzeJ2GU7YawexrnKI9tmobInjFXCewpwriY9+RR4aaezFhMhGCppKwom0ChrgFlKzyPKkGlTW1YQrE9HJqu8hKGgMc6hVi5QRq0PZxNfrYNgE64utmRv6KKHRpxf6VDUaOvNP5jCEx5q185My/7RKz69UQu2im5k4/eownpxZxNLwiZ1AZTO2ZjWjkU9uaB2HFn6Q3u0JcsSx/qV9hTEApRzeBLDJQXxYmTnq7bdLa3+uqFrxLJ5w1TehnNHx5ECvCh2g2c3hHH5YsfdaSKddztfjQ6imKFGSyFwlLzxEGPp6r5IevVjk1AMx3wMqi1NxDVjLBiPs9tbsCkIY5we5/ML22zrCScFxnNtzsr9Wcc3CnD+pYO+4VXXiDE0oc/vQQ/fDK3oPESJMYXNmJa/DuloJZkcTpcYE8lIH8Dz8DJMiynNC86Mb2lNaaqP/+L7f2fcE/yP7/Lde8xfgSOdMxvOixZf/9p3+M4hT1+F+zApxg9XfUvYjc8qX2lfOOpK2gNRtB4flpFu9FTKCp2XJRgXnX6olp1zyYjTKJSkGmLE2NjUr1bxFM4AeAAHBUFIeSLqXR+NvH/M9fOnfHzOD2vCSyQJKzfgsCh+yi/Mmc35F2fUrw7miW33W9hBD1vpuUojFphIyvg7aTeoymDkIkeW3XLHmguMzbIAJejN6B5MDrhipE2y6SoFRO/AK/AcHHZHNIfiWrEe/C6cr3f/yOvrQKB+zMM55/GQdLDsR+ifr5Fiuu+/y+M78LzOE5dsNuXC3PYvYWd8NXvphLSkJIasrlD2/HOqQ+RjcRdjKTGWYhhVUm4yxlyiGPuMsZR7sMCHUBeTuNWA7if+ifXgc/hovftHXs/DV+Fvwe+f8shzMiMcweFgBly3//vwJfg5AN4450fn1Hd1Rm1aBLu22Dy3y3H2+OqMemkbGZ4jozcDjJf6596xOLpC0eMTHbKnxLxH27uZ/bMTGs2jOaMOY4m87CfQwF0dw53oa1k80JRuz/XgS+8fX3N9Af4qPIMfzKgCp4H5TDGe9GGeFPzSsZz80SlPTxXjgwJmC45njzgt2vbQ4b4OAdUK4/vWhO8d8v6EE8fMUsfakXbPpFJeLs2ubM/qdm/la3WP91uWhxXHjoWhyRUq2iJ/+5mA73zwIIo+LoZ/SgvIRjAd1IMvvn98PfgOvAJfhhm8scAKVWDuaRaK8aQ9f7vuPDH6Bj47ZXau7rqYJ66mTDwEDU6lLbCjCK0qTXyl5mnDoeNRxanj3FJbaksTk0faXxHxLrssgPkWB9LnA/MFleXcJozzjwsUvUG0X/QCve51qkMDXp9mtcyOy3rwBfdvVJK7D6/ACSzg3RoruIq5UDeESfEmVclDxnniU82vxMLtceD0hGZWzBNPMM/jSPne2OVatiTKUpY5vY7gc0LdUAWeWM5tH+O2I66AOWw9xT2BuyRVLGdoDHUsVRXOo/c+ZdRXvFfnxWyIV4upFLCl9eAL7h8Zv0QH8Ry8pA2cHzQpGesctVA37ZtklBTgHjyvdSeKY/RZw/kJMk0Y25cSNRWSigQtlULPTw+kzuJPeYEkXjQRpoGZobYsLF79pyd1dMRHInbgFTZqNLhDqiIsTNpoex2WLcy0/X6rHcdMMQvFSd5dWA++4P7xv89deACnmr36uGlL69bRCL6BSZsS6c0TU2TKK5gtWCzgAOOwQcurqk9j8whvziZSMLcq5hbuwBEsYjopUBkqw1yYBGpLA97SRElEmx5MCInBY5vgLk94iKqSWmhIGmkJ4Bi9m4L645J68LyY4wsFYBfUg5feP/6gWWm58IEmKQM89hq7KsZNaKtP5TxxrUZZVkNmMJtjbKrGxLNEbHPJxhqy7lAmbC32ZqeF6lTaknRWcYaFpfLUBh/rwaQycCCJmW15Kstv6jRHyJFry2C1ahkkIW0LO75s61+owxK1y3XqweX9m5YLM2DPFeOjn/iiqCKJ+yKXF8t5Yl/kNsqaSCryxPq5xWTFIaP8KSW0RYxqupaUf0RcTNSSdJZGcKYdYA6kdtrtmyBckfKXwqk0pHpUHlwWaffjNRBYFPUDWa8e3Lt/o0R0CdisKDM89cX0pvRHEfM8ca4t0s2Xx4kgo91MPQJ/0c9MQYq0co8MBh7bz1fio0UUHLR4aAIOvOmoYO6kwlEVODSSTliWtOtH6sPkrtctF9ZtJ9GIerBskvhdVS5cFNv9s1BU0AbdUgdK4FG+dRnjFmDTzniRMdZO1QhzMK355vigbdkpz9P6qjUGE5J2qAcXmwJ20cZUiAD0z+pGMx6xkzJkmEf40Hr4qZfVg2XzF9YOyoV5BjzVkUJngKf8lgNYwKECEHrCNDrWZzMlflS3yBhr/InyoUgBc/lKT4pxVrrC6g1YwcceK3BmNxZcAtz3j5EIpqguh9H6wc011YN75cKDLpFDxuwkrPQmUwW4KTbj9mZTwBwLq4aQMUZbHm1rylJ46dzR0dua2n3RYCWZsiHROeywyJGR7mXKlpryyCiouY56sFkBWEnkEB/raeh/Sw4162KeuAxMQpEkzy5alMY5wamMsWKKrtW2WpEWNnReZWONKWjrdsKZarpFjqCslq773PLmEhM448Pc3+FKr1+94vv/rfw4tEcu+lKTBe4kZSdijBrykwv9vbCMPcLQTygBjzVckSLPRVGslqdunwJ4oegtFOYb4SwxNgWLCmD7T9kVjTv5YDgpo0XBmN34Z/rEHp0sgyz7lngsrm4lvMm2Mr1zNOJYJ5cuxuQxwMGJq/TP5emlb8fsQBZviK4t8hFL+zbhtlpwaRSxQRWfeETjuauPsdGxsBVdO7nmP4xvzSoT29pRl7kGqz+k26B3Oy0YNV+SXbbQas1ctC/GarskRdFpKczVAF1ZXnLcpaMuzVe6lZ2g/1ndcvOVgRG3sdUAY1bKD6achijMPdMxV4muKVorSpiDHituH7rSTs7n/4y5DhRXo4FVBN4vO/zbAcxhENzGbHCzU/98Mcx5e7a31kWjw9FCe/zNeYyQjZsWb1uc7U33pN4Mji6hCLhivqfa9Ss6xLg031AgfesA/l99m9fgvnaF9JoE6bYKmkGNK3aPbHB96w3+DnxFm4hs0drLsk7U8kf/N/CvwQNtllna0rjq61sH8L80HAuvwH1tvBy2ChqWSCaYTaGN19sTvlfzFD6n+iKTbvtayfrfe9ueWh6GJFoxLdr7V72a5ZpvHcCPDzma0wTO4EgbLyedxstO81n57LYBOBzyfsOhUKsW1J1BB5vr/tz8RyqOFylQP9Tvst2JALsC5lsH8PyQ40DV4ANzYa4dedNiKNR1s+x2wwbR7q4/4cTxqEk4LWDebfisuo36JXLiWFjOtLrlNWh3K1rRS4xvHcDNlFnNmWBBAl5SWaL3oPOfnvbr5pdjVnEaeBJSYjuLEkyLLsWhKccadmOphZkOPgVdalj2QpSmfOsADhMWE2ZBu4+EEJI4wKTAuCoC4xwQbWXBltpxbjkXJtKxxabo9e7tyhlgb6gNlSbUpMh+l/FaqzVwewGu8BW1Zx7pTpQDJUjb8tsUTW6+GDXbMn3mLbXlXJiGdggxFAoUrtPS3wE4Nk02UZG2OOzlk7fRs7i95QCLo3E0jtrjnM7SR3uS1p4qtS2nJ5OwtQVHgOvArLBFijZUV9QtSl8dAY5d0E0hM0w3HS2DpIeB6m/A1+HfhJcGUq4sOxH+x3f5+VO+Ds9rYNI7zPXOYWPrtf8bYMx6fuOAX5jzNR0PdsuON+X1f7EERxMJJoU6GkTEWBvVolVlb5lh3tKCg6Wx1IbaMDdJ+9sUCc5KC46hKGCk3IVOS4TCqdBNfUs7Kd4iXf2RjnT/LLysJy3XDcHLh/vde3x8DoGvwgsa67vBk91G5Pe/HbOe7xwym0NXbtiuuDkGO2IJDh9oQvJ4cY4vdoqLDuoH9Zl2F/ofsekn8lkuhIlhQcffUtSjytFyp++p6NiE7Rqx/lodgKVoceEp/CP4FfjrquZaTtj2AvH5K/ywpn7M34K/SsoYDAdIN448I1/0/wveW289T1/lX5xBzc8N5IaHr0XMOQdHsIkDuJFifj20pBm5jzwUv9e2FhwRsvhAbalCIuIw3bhJihY3p6nTFFIZgiSYjfTf3aXuOjmeGn4bPoGvwl+CFzTRczBIuHBEeImHc37/lGfwZR0cXzVDOvaKfNHvwe+suZ771K/y/XcBlsoN996JpBhoE2toYxOznNEOS5TJc6Id5GEXLjrWo+LEWGNpPDU4WAwsIRROu+1vM+0oW37z/MBN9kqHnSArwPfgFJ7Cq/Ai3Ie7g7ncmI09v8sjzw9mzOAEXoIHxURueaAce5V80f/DOuuZwHM8vsMb5wBzOFWM7wymTXPAEvm4vcFpZ2ut0VZRjkiP2MlmLd6DIpbGSiHOjdnUHN90hRYmhTnmvhzp1iKDNj+b7t5hi79lWGwQ+HN9RsfFMy0FXbEwhfuczKgCbyxYwBmcFhhvo/7a44v+i3XWcwDP86PzpGQYdWh7csP5dBvZ1jNzdxC8pBGuxqSW5vw40nBpj5JhMwvOzN0RWqERHMr4Lv1kWX84xLR830G3j6yqZ1a8UstTlW+qJPOZ+sZ7xZPKTJLhiNOAFd6tk+jrTH31ncLOxid8+nzRb128HhUcru/y0Wn6iT254YPC6FtVSIMoW2sk727AhvTtrWKZTvgsmckfXYZWeNRXx/3YQ2OUxLDrbHtN11IwrgXT6c8dATDwLniYwxzO4RzuQqTKSC5gAofMZ1QBK3zQ4JWobFbcvJm87FK+6JXrKahLn54m3p+McXzzYtP8VF/QpJuh1OwieElEoI1pRxPS09FBrkq2tWCU59+HdhNtTIqKm8EBrw2RTOEDpG3IKo2Y7mFdLm3ZeVjYwVw11o/oznceMve4CgMfNym/utA/d/ILMR7gpXzRy9eDsgLcgbs8O2Va1L0zzIdwGGemTBuwROHeoMShkUc7P+ISY3KH5ZZeWqO8mFTxQYeXTNuzvvK5FGPdQfuu00DwYFY9dyhctEt+OJDdnucfpmyhzUJzfsJjr29l8S0bXBfwRS9ZT26tmMIdZucch5ZboMz3Nio3nIOsYHCGoDT4kUA9MiXEp9Xsui1S8th/kbWIrMBxDGLodWUQIWcvnXy+9M23xPiSMOiRPqM+YMXkUN3gXFrZJwXGzUaMpJfyRS9ZT0lPe8TpScuRlbMHeUmlaKDoNuy62iWNTWNFYjoxFzuJs8oR+RhRx7O4SVNSXpa0ZJQ0K1LAHDQ+D9IepkMXpcsq5EVCvClBUIzDhDoyKwDw1Lc59GbTeORivugw1IcuaEOaGWdNm+Ps5fQ7/tm0DjMegq3yM3vb5j12qUId5UZD2oxDSEWOZMSqFl/W+5oynWDa/aI04tJRQ2eTXusg86SQVu/nwSYwpW6wLjlqIzwLuxGIvoAvul0PS+ZNz0/akp/pniO/8JDnGyaCkzbhl6YcqmK/69prxPqtpx2+Km9al9sjL+rwMgHw4jE/C8/HQ3m1vBuL1fldbzd8mOueVJ92syqdEY4KJjSCde3mcRw2TA6szxedn+zwhZMps0XrqEsiUjnC1hw0TELC2Ek7uAAdzcheXv1BYLagspxpzSAoZZUsIzIq35MnFQ9DOrlNB30jq3L4pkhccKUAA8/ocvN1Rzx9QyOtERs4CVsJRK/DF71kPYrxYsGsm6RMh4cps5g1DOmM54Ly1ii0Hd3Y/BMk8VWFgBVmhqrkJCPBHAolwZaWzLR9Vb7bcWdX9NyUYE+uB2BKfuaeBUcjDljbYVY4DdtsVWvzRZdWnyUzDpjNl1Du3aloAjVJTNDpcIOVVhrHFF66lLfJL1zJr9PQ2nFJSBaKoDe+sAvLufZVHVzYh7W0h/c6AAZ+7Tvj6q9j68G/cTCS/3n1vLKHZwNi+P+pS0WkZNMBMUl+LDLuiE4omZy71r3UFMwNJV+VJ/GC5ixVUkBStsT4gGKh0Gm4Oy3qvq7Lbmq24nPdDuDR9deR11XzP4vFu3TYzfnIyiSVmgizUYGqkIXNdKTY9pgb9D2Ix5t0+NHkVzCdU03suWkkVZAoCONCn0T35gAeW38de43mf97sMOpSvj4aa1KYUm58USI7Wxxes03bAZdRzk6UtbzMaCQ6IxO0dy7X+XsjoD16hpsBeGz9dfzHj+R/Hp8nCxZRqkEDTaCKCSywjiaoMJ1TITE9eg7Jqnq8HL6gDwiZb0u0V0Rr/rmvqjxKuaLCX7ZWXTvAY+uvm3z8CP7nzVpngqrJpZKwWnCUjIviYVlirlGOzPLI3SMVyp/elvBUjjDkNhrtufFFErQ8pmdSlbK16toBHlt/HV8uHMX/vEGALkV3RJREiSlopxwdMXOZPLZ+ix+kAHpMKIk8UtE1ygtquttwxNhphrIZ1IBzjGF3IIGxGcBj6q8bHJBG8T9vdsoWrTFEuebEZuVxhhClH6P5Zo89OG9fwHNjtNQTpD0TG9PJLEYqvEY6Rlxy+ZZGfL0Aj62/bnQCXp//eeM4KzfQVJbgMQbUjlMFIm6TpcfWlZje7NBSV6IsEVmumWIbjiloUzQX9OzYdo8L1wjw2PrrpimONfmfNyzKklrgnEkSzT5QWYQW40YShyzqsRmMXbvVxKtGuYyMKaU1ugenLDm5Ily4iT14fP11Mx+xJv+zZ3MvnfdFqxU3a1W/FTB4m3Qfsyc1XUcdVhDeUDZXSFHHLQj/Y5jtC7ZqM0CXGwB4bP11i3LhOvzPGygYtiUBiwQV/4wFO0majijGsafHyRLu0yG6q35cL1rOpVxr2s5cM2jJYMCdc10Aj6q/blRpWJ//+dmm5psMl0KA2+AFRx9jMe2WbC4jQxnikd4DU8TwUjRVacgdlhmr3bpddzuJ9zXqr2xnxJfzP29RexdtjDVZqzkqa6PyvcojGrfkXiJ8SEtml/nYskicv0ivlxbqjemwUjMw5evdg8fUX9nOiC/lf94Q2i7MURk9nW1MSj5j8eAyV6y5CN2S6qbnw3vdA1Iwq+XOSCl663udN3IzLnrt+us25cI1+Z83SXQUldqQq0b5XOT17bGpLd6ssN1VMPf8c+jG8L3NeCnMdF+Ra3fRa9dft39/LuZ/3vwHoHrqGmQFafmiQw6eyzMxS05K4bL9uA+SKUQzCnSDkqOGokXyJvbgJ/BHI+qvY69//4rl20NsmK2ou2dTsyIALv/91/8n3P2Aao71WFGi8KKv1fRC5+J67Q/507/E/SOshqN5TsmYIjVt+kcjAx98iz/4SaojbIV1rexE7/C29HcYD/DX4a0rBOF5VTu7omsb11L/AWcVlcVZHSsqGuXLLp9ha8I//w3Mv+T4Ew7nTBsmgapoCrNFObIcN4pf/Ob/mrvHTGqqgAupL8qWjWPS9m/31jAe4DjA+4+uCoQoT/zOzlrNd3qd4SdphFxsUvYwGWbTWtISc3wNOWH+kHBMfc6kpmpwPgHWwqaSUG2ZWWheYOGQGaHB+eQ/kn6b3pOgLV+ODSn94wDvr8Bvb70/LLuiPPEr8OGVWfDmr45PZyccEmsVXZGe1pRNX9SU5+AVQkNTIVPCHF/jGmyDC9j4R9LfWcQvfiETmgMMUCMN1uNCakkweZsowdYobiMSlnKA93u7NzTXlSfe+SVbfnPQXmg9LpYAQxpwEtONyEyaueWM4FPjjyjG3uOaFmBTWDNgBXGEiQpsaWhnAqIijB07Dlsy3fUGeP989xbWkyf+FF2SNEtT1E0f4DYYVlxFlbaSMPIRMk/3iMU5pME2SIWJvjckciebkQuIRRyhUvkHg/iUljG5kzVog5hV7vIlCuBrmlhvgPfNHQM8lCf+FEGsYbMIBC0qC9a0uuy2wLXVbLBaP5kjHokCRxapkQyzI4QEcwgYHRZBp+XEFTqXFuNVzMtjXLJgX4gAid24Hjwc4N3dtVSe+NNiwTrzH4WVUOlDobUqr1FuAgYllc8pmzoVrELRHSIW8ViPxNy4xwjBpyR55I6J220qQTZYR4guvUICJiSpr9gFFle4RcF/OMB7BRiX8sSfhpNSO3lvEZCQfLUVTKT78Ek1LRLhWN+yLyTnp8qWUZ46b6vxdRGXfHVqx3eI75YaLa4iNNiK4NOW7wPW6lhbSOF9/M9qw8e/aoB3d156qTzxp8pXx5BKAsYSTOIIiPkp68GmTq7sZtvyzBQaRLNxIZ+paozHWoLFeExIhRBrWitHCAHrCF7/thhD8JhYz84wg93QRV88wLuLY8zF8sQ36qF1J455bOlgnELfshKVxYOXKVuKx0jaj22sczTQqPqtV/XDgpswmGTWWMSDw3ssyUunLLrVPGjYRsH5ggHeHSWiV8kT33ycFSfMgkoOK8apCye0J6VW6GOYvffgU9RWsukEi2kUV2nl4dOYUzRik9p7bcA4ggdJ53LxKcEe17B1R8eqAd7dOepV8sTXf5lhejoL85hUdhDdknPtKHFhljOT+bdq0hxbm35p2nc8+Ja1Iw+tJykgp0EWuAAZYwMVwac5KzYMslhvgHdHRrxKnvhTYcfKsxTxtTETkjHO7rr3zjoV25lAQHrqpV7bTiy2aXMmUhTBnKS91jhtR3GEoF0oLnWhWNnYgtcc4N0FxlcgT7yz3TgNIKkscx9jtV1ZKpWW+Ub1tc1eOv5ucdgpx+FJy9pgbLE7xDyXb/f+hLHVGeitHOi6A7ybo3sF8sS7w7cgdk0nJaOn3hLj3uyD0Zp5pazFIUXUpuTTU18d1EPkDoX8SkmWTnVIozEdbTcZjoqxhNHf1JrSS/AcvHjZ/SMHhL/7i5z+POsTUh/8BvNfYMTA8n+yU/MlTZxSJDRStqvEuLQKWwDctMTQogUDyQRoTQG5Kc6oQRE1yV1jCA7ri7jdZyK0sYTRjCR0Hnnd+y7nHxNgTULqw+8wj0mQKxpYvhjm9uSUxg+TTy7s2GtLUGcywhXSKZN275GsqlclX90J6bRI1aouxmgL7Q0Nen5ziM80SqMIo8cSOo+8XplT/5DHNWsSUr/6lLN/QQ3rDyzLruEW5enpf7KqZoShEduuSFOV7DLX7Ye+GmXb6/hnNNqKsVXuMDFpb9Y9eH3C6NGEzuOuI3gpMH/I6e+zDiH1fXi15t3vA1czsLws0TGEtmPEJdiiFPwlwKbgLHAFk4P6ZyPdymYYHGE0dutsChQBl2JcBFlrEkY/N5bQeXQ18gjunuMfMfsBlxJSx3niO485fwO4fGD5T/+3fPQqkneWVdwnw/3bMPkW9Wbqg+iC765Zk+xcT98ibKZc2EdgHcLoF8cSOo/Oc8fS+OyEULF4g4sJqXVcmfMfsc7A8v1/yfGXmL9I6Fn5pRwZhsPv0TxFNlAfZCvG+Oohi82UC5f/2IsJo0cTOm9YrDoKhFPEUr/LBYTUNht9zelHXDqwfPCIw4owp3mOcIQcLttWXFe3VZ/j5H3cIc0G6oPbCR+6Y2xF2EC5cGUm6wKC5tGEzhsWqw5hNidUiKX5gFWE1GXh4/Qplw4sVzOmx9QxU78g3EF6wnZlEN4FzJ1QPSLEZz1KfXC7vd8ssGdIbNUYpVx4UapyFUHzJoTOo1McSkeNn1M5MDQfs4qQuhhX5vQZFw8suwWTcyYTgioISk2YdmkhehG4PkE7w51inyAGGaU+uCXADabGzJR1fn3lwkty0asIo8cROm9Vy1g0yDxxtPvHDAmpu+PKnM8Ix1wwsGw91YJqhteaWgjYBmmQiebmSpwKKzE19hx7jkzSWOm66oPbzZ8Yj6kxVSpYjVAuvLzYMCRo3oTQecOOjjgi3NQ4l9K5/hOGhNTdcWVOTrlgYNkEXINbpCkBRyqhp+LdRB3g0OU6rMfW2HPCFFMV9nSp+uB2woepdbLBuJQyaw/ZFysXrlXwHxI0b0LovEkiOpXGA1Ijagf+KUNC6rKNa9bQnLFqYNkEnMc1uJrg2u64ELPBHpkgWbmwKpJoDhMwNbbGzAp7Yg31wS2T5rGtzit59PrKhesWG550CZpHEzpv2NGRaxlNjbMqpmEIzygJqQfjypycs2pg2cS2RY9r8HUqkqdEgKTWtWTKoRvOBPDYBltja2SO0RGjy9UHtxwRjA11ujbKF+ti5cIR9eCnxUg6owidtyoU5tK4NLji5Q3HCtiyF2IqLGYsHViOXTXOYxucDqG0HyttqYAKqYo3KTY1ekyDXRAm2AWh9JmsVh/ccg9WJ2E8YjG201sPq5ULxxX8n3XLXuMInbft2mk80rRGjCGctJ8/GFdmEQ9Ug4FlE1ll1Y7jtiraqm5Fe04VV8lvSVBL8hiPrfFVd8+7QH3Qbu2ipTVi8cvSGivc9cj8yvH11YMHdNSERtuOslM97feYFOPKzGcsI4zW0YGAbTAOaxCnxdfiYUmVWslxiIblCeAYr9VYR1gM7GmoPrilunSxxeT3DN/2eBQ9H11+nk1adn6VK71+5+Jfct4/el10/7KBZfNryUunWSCPxPECk1rdOv1WVSrQmpC+Tl46YD3ikQYcpunSQgzVB2VHFhxHVGKDgMEY5GLlQnP7FMDzw7IacAWnO6sBr12u+XanW2AO0wQ8pknnFhsL7KYIqhkEPmEXFkwaN5KQphbkUmG72wgw7WSm9RiL9QT925hkjiVIIhphFS9HKI6/8QAjlpXqg9W2C0apyaVDwKQwrwLY3j6ADR13ZyUNByQXHQu6RY09Hu6zMqXRaNZGS/KEJs0cJEe9VH1QdvBSJv9h09eiRmy0V2uJcqHcShcdvbSNg5fxkenkVprXM9rDVnX24/y9MVtncvbKY706anNl3ASll9a43UiacVquXGhvq4s2FP62NGKfQLIQYu9q1WmdMfmUrDGt8eDS0cXozH/fjmUH6Jruvm50hBDSaEU/2Ru2LEN/dl006TSc/g7tfJERxGMsgDUEr104pfWH9lQaN+M4KWQjwZbVc2rZVNHsyHal23wZtIs2JJqtIc/WLXXRFCpJkfE9jvWlfFbsNQ9pP5ZBS0zKh4R0aMFj1IjTcTnvi0Zz2rt7NdvQb2mgbju1plsH8MmbnEk7KbK0b+wC2iy3aX3szW8xeZvDwET6hWZYwqTXSSG+wMETKum0Dq/q+x62gt2ua2ppAo309TRk9TPazfV3qL9H8z7uhGqGqxNVg/FKx0HBl9OVUORn8Q8Jx9gFttGQUDr3tzcXX9xGgN0EpzN9mdZ3GATtPhL+CjxFDmkeEU6x56kqZRusLzALXVqkCN7zMEcqwjmywDQ6OhyUe0Xao1Qpyncrg6wKp9XfWDsaZplElvQ/b3sdweeghorwBDlHzgk1JmMc/wiERICVy2VJFdMjFuLQSp3S0W3+sngt2njwNgLssFGVQdJ0tu0KH4ky1LW4yrbkuaA6Iy9oz/qEMMXMMDWyIHhsAyFZc2peV9hc7kiKvfULxCl9iddfRK1f8kk9qvbdOoBtOg7ZkOZ5MsGrSHsokgLXUp9y88smniwWyuFSIRVmjplga3yD8Uij5QS1ZiM4U3Qw5QlSm2bXjFe6jzzBFtpg+/YBbLAWG7OPynNjlCw65fukGNdkJRf7yM1fOxVzbxOJVocFoYIaGwH22mIQkrvu1E2nGuebxIgW9U9TSiukPGU+Lt++c3DJPKhyhEEbXCQLUpae2exiKy6tMPe9mDRBFCEMTWrtwxN8qvuGnt6MoihKWS5NSyBhbH8StXoAz8PLOrRgLtOT/+4vcu+7vDLnqNvztOq7fmd8sMmY9Xzn1zj8Dq8+XVdu2Nv0IIySgEdQo3xVHps3Q5i3fLFsV4aiqzAiBhbgMDEd1uh8qZZ+lwhjkgokkOIv4xNJmyncdfUUzgB4oFMBtiu71Xumpz/P+cfUP+SlwFExwWW62r7b+LSPxqxn/gvMZ5z9C16t15UbNlq+jbGJtco7p8wbYlL4alSyfWdeuu0j7JA3JFNuVAwtst7F7FhWBbPFNKIUORndWtLraFLmMu7KFVDDOzqkeaiN33YAW/r76wR4XDN/yN1z7hejPau06EddkS/6XThfcz1fI/4K736fO48vlxt2PXJYFaeUkFS8U15XE3428xdtn2kc8GQlf1vkIaNRRnOMvLTWrZbElEHeLWi1o0dlKPAh1MVgbbVquPJ5+Cr8LU5/H/+I2QlHIU2ClXM9G8v7Rr7oc/hozfUUgsPnb3D+I+7WF8kNO92GY0SNvuxiE+2Bt8prVJTkzE64sfOstxuwfxUUoyk8VjcTlsqe2qITSFoSj6Epd4KsT6BZOWmtgE3hBfir8IzZDwgV4ZTZvD8VvPHERo8v+vL1DASHTz/i9OlKueHDjK5Rnx/JB1Vb1ioXdBra16dmt7dgik10yA/FwJSVY6XjA3oy4SqM2frqDPPSRMex9qs3XQtoWxMj7/Er8GWYsXgjaVz4OYumP2+9kbxvny/6kvWsEBw+fcb5bInc8APdhpOSs01tEqIkoiZjbAqKMruLbJYddHuHFRIyJcbdEdbl2sVLaySygunutBg96Y2/JjKRCdyHV+AEFtTvIpbKIXOamknYSiB6KV/0JetZITgcjjk5ZdaskBtWO86UF0ap6ozGXJk2WNiRUlCPFir66lzdm/SLSuK7EUdPz8f1z29Skq6F1fXg8+5UVR6bszncP4Tn4KUkkdJ8UFCY1zR1i8RmL/qQL3rlei4THG7OODlnKko4oI01kd3CaM08Ia18kC3GNoVaO9iDh+hWxSyTXFABXoau7Q6q9OxYg/OVEMw6jdbtSrJ9cBcewGmaZmg+bvkUnUUaGr+ZfnMH45Ivevl61hMcXsxYLFTu1hTm2zViCp7u0o5l+2PSUh9bDj6FgYypufBDhqK2+oXkiuHFHR3zfj+9PtA8oR0xnqX8qn+sx3bFODSbbF0X8EUvWQ8jBIcjo5bRmLOljDNtcqNtOe756h3l0VhKa9hDd2l1eqmsnh0MNMT/Cqnx6BInumhLT8luljzQ53RiJeA/0dxe5NK0o2fA1+GLXr6eNQWHNUOJssQaTRlGpLHKL9fD+IrQzTOMZS9fNQD4AnRNVxvTdjC+fJdcDDWQcyB00B0t9BDwTxXgaAfzDZ/DBXzRnfWMFRwuNqocOmX6OKNkY63h5n/fFcB28McVHqnXZVI27K0i4rDLNE9lDKV/rT+udVbD8dFFu2GGZ8mOt0kAXcoX3ZkIWVtw+MNf5NjR2FbivROHmhV1/pj2egv/fMGIOWTIWrV3Av8N9imV9IWml36H6cUjqEWNv9aNc+veb2sH46PRaHSuMBxvtW+twxctq0z+QsHhux8Q7rCY4Ct8lqsx7c6Sy0dl5T89rIeEuZKoVctIk1hNpfavER6yyH1Vvm3MbsUHy4ab4hWr/OZPcsRBphnaV65/ZcdYPNNwsjN/djlf9NqCw9U5ExCPcdhKxUgLSmfROpLp4WSUr8ojdwbncbvCf+a/YzRaEc6QOvXcGO256TXc5Lab9POvB+AWY7PigWYjzhifbovuunzRawsO24ZqQQAqguBtmpmPB7ysXJfyDDaV/aPGillgz1MdQg4u5MYaEtBNNHFjkRlSpd65lp4hd2AVPTfbV7FGpyIOfmNc/XVsPfg7vzaS/3nkvLL593ANLvMuRMGpQIhiF7kUEW9QDpAUbTWYBcbp4WpacHHY1aacqQyjGZS9HI3yCBT9kUZJhVOD+zUDvEH9ddR11fzPcTDQ5TlgB0KwqdXSavk9BC0pKp0WmcuowSw07VXmXC5guzSa4p0UvRw2lbDiYUx0ExJJRzWzi6Gm8cnEkfXXsdcG/M/jAJa0+bmCgdmQ9CYlNlSYZOKixmRsgiFxkrmW4l3KdFKv1DM8tk6WxPYJZhUUzcd8Kdtgrw/gkfXXDT7+avmfVak32qhtkg6NVdUS5wgkru1YzIkSduTW1FDwVWV3JQVJVuieTc0y4iDpFwc7/BvSalvKdQM8sv662cevz/+8sQVnjVAT0W2wLllw1JiMhJRxgDjCjLQsOzSFSgZqx7lAW1JW0e03yAD3asC+GD3NbQhbe+mN5GXH1F83KDOM4n/e5JIuH4NpdQARrFPBVptUNcjj4cVMcFSRTE2NpR1LEYbYMmfWpXgP9KejaPsLUhuvLCsVXznAG9dfx9SR1ud/3hZdCLHb1GMdPqRJgqDmm76mHbvOXDtiO2QPUcKo/TWkQ0i2JFXpBoo7vij1i1Lp3ADAo+qvG3V0rM//vFnnTE4hxd5Ka/Cor5YEdsLVJyKtDgVoHgtW11pWSjolPNMnrlrVj9Fv2Qn60twMwKPqr+N/wvr8z5tZcDsDrv06tkqyzESM85Ycv6XBWA2birlNCXrI6VbD2lx2L0vQO0QVTVVLH4SE67fgsfVXv8n7sz7/85Z7cMtbE6f088wSaR4kCkCm10s6pKbJhfqiUNGLq+0gLWC6eUAZFPnLjwqtKd8EwGvWX59t7iPW4X/eAN1svgRVSY990YZg06BD1ohLMtyFTI4pKTJsS9xREq9EOaPWiO2gpms7397x6nQJkbh+Fz2q/rqRROX6/M8bJrqlVW4l6JEptKeUFuMYUbtCQ7CIttpGc6MY93x1r1vgAnRXvY5cvwWPqb9uWQm+lP95QxdNMeWhOq1x0Db55C7GcUv2ZUuN6n8iKzsvOxibC//Yfs9Na8r2Rlz02vXXDT57FP/zJi66/EJSmsJKa8QxnoqW3VLQ+jZVUtJwJ8PNX1NQCwfNgdhhHD9on7PdRdrdGPF28rJr1F+3LBdeyv+8yYfLoMYet1vX4upNAjVvwOUWnlNXJXlkzk5Il6kqeoiL0C07qno+/CYBXq/+utlnsz7/Mzvy0tmI4zm4ag23PRN3t/CWryoUVJGm+5+K8RJ0V8Hc88/XHUX/HfiAq7t+BH+x6v8t438enWmdJwFA6ZINriLGKv/95f8lT9/FnyA1NMVEvQyaXuu+gz36f/DD73E4pwqpLcvm/o0Vle78n//+L/NPvoefp1pTJye6e4A/D082FERa5/opeH9zpvh13cNm19/4v/LDe5xMWTi8I0Ta0qKlK27AS/v3/r+/x/2GO9K2c7kVMonDpq7//jc5PKCxeNPpFVzaRr01wF8C4Pu76hXuX18H4LduTr79guuFD3n5BHfI+ZRFhY8w29TYhbbLi/bvBdqKE4fUgg1pBKnV3FEaCWOWyA+m3WpORZr/j+9TKJtW8yBTF2/ZEODI9/QavHkVdGFp/Pjn4Q+u5hXapsP5sOH+OXXA1LiKuqJxiMNbhTkbdJTCy4llEt6NnqRT4dhg1V3nbdrm6dYMecA1yTOL4PWTE9L5VzPFlLBCvlG58AhehnN4uHsAYinyJ+AZ/NkVvELbfOBUuOO5syBIEtiqHU1k9XeISX5bsimrkUUhnGDxourN8SgUsCZVtKyGbyGzHXdjOhsAvOAswSRyIBddRdEZWP6GZhNK/yjwew9ehBo+3jEADu7Ay2n8mDc+TS7awUHg0OMzR0LABhqLD4hJEh/BEGyBdGlSJoXYXtr+3HS4ijzVpgi0paWXtdruGTknXBz+11qT1Q2inxaTzQCO46P3lfLpyS4fou2PH/PupwZgCxNhGlj4IvUuWEsTkqMWm6i4xCSMc9N1RDQoCVcuGItJ/MRWefais+3synowi/dESgJjkilnWnBTGvRWmaw8oR15257t7CHmCf8HOn7cwI8+NQBXMBEmAa8PMRemrNCEhLGEhDQKcGZWS319BX9PFBEwGTbRBhLbDcaV3drFcDqk5kCTd2JF1Wp0HraqBx8U0wwBTnbpCadwBA/gTH/CDrcCs93LV8E0YlmmcyQRQnjBa8JESmGUfIjK/7fkaDJpmD2QptFNVJU1bbtIAjjWQizepOKptRjbzR9Kag6xZmMLLjHOtcLT3Tx9o/0EcTT1XN3E45u24AiwEypDJXihKjQxjLprEwcmRKclaDNZCVqr/V8mYWyFADbusiY5hvgFoU2vio49RgJLn5OsReRFN6tabeetiiy0V7KFHT3HyZLx491u95sn4K1QQSPKM9hNT0wMVvAWbzDSVdrKw4zRjZMyJIHkfq1VAVCDl/bUhNKlGq0zGr05+YAceXVPCttVk0oqjVwMPt+BBefx4yPtGVkUsqY3CHDPiCM5ngupUwCdbkpd8kbPrCWHhkmtIKLEetF2499eS1jZlIPGYnlcPXeM2KD9vLS0bW3ktYNqUllpKLn5ZrsxlIzxvDu5eHxzGLctkZLEY4PgSOg2IUVVcUONzUDBEpRaMoXNmUc0tFZrTZquiLyKxrSm3DvIW9Fil+AkhXu5PhEPx9mUNwqypDvZWdKlhIJQY7vn2OsnmBeOWnYZ0m1iwbbw1U60by5om47iHRV6fOgzjMf/DAZrlP40Z7syxpLK0lJ0gqaAK1c2KQKu7tabTXkLFz0sCftuwX++MyNeNn68k5Buq23YQhUh0SNTJa1ioQ0p4nUG2y0XilF1JqODqdImloPS4Bp111DEWT0jJjVv95uX9BBV7eB3bUWcu0acSVM23YZdd8R8UbQUxJ9wdu3oMuhdt929ME+mh6JXJ8di2RxbTi6TbrDquqV4aUKR2iwT6aZbyOwEXN3DUsWr8Hn4EhwNyHuXHh7/pdaUjtR7vnDh/d8c9xD/s5f501eQ1+CuDiCvGhk1AN/4Tf74RfxPwD3toLarR0zNtsnPzmS64KIRk861dMWCU8ArasG9T9H0ZBpsDGnjtAOM2+/LuIb2iIUGXNgl5ZmKD/Tw8TlaAuihaFP5yrw18v4x1898zIdP+DDAX1bM3GAMvPgRP/cJn3zCW013nrhHkrITyvYuwOUkcHuKlRSW5C6rzIdY4ppnF7J8aAJbQepgbJYBjCY9usGXDKQxq7RZfh9eg5d1UHMVATRaD/4BHK93/1iAgYZ/+jqPn8Dn4UExmWrpa3+ZOK6MvM3bjwfzxNWA2dhs8+51XHSPJiaAhGSpWevEs5xHLXcEGFXYiCONySH3fPWq93JIsBiSWvWyc3CAN+EcXoT7rCSANloPPoa31rt/5PUA/gp8Q/jDD3hyrjzlR8VkanfOvB1XPubt17vzxAfdSVbD1pzAnfgyF3ycadOTOTXhpEUoLC1HZyNGW3dtmjeXgr2r56JNmRwdNNWaQVBddd6rh4MhviEB9EFRD/7RGvePvCbwAL4Mx/D6M541hHO4D3e7g6PafdcZVw689z7NGTwo5om7A8sPhccT6qKcl9NJl9aM/9kX+e59Hh1yPqGuCCZxuITcsmNaJ5F7d0q6J3H48TO1/+M57085q2icdu2U+W36Ldllz9Agiv4YGljoEN908EzvDOrBF98/vtJwCC/BF2AG75xxEmjmMIcjxbjoaxqOK3/4hPOZzhMPBpYPG44CM0dTVm1LjLtUWWVz1Bcf8tEx0zs8O2A2YVHRxKYOiy/aOVoAaMu0i7ubu43njjmd4ibMHU1sIDHaQNKrZND/FZYdk54oCXetjq7E7IVl9eAL7t+oHnwXXtLx44czzoRFHBztYVwtH1d+NOMkupZ5MTM+gUmq90X+Bh9zjRlmaQ+m7YMqUL/veemcecAtOJ0yq1JnVlN27di2E0+Klp1tAJ4KRw1eMI7aJjsO3R8kPSI3fUFXnIOfdQe86sIIVtWDL7h//Ok6vj8vwDk08NEcI8zz7OhBy+WwalzZeZ4+0XniRfst9pAJqQHDGLzVQ2pheZnnv1OWhwO43/AgcvAEXEVVpa4db9sGvNK8wjaENHkfFQ4Ci5i7dqnQlPoLQrHXZDvO3BIXZbJOBrOaEbML6sFL798I4FhKihjHMsPjBUZYCMFr6nvaArxqXPn4lCa+cHfSa2cP27g3Z3ziYTRrcbQNGLQmGF3F3cBdzzzX7AILx0IB9rbwn9kx2G1FW3Inic+ZLIsVvKR8Zwfj0l1fkqo8LWY1M3IX14OX3r9RKTIO+d9XzAI8qRPGPn/4NC2n6o4rN8XJ82TOIvuVA8zLKUHRFgBCetlDZlqR1gLKjS39xoE7Bt8UvA6BxuEDjU3tFsEijgA+615tmZkXKqiEENrh41iLDDZNq4pKTWR3LZfnos81LOuNa15cD956vLMsJd1rqYp51gDUQqMYm2XsxnUhD2jg1DM7SeuJxxgrmpfISSXVIJIS5qJJSvJPEQ49DQTVIbYWJ9QWa/E2+c/oPK1drmC7WSfJRNKBO5Yjvcp7Gc3dmmI/Xh1kDTEuiSnWqQf37h+fTMhGnDf6dsS8SQfQWlqqwXXGlc/PEZ/SC5mtzIV0nAshlQdM/LvUtYutrEZ/Y+EAFtq1k28zQhOwLr1AIeANzhF8t9qzTdZf2qRKO6MWE9ohBYwibbOmrFtNmg3mcS+tB28xv2uKd/agYCvOP+GkSc+0lr7RXzyufL7QbkUpjLjEWFLqOIkAGu2B0tNlO9Eau2W1qcOUvVRgKzypKIQZ5KI3q0MLzqTNRYqiZOqmtqloIRlmkBHVpHmRYV6/HixbO6UC47KOFJnoMrVyr7wYz+SlW6GUaghYbY1I6kkxA2W1fSJokUdSh2LQ1GAimRGm0MT+uu57H5l7QgOWxERpO9moLRPgTtquWCfFlGlIjQaRly9odmzMOWY+IBO5tB4sW/0+VWGUh32qYk79EidWKrjWuiLpiVNGFWFRJVktyeXWmbgBBzVl8anPuXyNJlBJOlKLTgAbi/EYHVHxWiDaVR06GnHQNpJcWcK2jJtiCfG2sEHLzuI66sGrMK47nPIInPnu799935aOK2cvmvubrE38ZzZjrELCmXM2hM7UcpXD2oC3+ECVp7xtIuxptJ0jUr3sBmBS47TVxlvJ1Sqb/E0uLdvLj0lLr29ypdd/eMX3f6lrxGlKwKQxEGvw0qHbkbwrF3uHKwVENbIV2wZ13kNEF6zD+x24aLNMfDTCbDPnEikZFyTNttxWBXDaBuM8KtI2rmaMdUY7cXcUPstqTGvBGSrFWIpNMfbdea990bvAOC1YX0qbc6smDS1mPxSJoW4fwEXvjMmhlijDRq6qale6aJEuFGoppYDoBELQzLBuh/mZNx7jkinv0EtnUp50lO9hbNK57lZaMAWuWR5Yo9/kYwcYI0t4gWM47Umnl3YmpeBPqSyNp3K7s2DSAS/39KRuEN2bS4xvowV3dFRMx/VFcp2Yp8w2nTO9hCXtHG1kF1L4KlrJr2wKfyq77R7MKpFKzWlY9UkhYxyHWW6nBWPaudvEAl3CGcNpSXPZ6R9BbBtIl6cHL3gIBi+42CYXqCx1gfGWe7Ap0h3luyXdt1MKy4YUT9xSF01G16YEdWsouW9mgDHd3veyA97H+Ya47ZmEbqMY72oPztCGvK0onL44AvgC49saZKkWRz4veWljE1FHjbRJaWv6ZKKtl875h4CziFCZhG5rx7tefsl0aRT1bMHZjm8dwL/6u7wCRysaQblQoG5yAQN5zpatMNY/+yf8z+GLcH/Qn0iX2W2oEfXP4GvwQHuIL9AYGnaO3zqAX6946nkgqZNnUhx43DIdQtMFeOPrgy/y3Yd85HlJWwjLFkU3kFwq28xPnuPhMWeS+tDLV9Otllq7pQCf3uXJDN9wFDiUTgefHaiYbdfi3b3u8+iY6TnzhgehI1LTe8lcd7s1wJSzKbahCRxKKztTLXstGAiu3a6rPuQs5pk9TWAan5f0BZmGf7Ylxzzk/A7PAs4QPPPAHeFQ2hbFHszlgZuKZsJcUmbDC40sEU403cEjczstOEypa+YxevL4QBC8oRYqWdK6b7sK25tfE+oDZgtOQ2Jg8T41HGcBE6fTWHn4JtHcu9S7uYgU5KSCkl/mcnq+5/YBXOEr6lCUCwOTOM1taOI8mSxx1NsCXBEmLKbMAg5MkwbLmpBaFOPrNSlO2HnLiEqW3tHEwd8AeiQLmn+2gxjC3k6AxREqvKcJbTEzlpLiw4rNZK6oJdidbMMGX9FULKr0AkW+2qDEPBNNm5QAt2Ik2nftNWHetubosHLo2nG4vQA7GkcVCgVCgaDixHqo9UUn1A6OshapaNR/LPRYFV8siT1cCtJE0k/3WtaNSuUZYKPnsVIW0xXWnMUxq5+En4Kvw/MqQmVXnAXj9Z+9zM98zM/Agy7F/qqj2Nh67b8HjFnPP3iBn/tkpdzwEJX/whIcQUXOaikeliCRGUk7tiwF0rItwMEhjkZ309hikFoRAmLTpEXWuHS6y+am/KB/fM50aLEhGnSMwkpxzOov4H0AvgovwJ1iGzDLtJn/9BU+fAINfwUe6FHSLhu83viV/+/HrOePX+STT2B9uWGbrMHHLldRBlhS/CJQmcRxJFqZica01XixAZsYiH1uolZxLrR/SgxVIJjkpQP4PE9sE59LKLr7kltSBogS5tyszzH8Fvw8/AS8rNOg0xUS9fIaHwb+6et8Q/gyvKRjf5OusOzGx8evA/BP4IP11uN/grca5O0lcsPLJ5YjwI4QkJBOHa0WdMZYGxPbh2W2nR9v3WxEWqgp/G3+6VZbRLSAAZ3BhdhAaUL33VUSw9yjEsvbaQ9u4A/gGXwZXoEHOuU1GSj2chf+Mo+f8IcfcAxfIKVmyunRbYQVnoevwgfw3TXXcw++xNuP4fhyueEUNttEduRVaDttddoP0eSxLe2LENk6itYxlrxBNBYrNNKSQmeaLcm9c8UsaB5WyO6675yyQIAWSDpBVoA/gxmcwEvwoDv0m58UE7gHn+fJOa8/Ywan8EKRfjsopF83eCglX/Sfr7OeaRoQfvt1CGvIDccH5BCvw1sWIzRGC/66t0VTcLZQZtm6PlAasbOJ9iwWtUo7biktTSIPxnR24jxP1ZKaqq+2RcXM9OrBAm/AAs7hDJ5bNmGb+KIfwCs8a3jnjBrOFeMjHSCdbKr+2uOLfnOd9eiA8Hvvwwq54VbP2OqwkB48Ytc4YEOiH2vTXqodabfWEOzso4qxdbqD5L6tbtNPECqbhnA708DZH4QOJUXqScmUlks7Ot6FBuZw3n2mEbaUX7kDzxHOOQk8nKWMzAzu6ZZ8sOFw4RK+6PcuXo9tB4SbMz58ApfKDXf3szjNIIbGpD5TKTRxGkEMLjLl+K3wlWXBsCUxIDU+jbOiysESqAy1MGUJpXgwbTWzNOVEziIXZrJ+VIztl1PUBxTSo0dwn2bOmfDRPD3TRTGlfbCJvO9KvuhL1hMHhB9wPuPRLGHcdOWG2xc0U+5bQtAJT0nRTewXL1pgk2+rZAdeWmz3jxAqfNQQdzTlbF8uJ5ecEIWvTkevAHpwz7w78QujlD/Lr491bD8/1vhM2yrUQRrWXNQY4fGilfctMWYjL72UL/qS9eiA8EmN88nbNdour+PBbbAjOjIa4iBhfFg6rxeKdEGcL6p3EWR1Qq2Qkhs2DrnkRnmN9tG2EAqmgPw6hoL7Oza7B+3SCrR9tRftko+Lsf2F/mkTndN2LmzuMcKTuj/mX2+4Va3ki16+nnJY+S7MefpkidxwnV+4wkXH8TKnX0tsYzYp29DOOoSW1nf7nTh2akYiWmcJOuTidSaqESrTYpwjJJNVGQr+rLI7WsqerHW6Kp/oM2pKuV7T1QY9gjqlZp41/WfKpl56FV/0kvXQFRyeQ83xaTu5E8p5dNP3dUF34ihyI3GSpeCsywSh22ZJdWto9winhqifb7VRvgktxp13vyjrS0EjvrRfZ62uyqddSWaWYlwTPAtJZ2oZ3j/Sgi/mi+6vpzesfAcWNA0n8xVyw90GVFGuZjTXEQy+6GfLGLMLL523f5E0OmxVjDoOuRiH91RKU+vtoCtH7TgmvBLvtFXWLW15H9GTdVw8ow4IlRLeHECN9ym1e9K0I+Cbnhgv4Yu+aD2HaQJ80XDqOzSGAV4+4yCqBxrsJAX6ZTIoX36QnvzhhzzMfFW2dZVLOJfo0zbce5OvwXMFaZ81mOnlTVXpDZsQNuoYWveketKb5+6JOOsgX+NTm7H49fUTlx+WLuWL7qxnOFh4BxpmJx0p2gDzA/BUARuS6phR+pUsY7MMboAHx5xNsSVfVZcYSwqCKrqon7zM+8ecCkeS4nm3rINuaWvVNnMRI1IRpxTqx8PZUZ0Br/UEduo3B3hNvmgZfs9gQPj8vIOxd2kndir3awvJ6BLvoUuOfFWNYB0LR1OQJoUySKb9IlOBx74q1+ADC2G6rOdmFdJcD8BkfualA+BdjOOzP9uUhGUEX/TwhZsUduwRr8wNuXKurCixLBgpQI0mDbJr9dIqUuV+92ngkJZ7xduCk2yZKbfWrH1VBiTg9VdzsgRjW3CVXCvAwDd+c1z9dWw9+B+8MJL/eY15ZQ/HqvTwVdsZn5WQsgRRnMaWaecu3jFvMBEmgg+FJFZsnSl0zjB9OqPYaBD7qmoVyImFvzi41usesV0julaAR9dfR15Xzv9sEruRDyk1nb+QaLU67T885GTls6YgcY+UiMa25M/pwGrbCfzkvR3e0jjtuaFtnwuagHTSb5y7boBH119HXhvwP487jJLsLJ4XnUkHX5sLbS61dpiAXRoZSCrFJ+EjpeU3puVfitngYNo6PJrAigKktmwjyQdZpfq30mmtulaAx9Zfx15Xzv+cyeuiBFUs9zq8Kq+XB9a4PVvph3GV4E3y8HENJrN55H1X2p8VyqSKwVusJDKzXOZzplWdzBUFK9e+B4+uv468xvI/b5xtSAkBHQaPvtqWzllVvEOxPbuiE6+j2pvjcKsbvI7txnRErgfH7LdXqjq0IokKzga14GzQ23SSbCQvO6r+Or7SMIr/efOkkqSdMnj9mBx2DRsiY29Uj6+qK9ZrssCKaptR6HKURdwUYeUWA2kPzVKQO8ku2nU3Anhs/XWkBx3F/7wJtCTTTIKftthue1ty9xvNYLY/zo5KSbIuKbXpbEdSyeRyYdAIwKY2neyoc3+k1XUaufYga3T9daMUx/r8z1s10ITknIO0kuoMt+TB8jK0lpayqqjsJ2qtXAYwBU932zinimgmd6mTRDnQfr88q36NAI+tv24E8Pr8zxtasBqx0+xHH9HhlrwsxxNUfKOHQaZBITNf0uccj8GXiVmXAuPEAKSdN/4GLHhs/XWj92dN/uetNuBMnVR+XWDc25JLjo5Mg5IZIq226tmCsip2zZliL213YrTlL2hcFjpCduyim3M7/eB16q/blQsv5X/esDRbtJeabLIosWy3ycavwLhtxdWzbMmHiBTiVjJo6lCLjXZsi7p9PEPnsq6X6wd4bP11i0rD5fzPm/0A6brrIsllenZs0lCJlU4abakR59enZKrKe3BZihbTxlyZ2zl1+g0wvgmA166/bhwDrcn/7Ddz0eWZuJvfSESug6NzZsox3Z04FIxz0mUjMwVOOVTq1CQ0AhdbBGVdjG/CgsfUX7esJl3K/7ytWHRv683praW/8iDOCqWLLhpljDY1ZpzK75QiaZoOTpLKl60auHS/97oBXrv+umU9+FL+5+NtLFgjqVLCdbmj7pY5zPCPLOHNCwXGOcLquOhi8CmCWvbcuO73XmMUPab+ug3A6/A/78Bwe0bcS2+tgHn4J5pyS2WbOck0F51Vq3LcjhLvZ67p1ABbaL2H67bg78BfjKi/jr3+T/ABV3ilLmNXTI2SpvxWBtt6/Z//D0z/FXaGbSBgylzlsEGp+5//xrd4/ae4d8DUUjlslfIYS3t06HZpvfQtvv0N7AHWqtjP2pW08QD/FLy//da38vo8PNlKHf5y37Dxdfe/oj4kVIgFq3koLReSR76W/bx//n9k8jonZxzWTANVwEniDsg87sOSd/z7//PvMp3jQiptGVWFX2caezzAXwfgtzYUvbr0iozs32c3Uge7varH+CNE6cvEYmzbPZ9hMaYDdjK4V2iecf6EcEbdUDVUARda2KzO/JtCuDbNQB/iTeL0EG1JSO1jbXS+nLxtPMDPw1fh5+EPrgSEKE/8Gry5A73ui87AmxwdatyMEBCPNOCSKUeRZ2P6Myb5MRvgCHmA9ywsMifU+AYXcB6Xa5GibUC5TSyerxyh0j6QgLVpdyhfArRTTLqQjwe4HOD9s92D4Ap54odXAPBWLAwB02igG5Kkc+piN4lvODIFGAZgT+EO4Si1s7fjSR7vcQETUkRm9O+MXyo9OYhfe4xt9STQ2pcZRLayCV90b4D3jR0DYAfyxJ+eywg2IL7NTMXna7S/RpQ63JhWEM8U41ZyQGjwsVS0QBrEKLu8xwZsbi4wLcCT+OGidPIOCe1PiSc9Qt+go+vYqB7cG+B9d8cAD+WJPz0Am2gxXgU9IneOqDpAAXOsOltVuMzpdakJXrdPCzXiNVUpCeOos5cxnpQT39G+XVLhs1osQVvJKPZyNq8HDwd4d7pNDuWJPxVX7MSzqUDU6gfadKiNlUFTzLeFHHDlzO4kpa7aiKhBPGKwOqxsBAmYkOIpipyXcQSPlRTf+Tii0U3EJGaZsDER2qoB3h2hu0qe+NNwUooYU8y5mILbJe6OuX+2FTKy7bieTDAemaQyQ0CPthljSWO+xmFDIYiESjM5xKd6Ik5lvLq5GrQ3aCMLvmCA9wowLuWJb9xF59hVVP6O0CrBi3ZjZSNOvRy+I6klNVRJYRBaEzdN+imiUXQ8iVF8fsp+W4JXw7WISW7fDh7lptWkCwZ4d7QTXyBPfJMYK7SijjFppGnlIVJBJBYj7eUwtiP1IBXGI1XCsjNpbjENVpSAJ2hq2LTywEly3hUYazt31J8w2+aiLx3g3fohXixPfOMYm6zCGs9LVo9MoW3MCJE7R5u/WsOIjrqBoHUO0bJE9vxBpbhsd3+Nb4/vtPCZ4oZYCitNeYuC/8UDvDvy0qvkiW/cgqNqRyzqSZa/s0mqNGjtKOoTm14zZpUauiQgVfqtQiZjq7Q27JNaSK5ExRcrGCXO1FJYh6jR6CFqK7bZdQZ4t8g0rSlPfP1RdBtqaa9diqtzJkQ9duSryi2brQXbxDwbRUpFMBHjRj8+Nt7GDKgvph9okW7LX47gu0SpGnnFQ1S1lYldOsC7hYteR574ZuKs7Ei1lBsfdz7IZoxzzCVmmVqaSySzQbBVAWDek+N4jh9E/4VqZrJjPwiv9BC1XcvOWgO8275CVyBPvAtTVlDJfZkaZGU7NpqBogAj/xEHkeAuJihWYCxGN6e8+9JtSegFXF1TrhhLGP1fak3pebgPz192/8gB4d/6WT7+GdYnpH7hH/DJzzFiYPn/vjW0SgNpTNuPIZoAEZv8tlGw4+RLxy+ZjnKa5NdFoC7UaW0aduoYse6+bXg1DLg6UfRYwmhGEjqPvF75U558SANrElK/+MdpXvmqBpaXOa/MTZaa1DOcSiLaw9j0NNNst3c+63c7EKTpkvKHzu6bPbP0RkuHAVcbRY8ijP46MIbQeeT1mhA+5PV/inyDdQipf8LTvMXbwvoDy7IruDNVZKTfV4CTSRUYdybUCnGU7KUTDxLgCknqUm5aAW6/1p6eMsOYsphLzsHrE0Y/P5bQedx1F/4yPHnMB3/IOoTU9+BL8PhtjuFKBpZXnYNJxTuv+2XqolKR2UQgHhS5novuxVySJhBNRF3SoKK1XZbbXjVwWNyOjlqWJjrWJIy+P5bQedyldNScP+HZ61xKSK3jyrz+NiHG1hcOLL/+P+PDF2gOkekKGiNWKgJ+8Z/x8Iv4DdQHzcpZyF4v19I27w9/yPGDFQvmEpKtqv/TLiWMfn4sofMm9eAH8Ao0zzh7h4sJqYtxZd5/D7hkYPneDzl5idlzNHcIB0jVlQ+8ULzw/nc5/ojzl2juE0apD7LRnJxe04dMz2iOCFNtGFpTuXA5AhcTRo8mdN4kz30nVjEC4YTZQy4gpC7GlTlrePKhGsKKgeXpCYeO0MAd/GH7yKQUlXPLOasOH3FnSphjHuDvEu4gB8g66oNbtr6eMbFIA4fIBJkgayoXriw2XEDQPJrQeROAlY6aeYOcMf+IVYTU3XFlZufMHinGywaW3YLpObVBAsbjF4QJMsVUSayjk4voPsHJOQfPWDhCgDnmDl6XIRerD24HsGtw86RMHOLvVSHrKBdeVE26gKB5NKHzaIwLOmrqBWJYZDLhASG16c0Tn+CdRhWDgWXnqRZUTnPIHuMJTfLVpkoYy5CzylHVTGZMTwkGAo2HBlkQplrJX6U+uF1wZz2uwS1SQ12IqWaPuO4baZaEFBdukksJmkcTOm+YJSvoqPFzxFA/YUhIvWxcmSdPWTWwbAKVp6rxTtPFUZfKIwpzm4IoMfaYQLWgmlG5FME2gdBgm+J7J+rtS/XBbaVLsR7bpPQnpMFlo2doWaVceHk9+MkyguZNCJ1He+kuHTWyQAzNM5YSUg/GlTk9ZunAsg1qELVOhUSAK0LABIJHLKbqaEbHZLL1VA3VgqoiOKXYiS+HRyaEKgsfIqX64HYWbLRXy/qWoylIV9gudL1OWBNgBgTNmxA6b4txDT4gi3Ri7xFSLxtXpmmYnzAcWDZgY8d503LFogz5sbonDgkKcxGsWsE1OI+rcQtlgBBCSOKD1mtqYpIU8cTvBmAT0yZe+zUzeY92fYjTtGipXLhuR0ePoHk0ofNWBX+lo8Z7pAZDk8mEw5L7dVyZZoE/pTewbI6SNbiAL5xeygW4xPRuLCGbhcO4RIeTMFYHEJkYyEO9HmJfXMDEj/LaH781wHHZEtqSQ/69UnGpzH7LKIAZEDSPJnTesJTUa+rwTepI9dLJEawYV+ZkRn9g+QirD8vF8Mq0jFQ29js6kCS3E1+jZIhgPNanHdHFqFvPJLHqFwQqbIA4jhDxcNsOCCQLDomaL/dr5lyJaJU6FxPFjO3JOh3kVMcROo8u+C+jo05GjMF3P3/FuDLn5x2M04xXULPwaS6hBYki+MrMdZJSgPHlcB7nCR5bJ9Kr5ACUn9jk5kivdd8tk95SOGrtqu9lr2IhK65ZtEl7ZKrp7DrqwZfRUSN1el7+7NJxZbywOC8neNKTch5vsTEMNsoCCqHBCqIPRjIPkm0BjvFODGtto99rCl+d3wmHkW0FPdpZtC7MMcVtGFQjJLX5bdQ2+x9ypdc313uj8xlsrfuLgWXz1cRhZvJYX0iNVBRcVcmCXZs6aEf3RQF2WI/TcCbKmGU3IOoDJGDdDub0+hYckt6PlGu2BcxmhbTdj/klhccLGJMcqRjMJP1jW2ETqLSWJ/29MAoORluJ+6LPffBZbi5gqi5h6catQpmOT7/OFf5UorRpLzCqcMltBLhwd1are3kztrSzXO0LUbXRQcdLh/RdSZ+swRm819REDrtqzC4es6Gw4JCKlSnjYVpo0xeq33PrADbFLL3RuCmObVmPN+24kfa+AojDuM4umKe2QwCf6EN906HwjujaitDs5o0s1y+k3lgbT2W2i7FJdnwbLXhJUBq/9liTctSmFC/0OqUinb0QddTWamtjbHRFuWJJ6NpqZ8vO3fZJ37Db+2GkaPYLGHs7XTTdiFQJ68SkVJFVmY6McR5UycflNCsccHFaV9FNbR4NttLxw4pQ7wJd066Z0ohVbzihaxHVExd/ay04oxUKWt+AsdiQ9OUyZ2krzN19IZIwafSTFgIBnMV73ADj7V/K8u1MaY2sJp2HWm0f41tqwajEvdHWOJs510MaAqN4aoSiPCXtN2KSi46dUxHdaMquar82O1x5jqhDGvqmoE9LfxcY3zqA7/x3HA67r9ZG4O6Cuxu12/+TP+eLP+I+HErqDDCDVmBDO4larujNe7x8om2rMug0MX0rL1+IWwdwfR+p1TNTyNmVJ85ljWzbWuGv8/C7HD/izjkHNZNYlhZcUOKVzKFUxsxxN/kax+8zPWPSFKw80rJr9Tizyj3o1gEsdwgWGoxPezDdZ1TSENE1dLdNvuKL+I84nxKesZgxXVA1VA1OcL49dFlpFV5yJMhzyCmNQ+a4BqusPJ2bB+xo8V9u3x48VVIEPS/mc3DvAbXyoYr6VgDfh5do5hhHOCXMqBZUPhWYbWZECwVJljLgMUWOCB4MUuMaxGNUQDVI50TQ+S3kFgIcu2qKkNSHVoM0SHsgoZxP2d5HH8B9woOk4x5bPkKtAHucZsdykjxuIpbUrSILgrT8G7G5oCW+K0990o7E3T6AdW4TilH5kDjds+H64kS0mz24grtwlzDHBJqI8YJQExotPvoC4JBq0lEjjQkyBZ8oH2LnRsQ4Hu1QsgDTJbO8fQDnllitkxuVskoiKbRF9VwzMDvxHAdwB7mD9yCplhHFEyUWHx3WtwCbSMMTCUCcEmSGlg4gTXkHpZXWQ7kpznK3EmCHiXInqndkQjunG5kxTKEeGye7jWz9cyMR2mGiFQ15ENRBTbCp+Gh86vAyASdgmJq2MC6hoADQ3GosP0QHbnMHjyBQvQqfhy/BUbeHd5WY/G/9LK/8Ka8Jd7UFeNWEZvzPb458Dn8DGLOe3/wGL/4xP+HXlRt+M1PE2iLhR8t+lfgxsuh7AfO2AOf+owWhSZRYQbd622hbpKWKuU+XuvNzP0OseRDa+mObgDHJUSc/pKx31QdKffQ5OIJpt8GWjlgTwMc/w5MPCR/yl1XC2a2Yut54SvOtMev55Of45BOat9aWG27p2ZVORRvnEk1hqWMVUmqa7S2YtvlIpspuF1pt0syuZS2NV14mUidCSfzQzg+KqvIYCMljIx2YK2AO34fX4GWdu5xcIAb8MzTw+j/lyWM+Dw/gjs4GD6ehNgA48kX/AI7XXM/XAN4WHr+9ntywqoCakCqmKP0rmQrJJEErG2Upg1JObr01lKQy4jskWalKYfJ/EDLMpjNSHFEUAde2fltaDgmrNaWQ9+AAb8I5vKjz3L1n1LriB/BXkG/wwR9y/oRX4LlioHA4LzP2inzRx/DWmutRweFjeP3tNeSGlaE1Fde0OS11yOpmbIp2u/jF1n2RRZviJM0yBT3IZl2HWImKjQOxIyeU325b/qWyU9Moj1o07tS0G7qJDoGHg5m8yeCxMoEH8GU45tnrNM84D2l297DQ9t1YP7jki/7RmutRweEA77/HWXOh3HCxkRgldDQkAjNTMl2Iloc1qN5JfJeeTlyTRzxURTdn1Ixv2uKjs12AbdEWlBtmVdk2k7FFwj07PCZ9XAwW3dG+8xKzNFr4EnwBZpy9Qzhh3jDXebBpYcpuo4fQ44u+fD1dweEnHzI7v0xuuOALRUV8rXpFyfSTQYkhd7IHm07jpyhlkCmI0ALYqPTpUxXS+z4jgDj1Pflvmz5ecuItpIBxyTHpSTGWd9g1ApfD/bvwUhL4nT1EzqgX7cxfCcNmb3mPL/qi9SwTHJ49oj5ZLjccbTG3pRmlYi6JCG0mQrAt1+i2UXTZ2dv9IlQpN5naMYtviaXlTrFpoMsl3bOAFEa8sqPj2WCMrx3Yjx99qFwO59Aw/wgx+HlqNz8oZvA3exRDvuhL1jMQHPaOJ0+XyA3fp1OfM3qObEVdhxjvynxNMXQV4+GJyvOEFqeQBaIbbO7i63rpxCltdZShPFxkjM2FPVkn3TG+Rp9pO3l2RzFegGfxGDHIAh8SteR0C4HopXzRF61nheDw6TFN05Ebvq8M3VKKpGjjO6r7nhudTEGMtYM92HTDaR1FDMXJ1eThsbKfywyoWwrzRSXkc51flG3vIid62h29bIcFbTGhfV+faaB+ohj7dPN0C2e2lC96+XouFByen9AsunLDJZ9z7NExiUc0OuoYW6UZkIyx2YUR2z6/TiRjyKMx5GbbjLHvHuf7YmtKghf34LJfx63Yg8vrvN2zC7lY0x0tvKezo4HmGYDU+Gab6dFL+KI761lDcNifcjLrrr9LWZJctG1FfU1uwhoQE22ObjdfkSzY63CbU5hzs21WeTddH2BaL11Gi7lVdlxP1nkxqhnKhVY6knS3EPgVGg1JpN5cP/hivujOelhXcPj8HC/LyI6MkteVjlolBdMmF3a3DbsuAYhL44dxzthWSN065xxUd55Lmf0wRbOYOqH09/o9WbO2VtFdaMb4qBgtFJoT1SqoN8wPXMoXLb3p1PUEhxfnnLzGzBI0Ku7FxrKsNJj/8bn/H8fPIVOd3rfrklUB/DOeO+nkghgSPzrlPxluCMtOnDL4Yml6dK1r3vsgMxgtPOrMFUZbEUbTdIzii5beq72G4PD0DKnwjmBULUVFmy8t+k7fZ3pKc0Q4UC6jpVRqS9Umv8bxw35flZVOU1X7qkjnhZlsMbk24qQ6Hz7QcuL6sDC0iHHki96Uh2UdvmgZnjIvExy2TeJdMDZNSbdZyAHe/Yd1xsQhHiKzjh7GxQ4yqMPaywPkjMamvqrYpmO7Knad+ZQC5msCuAPWUoxrxVhrGv7a+KLXFhyONdTMrZ7ke23qiO40ZJUyzgYyX5XyL0mV7NiUzEs9mjtbMN0dERqwyAJpigad0B3/zRV7s4PIfXSu6YV/MK7+OrYe/JvfGMn/PHJe2fyUdtnFrKRNpXV0Y2559aWPt/G4BlvjTMtXlVIWCnNyA3YQBDmYIodFz41PvXPSa6rq9lWZawZ4dP115HXV/M/tnFkkrBOdzg6aP4pID+MZnTJ1SuuB6iZlyiox4HT2y3YBtkUKWooacBQUDTpjwaDt5poBHl1/HXltwP887lKKXxNUEyPqpGTyA699UqY/lt9yGdlUKra0fFWS+36iylVWrAyd7Uw0CZM0z7xKTOduznLIjG2Hx8cDPLb+OvK6Bv7n1DYci4CxUuRxrjBc0bb4vD3rN5Zz36ntLb83eVJIB8LiIzCmn6SMPjlX+yNlTjvIGjs+QzHPf60Aj62/jrzG8j9vYMFtm1VoRWCJdmw7z9N0t+c8cxZpPeK4aTRicS25QhrVtUp7U578chk4q04Wx4YoQSjFryUlpcQ1AbxZ/XVMknIU//OGl7Q6z9Zpxi0+3yFhSkjUDpnCIUhLWVX23KQ+L9vKvFKI0ZWFQgkDLvBoylrHNVmaw10zwCPrr5tlodfnf94EWnQ0lFRWy8pW9LbkLsyUVDc2NSTHGDtnD1uMtchjbCeb1mpxFP0YbcClhzdLu6lfO8Bj6q+bdT2sz/+8SZCV7VIxtt0DUn9L7r4cLYWDSXnseEpOGFuty0qbOVlS7NNzs5FOGJUqQpl2Q64/yBpZf90sxbE+//PGdZ02HSipCbmD6NItmQ4Lk5XUrGpDMkhbMm2ZVheNYV+VbUWTcv99+2NyX1VoafSuC+AN6q9bFIMv5X/eagNWXZxEa9JjlMwNWb00akGUkSoepp1/yRuuqHGbUn3UdBSTxBU6SEVklzWRUkPndVvw2PrrpjvxOvzPmwHc0hpmq82npi7GRro8dXp0KXnUQmhZbRL7NEVp1uuZmO45vuzKsHrktS3GLWXODVjw+vXXLYx4Hf7njRPd0i3aoAGX6W29GnaV5YdyDj9TFkakje7GHYzDoObfddHtOSpoi2SmzJHrB3hM/XUDDEbxP2/oosszcRlehWXUvzHv4TpBVktHqwenFo8uLVmy4DKLa5d3RtLrmrM3aMFr1183E4sewf+85VWeg1c5ag276NZrM9IJVNcmLEvDNaV62aq+14IAOGFsBt973Ra8Xv11YzXwNfmft7Jg2oS+XOyoC8/cwzi66Dhmgk38kUmP1CUiYWOX1bpD2zWXt2FCp7uq8703APAa9dfNdscR/M/bZLIyouVxqJfeWvG9Je+JVckHQ9+CI9NWxz+blX/KYYvO5n2tAP/vrlZ7+8/h9y+9qeB/Hnt967e5mevX10rALDWK//FaAT5MXdBXdP0C/BAes792c40H+AiAp1e1oH8HgH94g/Lttx1gp63op1eyoM/Bvw5/G/7xFbqJPcCXnmBiwDPb/YKO4FX4OjyCb289db2/Noqicw4i7N6TVtoz8tNwDH+8x/i6Ae7lmaQVENzJFb3Di/BFeAwz+Is9SjeQySpPqbLFlNmyz47z5a/AF+AYFvDmHqibSXTEzoT4Gc3OALaqAP4KPFUJ6n+1x+rGAM6Zd78bgJ0a8QN4GU614vxwD9e1Amy6CcskNrczLx1JIp6HE5UZD/DBHrFr2oNlgG4Odv226BodoryjGJ9q2T/AR3vQrsOCS0ctXZi3ruLlhpFDJYl4HmYtjQCP9rhdn4suySLKDt6wLcC52h8xPlcjju1fn+yhuw4LZsAGUuo2b4Fx2UwQu77uqRHXGtg92aN3tQCbFexc0uk93vhTXbct6y7MulLycoUljx8ngDMBg1tvJjAazpEmOtxlzclvj1vQf1Tx7QlPDpGpqgtdSKz/d9/hdy1vTfFHSmC9dGDZbLiezz7Ac801HirGZsWjydfZyPvHXL/Y8Mjzg8BxTZiuwKz4Eb8sBE9zznszmjvFwHKPIWUnwhqfVRcd4Ck0K6ate48m1oOfrX3/yOtvAsJ8zsPAM89sjnddmuLuDPjX9Bu/L7x7xpMzFk6nWtyQfPg278Gn4Aekz2ZgOmU9eJ37R14vwE/BL8G3aibCiWMWWDQ0ZtkPMnlcGeAu/Ag+8ZyecU5BPuy2ILD+sQqyZhAKmn7XZd+jIMTN9eBL7x95xVLSX4On8EcNlXDqmBlqS13jG4LpmGbkF/0CnOi3H8ETOIXzmnmtb0a16Tzxj1sUvQCBiXZGDtmB3KAefPH94xcUa/6vwRn80GOFyjEXFpba4A1e8KQfFF+259tx5XS4egYn8fQsLGrqGrHbztr+uByTahWuL1NUGbDpsnrwBfePPwHHIf9X4RnM4Z2ABWdxUBlqQ2PwhuDxoS0vvqB1JzS0P4h2nA/QgTrsJFn+Y3AOjs9JFC07CGWX1oNX3T/yHOzgDjwPn1PM3g9Jk9lZrMEpxnlPmBbjyo2+KFXRU52TJM/2ALcY57RUzjObbjqxVw++4P6RAOf58pcVsw9Daje3htriYrpDOonre3CudSe6bfkTEgHBHuDiyu5MCsc7BHhYDx7ePxLjqigXZsw+ijMHFhuwBmtoTPtOxOrTvYJDnC75dnUbhfwu/ZW9AgYd+peL68HD+0emKquiXHhWjJg/UrkJYzuiaL3E9aI/ytrCvAd4GcYZMCkSQxfUg3v3j8c4e90j5ZTPdvmJJGHnOCI2nHS8081X013pHuBlV1gB2MX1YNmWLHqqGN/TWmG0y6clJWthxNUl48q38Bi8vtMKyzzpFdSDhxZ5WBA5ZLt8Jv3895DduBlgbPYAj8C4B8hO68FDkoh5lydC4FiWvBOVqjYdqjiLv92t8yPDjrDaiHdUD15qkSURSGmXJwOMSxWAXYwr3zaAufJ66l+94vv3AO+vPcD7aw/w/toDvL/2AO+vPcD7aw/wHuD9tQd4f+0B3l97gPfXHuD9tQd4f+0B3l97gG8LwP8G/AL8O/A5OCq0Ys2KIdv/qOIXG/4mvFAMF16gZD+2Xvu/B8as5+8bfllWyg0zaNO5bfXj6vfhhwD86/Aq3NfRS9t9WPnhfnvCIw/CT8GLcFTMnpntdF/z9V+PWc/vWoIH+FL3Znv57PitcdGP4R/C34avw5fgRVUInCwbsn1yyA8C8zm/BH8NXoXnVE6wVPjdeCI38kX/3+Ct9dbz1pTmHFRu+Hm4O9Ch3clr99negxfwj+ER/DR8EV6B5+DuQOnTgUw5rnkY+FbNU3gNXh0o/JYTuWOvyBf9FvzX663HH/HejO8LwAl8Hl5YLTd8q7sqA3wbjuExfAFegQdwfyDoSkWY8swzEf6o4Qyewefg+cHNbqMQruSL/u/WWc+E5g7vnnEXgDmcDeSGb/F4cBcCgT+GGRzDU3hZYburAt9TEtHgbM6JoxJ+6NMzzTcf6c2bycv2+KK/f+l6LBzw5IwfqZJhA3M472pWT/ajKxnjv4AFnMEpnBTPND6s2J7qHbPAqcMK74T2mZ4VGB9uJA465It+/eL1WKhYOD7xHOkr1ajK7d0C4+ke4Hy9qXZwpgLr+Znm/uNFw8xQOSy8H9IzjUrd9+BIfenYaylf9FsXr8fBAadnPIEDna8IBcwlxnuA0/Wv6GAWPd7dDIKjMdSWueAsBj4M7TOd06qBbwDwKr7oleuxMOEcTuEZTHWvDYUO7aHqAe0Bbq+HEFRzOz7WVoTDQkVds7A4sIIxfCQdCefFRoIOF/NFL1mPab/nvOakSL/Q1aFtNpUb/nFOVX6gzyg/1nISyDfUhsokIzaBR9Kxm80s5mK+6P56il1jXic7nhQxsxSm3OwBHl4fFdLqi64nDQZvqE2at7cWAp/IVvrN6/BFL1mPhYrGMBfOi4PyjuSGf6wBBh7p/FZTghCNWGgMzlBbrNJoPJX2mW5mwZfyRffXo7OFi5pZcS4qZUrlViptrXtw+GQoyhDPS+ANjcGBNRiLCQDPZPMHuiZfdFpPSTcQwwKYdRNqpkjm7AFeeT0pJzALgo7g8YYGrMHS0iocy+YTm2vyRUvvpXCIpQ5pe666TJrcygnScUf/p0NDs/iAI/nqDHC8TmQT8x3NF91l76oDdQGwu61Z6E0ABv7uO1dbf/37Zlv+Zw/Pbh8f1s4Avur6657/+YYBvur6657/+YYBvur6657/+YYBvur6657/+aYBvuL6657/+VMA8FXWX/f8zzcN8BXXX/f8zzcNMFdbf93zP38KLPiK6697/uebtuArrr/u+Z9vGmCusP6653/+1FjwVdZf9/zPN7oHX339dc//fNMu+irrr3v+50+Bi+Zq6697/uebA/jz8Pudf9ht/fWv517J/XUzAP8C/BAeX9WCDrUpZ3/dEMBxgPcfbtTVvsYV5Yn32u03B3Ac4P3b8I+vxNBKeeL9dRMAlwO83959qGO78sT769oB7g3w/vGVYFzKE++v6wV4OMD7F7tckFkmT7y/rhHgpQO8b+4Y46XyxPvrugBeNcB7BRiX8sT767oAvmCA9woAHsoT76+rBJjLBnh3txOvkifeX1dswZcO8G6N7sXyxPvr6i340gHe3TnqVfLE++uKAb50gHcXLnrX8sR7gNdPRqwzwLu7Y/FO5Yn3AK9jXCMGeHdgxDuVJ75VAI8ljP7PAb3/RfjcZfePHBB+79dpfpH1CanN30d+mT1h9GqAxxJGM5LQeeQ1+Tb+EQJrElLb38VHQ94TRq900aMIo8cSOo+8Dp8QfsB8zpqE1NO3OI9Zrj1h9EV78PqE0WMJnUdeU6E+Jjyk/hbrEFIfeWbvId8H9oTRFwdZaxJGvziW0Hn0gqYB/wyZ0PwRlxJST+BOw9m77Amj14ii1yGM/txYQudN0qDzGe4EqfA/5GJCagsHcPaEPWH0esekSwmjRxM6b5JEcZ4ww50ilvAOFxBSx4yLW+A/YU8YvfY5+ALC6NGEzhtmyZoFZoarwBLeZxUhtY4rc3bKnjB6TKJjFUHzJoTOozF2YBpsjcyxDgzhQ1YRUse8+J4wenwmaylB82hC5w0zoRXUNXaRBmSMQUqiWSWkLsaVqc/ZE0aPTFUuJWgeTei8SfLZQeMxNaZSIzbII4aE1Nmr13P2hNHjc9E9guYNCZ032YlNwESMLcZiLQHkE4aE1BFg0yAR4z1h9AiAGRA0jyZ03tyIxWMajMPWBIsxYJCnlITU5ShiHYdZ94TR4wCmSxg9jtB5KyPGYzymAYexWEMwAPIsAdYdV6aObmNPGD0aYLoEzaMJnTc0Ygs+YDw0GAtqxBjkuP38bMRWCHn73xNGjz75P73WenCEJnhwyVe3AEe8TtKdJcYhBl97wuhNAObK66lvD/9J9NS75v17wuitAN5fe4D31x7g/bUHeH/tAd5fe4D3AO+vPcD7aw/w/toDvL/2AO+vPcD7aw/w/toDvAd4f/24ABzZ8o+KLsSLS+Pv/TqTb3P4hKlQrTGh+fbIBT0Axqznnb+L/V2mb3HkN5Mb/nEHeK7d4IcDld6lmDW/iH9E+AH1MdOw/Jlu2T1xNmY98sv4wHnD7D3uNHu54WUuOsBTbQuvBsPT/UfzNxGYzwkP8c+Yz3C+r/i6DcyRL/rZ+utRwWH5PmfvcvYEt9jLDS/bg0/B64DWKrQM8AL8FPwS9beQCe6EMKNZYJol37jBMy35otdaz0Bw2H/C2Smc7+WGB0HWDELBmOByA3r5QONo4V+DpzR/hFS4U8wMW1PXNB4TOqYz9urxRV++ntWCw/U59Ty9ebdWbrgfRS9AYKKN63ZokZVygr8GZ/gfIhZXIXPsAlNjPOLBby5c1eOLvmQ9lwkOy5x6QV1j5TYqpS05JtUgUHUp5toHGsVfn4NX4RnMCe+AxTpwmApTYxqMxwfCeJGjpXzRF61nbcHhUBPqWze9svwcHJ+S6NPscKrEjug78Dx8Lj3T8D4YxGIdxmJcwhi34fzZUr7olevZCw5vkOhoClq5zBPZAnygD/Tl9EzDh6kl3VhsHYcDEb+hCtJSvuiV69kLDm+WycrOTArHmB5/VYyP6jOVjwgGawk2zQOaTcc1L+aLXrKeveDwZqlKrw8U9Y1p66uK8dEzdYwBeUQAY7DbyYNezBfdWQ97weEtAKYQg2xJIkuveAT3dYeLGH+ShrWNwZgN0b2YL7qznr3g8JYAo5bQBziPjx7BPZ0d9RCQp4UZbnFdzBddor4XHN4KYMrB2qHFRIzzcLAHQZ5the5ovui94PCWAPefaYnxIdzRwdHCbuR4B+tbiy96Lzi8E4D7z7S0mEPd+eqO3cT53Z0Y8SV80XvB4Z0ADJi/f7X113f+7p7/+UYBvur6657/+YYBvur6657/+aYBvuL6657/+aYBvuL6657/+aYBvuL6657/+aYBvuL6657/+VMA8FXWX/f8z58OgK+y/rrnf75RgLna+uue//lTA/CV1V/3/M837aKvvv6653++UQvmauuve/7nTwfAV1N/3fM/fzr24Cuuv+75nz8FFnxl9dc9//MOr/8/glixwRuUfM4AAAAASUVORK5CYII=';
  },

  getSearchTexture: function () {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII=';
  }

});

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.FilmPass = function (noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale) {

  THREE.Pass.call(this);

  if (THREE.FilmShader === undefined)
    console.error("THREE.FilmPass relies on THREE.FilmShader");

  var shader = THREE.FilmShader;

  this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);

  this.material = new THREE.ShaderMaterial({

    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader

  });

  if (grayscale !== undefined) this.uniforms.grayscale.value = grayscale;
  if (noiseIntensity !== undefined) this.uniforms.nIntensity.value = noiseIntensity;
  if (scanlinesIntensity !== undefined) this.uniforms.sIntensity.value = scanlinesIntensity;
  if (scanlinesCount !== undefined) this.uniforms.sCount.value = scanlinesCount;

  this.camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);
  this.scene = new THREE.Scene();

  this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
  this.scene.add(this.quad);

};

THREE.FilmPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

  constructor: THREE.FilmPass,

  render: function (renderer, writeBuffer, readBuffer, delta, maskActive) {

    this.uniforms["tDiffuse"].value = readBuffer.texture;
    this.uniforms["time"].value += delta;

    this.quad.material = this.material;

    if (this.renderToScreen) {

      renderer.render(this.scene, this.camera);

    } else {

      renderer.render(this.scene, this.camera, writeBuffer, this.clear);

    }

  }

});

THREE.POrbitControls = function (looking_object, DOMElement) {

  var scope = this;
  var is_dragging = false;
  var target = new THREE.Vector3();
  var lo_spherical = new THREE.Spherical();
  var t_spherical = new THREE.Spherical();
  var scale = 1;

  scope.enabled = true;

  scope.enableDamping = true;
  scope.dampingFactor = .063;

  // How far you can orbit vertically, upper and lower limits.
  // Range is 0 to Math.PI radians.
  this.minPolarAngle = 0; // radians
  this.maxPolarAngle = Math.PI; // radians

  // How far you can orbit horizontally, upper and lower limits.
  // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
  this.minAzimuthAngle = - Infinity; // radians
  this.maxAzimuthAngle = Infinity; // radians

  // Set to true to automatically rotate around the target
  this.autoRotate = false;
  this.autoRotateSpeed = 2.0;
  // console.log("> distance:", distance );

  // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
  // Set to false to disable zooming
  this.enableZoom = true;
  this.zoomSpeed = 1.0;
  this.zoomFactor = .063;

  // How far you can dolly in and out ( PerspectiveCamera only )
  this.minDistance = 0;
  this.maxDistance = Infinity;


  // 
  var mouse = {
    x: 0,
    y: 0,
    prev_x: 0,
    prev_y: 0,
    delta_x: 0,
    delta_y: 0
  }

  var dollyStart = new THREE.Vector2();
  var dollyEnd = new THREE.Vector2();
  var dollyDelta = new THREE.Vector2();

  scope.attach = function () {
    DOMElement.addEventListener('mousedown', onMouseDown, false);
    DOMElement.addEventListener('mousemove', onMouseMove, false);
    DOMElement.addEventListener('mouseup', onMouseUp, false);

    DOMElement.addEventListener('touchstart', onTouchStart, false);
    DOMElement.addEventListener('touchend', onTouchEnd, false);
    DOMElement.addEventListener('touchmove', onTouchMove, false);

    window.addEventListener('mouseout', onMouseUp, false);

    DOMElement.addEventListener('wheel', onMouseWheel, false);

    t_spherical.setFromVector3(looking_object.position);
    lo_spherical.setFromVector3(looking_object.position);
  }

  scope.detach = function () {
    DOMElement.removeEventListener('mousedown', onMouseDown);
    DOMElement.removeEventListener('mousemove', onMouseMove);
    DOMElement.removeEventListener('mouseup', onMouseUp);

    DOMElement.removeEventListener('touchstart', onTouchStart);
    DOMElement.removeEventListener('touchend', onTouchEnd);
    DOMElement.removeEventListener('touchmove', onTouchMove);

    window.removeEventListener('mouseout', onMouseUp);

    DOMElement.removeEventListener('wheel', onMouseWheel);
  }






  /*
  ██████╗  ██████╗ ████████╗ █████╗ ████████╗███████╗
  ██╔══██╗██╔═══██╗╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
  ██████╔╝██║   ██║   ██║   ███████║   ██║   █████╗  
  ██╔══██╗██║   ██║   ██║   ██╔══██║   ██║   ██╔══╝  
  ██║  ██║╚██████╔╝   ██║   ██║  ██║   ██║   ███████╗
  ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝
  */
  function setMousePosition(x, y, start) {
    mouse.x = x;
    mouse.y = y;

    mouse.delta_x = start ? 0 : mouse.x - mouse.prev_x;
    mouse.delta_y = start ? 0 : mouse.y - mouse.prev_y;
    mouse.prev_x = mouse.x;
    mouse.prev_y = mouse.y;

    if (is_dragging) {
      t_spherical.phi -= mouse.delta_y * .002;
      t_spherical.theta -= mouse.delta_x * .002;
      t_spherical.makeSafe();
    }
  }


  // ROTATE
  function onMouseDown(e) {
    if (scope.enabled === false) return;
    e.preventDefault();
    is_dragging = true;

    setMousePosition(e.clientX, e.clientY, true);
  }



  function onMouseMove(e) {

    if (scope.enabled === false) return;
    setMousePosition(e.clientX, e.clientY);

  }


  function onMouseUp(e) {
    if (scope.enabled === false) return;

    e.preventDefault();
    is_dragging = false;
  }







  /*
  ███████╗ ██████╗  ██████╗ ███╗   ███╗
  ╚══███╔╝██╔═══██╗██╔═══██╗████╗ ████║
    ███╔╝ ██║   ██║██║   ██║██╔████╔██║
   ███╔╝  ██║   ██║██║   ██║██║╚██╔╝██║
  ███████╗╚██████╔╝╚██████╔╝██║ ╚═╝ ██║
  ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝     ╚═╝
  */
  // WHEEL
  function onMouseWheel(e) {

    if (scope.enabled === false || scope.enableZoom === false) return;

    e.preventDefault();
    e.stopPropagation();

    if (e.deltaY < 0) {

      // dollyOut( getZoomScale() );
      changeZoom(-scope.zoomSpeed);

    } else if (e.deltaY > 0) {

      // dollyIn( getZoomScale() );
      changeZoom(scope.zoomSpeed);

    }

  }

  function changeZoom(_add) {
    t_spherical.radius += _add;
    // restrict radius to be between desired limits
    t_spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, t_spherical.radius));
  }







  /*
  ████████╗ ██████╗ ██╗   ██╗ ██████╗██╗  ██╗
  ╚══██╔══╝██╔═══██╗██║   ██║██╔════╝██║  ██║
     ██║   ██║   ██║██║   ██║██║     ███████║
     ██║   ██║   ██║██║   ██║██║     ██╔══██║
     ██║   ╚██████╔╝╚██████╔╝╚██████╗██║  ██║
     ╚═╝    ╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝
  */
  // TOUCH
  function onTouchStart(event) {

    if (scope.enabled === false) return;

    var touches = event.touches;

    switch (touches.length) {

      case 1:	// one-fingered touch: rotate
        is_dragging = true;
        setMousePosition(touches[0].pageX, touches[0].pageY, true);
        break;

      case 2:	// two-fingered touch: dolly

        if (scope.enableZoom === false) return;
        var dx = touches[0].pageX - touches[1].pageX;
        var dy = touches[0].pageY - touches[1].pageY;
        var distance = Math.sqrt(dx * dx + dy * dy);
        dollyStart.set(0, distance);

        break;

    }
  }

  function onTouchMove(event) {

    if (scope.enabled === false) return;

    event.preventDefault();
    event.stopPropagation();

    var touches = event.touches;

    switch (touches.length) {

      case 1: // one-fingered touch: rotate
        setMousePosition(touches[0].pageX, touches[0].pageY);
        break;

      case 2: // two-fingered touch: dolly
        if (scope.enableZoom === false) return;

        var dx = touches[0].pageX - touches[1].pageX;
        var dy = touches[0].pageY - touches[1].pageY;

        var distance = Math.sqrt(dx * dx + dy * dy);

        dollyEnd.set(0, distance);

        dollyDelta.subVectors(dollyEnd, dollyStart);

        if (dollyDelta.y > 0) {

          changeZoom(-scope.zoomSpeed);

        } else if (dollyDelta.y < 0) {

          changeZoom(scope.zoomSpeed);

        }

        dollyStart.copy(dollyEnd);
        break;

    }

  }

  function onTouchEnd(event) {

    if (scope.enabled === false) return;
    is_dragging = false;

  }





  /*
  ██╗   ██╗██████╗ ██████╗  █████╗ ████████╗███████╗
  ██║   ██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝
  ██║   ██║██████╔╝██║  ██║███████║   ██║   █████╗  
  ██║   ██║██╔═══╝ ██║  ██║██╔══██║   ██║   ██╔══╝  
  ╚██████╔╝██║     ██████╔╝██║  ██║   ██║   ███████╗
   ╚═════╝ ╚═╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
  */
  // UPDATE
  scope.update = function () {

    // zoom
    lo_spherical.radius += (t_spherical.radius - lo_spherical.radius) * scope.zoomFactor;
    // console.log( "> ", t_spherical.radius, scale);

    // restrict theta to be between desired limits
    t_spherical.theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, t_spherical.theta));

    // restrict phi to be between desired limits
    t_spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, t_spherical.phi));

    if (!is_dragging && scope.autoRotate) {
      t_spherical.theta += scope.autoRotateSpeed;
      t_spherical.makeSafe();
    }

    // console.log( t_spherical.radius, scale );

    if (scope.enableDamping) {
      lo_spherical.phi += (t_spherical.phi - lo_spherical.phi) * scope.dampingFactor;
      lo_spherical.theta += (t_spherical.theta - lo_spherical.theta) * scope.dampingFactor;
      lo_spherical.makeSafe();
    } else {
      lo_spherical.radius = t_spherical.radius;
      lo_spherical.phi = t_spherical.phi;
      lo_spherical.theta = t_spherical.theta;
    }


    looking_object.position.setFromSpherical(lo_spherical);
    looking_object.lookAt(target);

  }



  scope.attach();

}
// d.potekhin
// TODO: stop animation of the grid effect

THREE.XRayMaterial = function (params) {

  var uniforms = {
    uTex: { type: "t", value: params.map || new THREE.Texture() },
    offsetRepeat: { value: new THREE.Vector4(0, 0, 1, 1) },
    alphaProportion: { type: "1f", value: params.alphaProportion || 0.5 },
    diffuse: { value: params.color || new THREE.Color(0xffffff) },
    opacity: { value: params.opacity || 1 },
    gridOffset: { value: 0 }
  }

  setInterval(function () {
    uniforms.gridOffset.value += params.gridOffsetSpeed || 1;
    // m.needsUpdate = true;
  }, 40);

  var m = new THREE.ShaderMaterial({

    uniforms: uniforms,

    // attributes: {
    // 	vertexOpacity: { value: [] }
    // },
    vertexShader:
      "\
			varying float _alpha;\
			varying vec2 vUv;\
			uniform vec4 offsetRepeat;\
			uniform float alphaProportion;\
			\
		    void main() {\
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\
				vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\
				\
				vec4 worldPosition = modelMatrix * vec4( vec3( position ), 1.0 );\
				vec3 cameraToVertex = normalize( cameraPosition - worldPosition.xyz);\
				_alpha = 1.0 - max( 0.0, dot( normal, cameraToVertex ) );\
				_alpha = max( 0.0, (_alpha - alphaProportion) / (1.0 - alphaProportion) );\
		    }"
    ,
    //alpha = alphaProportion + (alpha - 0.0) * (1.0 - alphaProportion) / (1.0 - 0.0);\

    fragmentShader:

      "uniform sampler2D uTex;\
	  		uniform vec3 diffuse;\
	  		uniform float opacity;\
	  		uniform float gridOffset;\
	  		\
			varying float _alpha;\
			varying vec2 vUv;\
	  		\
	  		void main() {\
				vec4 texColor = texture2D( uTex, vUv );\
				float _a = _alpha * opacity;\
				if( _a <= 0.0 ) discard;\
				_a = _a * ( sin( vUv.y * 2000.0 + gridOffset ) * .5 + .5 );\
				gl_FragColor = vec4( texColor.rgb * diffuse, _a );\
			\
			}"
    ,
    //if ( alpha < .5 ) discard;\

    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false
  });

  return m;
};

(function (kaspersky) {
  /*
  // !! In some cause Detector doesn't see webGL content on my configuration with nVidia GTS250
  console.log("Detector.webgl", Detector, Detector.webgl);
  if ( ! Detector.webgl ){
      console.log("Your graphics card does not seem to support WebGL. Find out how to get it here.");
      Detector.addGetWebGLMessage()
      return;
  }
  */

  var scope = this;
  var $container = scope.$container = $(".main-container");

  if (!Detector.webgl) {
    $container.hide();
    return;
  }

  var enable_screenshot = !true;// !!!    Flag enables making Screenshot functionality
  var dpr = window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;

  // WEBGL
  var scene = scope.scene = new THREE.Scene();

  scene.fog = new THREE.Fog(0x000000, 7, enable_screenshot ? 60 : 40);

  var renderer = scope.renderer = new THREE.WebGLRenderer({
    preserveDrawingBuffer: enable_screenshot
  });
  renderer.autoClearColor = new THREE.Color(0, 0, 0, 0);
  renderer.setPixelRatio(dpr);

  $container.append(renderer.domElement);

  // CAMERA
  var camera = scope.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 700);
  camera.position.set(-16, 11, 0);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  // !!! SCREENSHOT
  if (enable_screenshot) {

    $("body").css("background-color", "#ff0000");
    $(".main-container").css("background-color", "rgba(0,0,0,0)");

    $("<div id='screenshot-button' style='\
        display : inline-block;\
        font-family: Tahoma;\
        font-size : 18px;\
        color: white;\
        width: auto;\
        height: auto;\
        padding:10px;\
        background-color: red;\
        opacity: .99;\
        z-index: 100;\
        position: absolute;\
        bottom: 50px;\
        left: 50%;\
        cursor: pointer;\
        '>MAKE SCREENSHOT</div>").appendTo($("body")).click(function () {

      planet.bg.visible = false;

      if (composer) composer.render();
      else renderer.render(scene, camera);

      var dataURL = renderer.domElement.toDataURL();
      $("<img id='ready-screenshot' style='position:fixed;opacity:.99;z-index:999999;top:0;left:0;'>").attr("src", dataURL).appendTo($("body"));
    });
  }
  // !!! SCREENSHOT

  // EFFECTS

  var composer;

  if (!isMobile.any) {
    var effect, pass;

    composer = new THREE.EffectComposer(renderer);

    effect = new THREE.RenderPass(scene, camera);
    composer.addPass(effect);

    // RGB shift
    effect = new THREE.ShaderPass(THREE.RGBShiftShader);
    effect.uniforms['amount'].value = 0.0025;//0.005;

    composer.addPass(effect);

    // FXAA
    var FXAAShaderPass = effect = new THREE.ShaderPass(THREE.FXAAShader);
    composer.addPass(effect);

    var VerticalTiltShiftShader = effect = new THREE.ShaderPass(THREE.VerticalTiltShiftShader);
    effect.uniforms['r'].value = .35;

    effect.renderToScreen = true;
    composer.addPass(effect);

  }

  // STATS
  var stats;

  // RESIZE
  window.addEventListener('resize', onWindowResize, false);
  function onWindowResize() {
    var w = window.innerWidth > 1000 ? window.innerWidth - 302 : window.innerWidth;
    var h = window.innerHeight;

    window.canvasWidth = w;

    renderer.domElement.originalSize = { width: w, height: h };
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h);

    if (composer) {
      composer.setSize(w, h);
      FXAAShaderPass.uniforms['resolution'].value.set(1 / w, 1 / h);
      VerticalTiltShiftShader.uniforms["v"].value = 1 / h;
    }

  }
  onWindowResize();

  var controls = scope.controls = new THREE.POrbitControls(camera, renderer.domElement);

  controls.minPolarAngle = Math.PI * .15;
  controls.maxPolarAngle = Math.PI * .85;

  controls.enableDamping = true;
  controls.dampingFactor = .063;

  controls.autoRotate = true;
  controls.autoRotateSpeed = -.002 * 3;

  controls.enableZoom = !false;
  controls.minDistance = 18;
  controls.maxDistance = enable_screenshot ? 40 : 80;
  controls.zoomSpeed = .2;
  controls.zoomFactor = .1;

  // PLanet
  var planet;

  // var def = kaspersky.ready.addWait();
  // kaspersky.planetMain = function (api, locationAPI) {
  //   api()
  //     .then(function (data) {
  //       setTimeout(function () {
  //         planet = new Planet(scope, data, function () {
  //           // def.resolve();
  //           // def = undefined;
  //         }, locationAPI);
  //         animate();
  //       }, 500);
  //     })
  //     .fail(function () {
  //       console.log("error");
  //     })
  //     .always(function () {
  //     })
  // };

  setTimeout(() => {
    planet = new Planet(scope, {
      countries: [
        {
          borders: "CwgKCGsObA+YD2QNYw0FAAYAFAcTBzwAFAAVAAkBuwC8AJMBlgGuAa0BpgGkAaUBeAB5AJwAmgCbAB4HsQwtEGcKZgrgB98H6AvUDEEKQgoYDAoMPApjCAsI",
          center: [90.39147271428568, 23.315597833333324],
          0: 90.39147271428568,
          1: 23.315597833333324,
          cities: "AABKQLghSjVNQcUfdkmwP3AgXlABP6oi+VPXQF4h+lV3P54kvldJQPohelmCQAYi7FpmQYMeO1xwP/MgfF3pPzcitl5UQWkj7l9JQDUjF2FbQJUhPmKNP1cjUmMIP3IkYmRDQEogbGU2P6kkc2ZAP0YjcWd1PyQiZ2jwP30iVGn2P3AjMWrFPvki7WpfP/4hn2tXP0sgSWzKP8gi8WziP5IhhW0DQJUjEm6xQDUinW62P2IiJG91QEQgp2+OQMIiHnABQawik3AmQPQgA3H/QLogcnHMQA0h3nFVP1AiSnLhPzMjtXKEQGMjHXNOP7MjfXPpPgUl23M/QAUhNHSbP9wkinSLQMQg33TuP5EgMXWXQKEggnVCQdQiznWaQNogF3akP+4gX3b7Pxwgp3YIQQUg7HZ1QWUfMHdoQbUfdHdmQd0gtnfEP1gk+HfHP+4kOXj5PnMleXiBQJwfuHg9P38k+HiDQP4fNHljP0shcHkZQI0hrHmbQBEh5nmZP7sgH3qGQMQfVnpaP94gjXoRQEcixHoeQJYi+XqiQawdL3soQKwgZHu8P8Ugmnu9Pz4izntgQHUgAnwTQb8gNnwyQZwjaXwxQDEgnHxIPysiznynP04gAX33QN4iMn3ZP7ofYn2wPhsjkn3VPsUkv32sQHAi7X0pQCYhGn5lQL8iR35EQUQgc35TP4Mknn6UQZEfyX6wQPkh8n7lP+8fHH9xP5QgRX8LQPsfbX/4P7IflH9dQQwgtn9PQXsg1n8uQDgj939HP6sh/H8sQVEj/3+sPwYk",
          face_count: 126,
          face_offset: 0,
          iso2: "BD",
          iso3: "BGD",
          key: 206,
        }
      ],
      locations: [],
      geom: [],
    }, function () {
      // def.resolve();
      // def = undefined;
    });
    animate();
  }, 500)


  $(document).trigger("panetMainLoaded");

  // ANIMATION LOOP
  function animate() {

    window.requestAnimationFrame(animate);

    if (planet.state != planet.ANIMATED) controls.update();
    planet.update();

    if (composer) composer.render();
    else renderer.render(scene, camera);

    if (stats) stats.update(renderer);
  }

  this.animateIn = function (t, onComplete) {

    t = t || 3;

    TweenLite.to(controls, t, {
      autoRotateSpeed: -.002,
      ease: Sine.easeOut
    });

    camera.updateProjectionMatrix();
    TweenLite.to(camera, t, {
      fov: 60,
      ease: Sine.easeInOut,
      onUpdate: function () {
        camera.updateProjectionMatrix();
      },
      onComplete: function () {
        if (onComplete) onComplete();
      }
    })
  };

  this.animateOut = function (t, onComplete) {

    t = t || 2;

    TweenLite.to(camera, t, {
      fov: 10,
      ease: Sine.easeInOut,
      onUpdate: function () {
        camera.updateProjectionMatrix();
      },
      onComplete: function () {
        if (onComplete) onComplete();
      }
    })
  };

})(kaspersky = kaspersky || {});
//------------------------------------------------------------

var kaspersky;
/*
██████╗ ██╗      █████╗ ███╗   ██╗███████╗████████╗    ██████╗  █████╗ ███████╗███████╗
██╔══██╗██║     ██╔══██╗████╗  ██║██╔════╝╚══██╔══╝    ██╔══██╗██╔══██╗██╔════╝██╔════╝
██████╔╝██║     ███████║██╔██╗ ██║█████╗     ██║       ██████╔╝███████║███████╗█████╗  
██╔═══╝ ██║     ██╔══██║██║╚██╗██║██╔══╝     ██║       ██╔══██╗██╔══██║╚════██║██╔══╝  
██║     ███████╗██║  ██║██║ ╚████║███████╗   ██║       ██████╔╝██║  ██║███████║███████╗
╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝   ╚═╝       ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝
*/

function Planet(main, data, onReady, locationAPI) {

  var $debug = $(".debug");

  var scope = window.PLANET = this;

  scope.main = main;
  var DOMElement = main.renderer.domElement;
  var scene = scope.scene = main.scene;
  var camera = main.camera;

  var radius = scope.radius = 10;        // Radius used to calculate position of tiles
  var ratio = scope.ratio = window.devicePixelRatio || 1;

  // PLANET 3D CONTAINER
  var container = this.container = new THREE.Object3D();
  scene.add(container);

  // 3D CONTAINER FOR OBJECTS LOOKING TO THE CAMERA
  var static_container = this.static_container = new THREE.Object3D();
  scene.add(static_container);
  static_container.matrixAutoUpdate = false;

  var textureLoader = this.textureLoader = new THREE.TextureLoader();

  this.planet_color = 0xa6f5a3;
  this.water_color = 0x81915b;

  // STATES
  scope.LOADING = "loading";
  scope.IDLE = "idle";
  scope.ANIMATED = "animated";
  scope.state = scope.LOADING;

  scope.data = data;

  // sort countries by id
  data.countries_by_id = {};
  for (var i = 0; i < data.countries.length; i++) {
    var l = data.countries[i];
    data.countries_by_id[l.country_id] = l;
  };

  // sort locations by id
  data.locations_by_id = {};
  for (var i = 0; i < data.locations.length; i++) {
    var l = data.locations[i];
    data.locations_by_id[l.location_id] = l;
  }
  //--------------------------------------------



  /*
   ██████╗ ██████╗ ███╗   ███╗███╗   ███╗███████╗███╗   ██╗████████╗    ████████╗██╗██████╗ 
  ██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔════╝████╗  ██║╚══██╔══╝    ╚══██╔══╝██║██╔══██╗
  ██║     ██║   ██║██╔████╔██║██╔████╔██║█████╗  ██╔██╗ ██║   ██║          ██║   ██║██████╔╝
  ██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║          ██║   ██║██╔═══╝ 
  ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║███████╗██║ ╚████║   ██║          ██║   ██║██║     
   ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝          ╚═╝   ╚═╝╚═╝     
  */

  // COMMENTARY TIP
  this._PlanetCommentPopup = PlanetCommentPopup(this.main.$container);

  scope.commentToggle = function (_show) {
    if (!scope._PlanetCommentPopup) return;
    if (_show) scope._PlanetCommentPopup.showRandom();
    else scope._PlanetCommentPopup.hide();
  }

  this.getLocationBriefs = function (location_id, onComplete) {

    var loc = scope.data.locations_by_id[location_id];
    var brief_list = loc.brief_list;

    if (brief_list) {
      if (!!brief_list[PlanetData.YEAR_ID] !== false)
        onComplete(brief_list[PlanetData.YEAR_ID].briefs);
      return;

    } else {

      // locationAPI({ location_id: location_id })
      //   .done(function (locationData) {
      //     brief_list = loc.brief_list = locationData;
      //     if (!!brief_list[PlanetData.YEAR_ID] !== false)
      //       onComplete(brief_list[PlanetData.YEAR_ID].briefs);
      //   });

    }

  }

  // ELEMENTS
  this.drawPoints(radius * 1.1);
  this.drawParticles(radius);
  this.drawBG();
  this.drawSputniks();
  this.drawOrbitas();



  this.planetLocations = new PlanetLocations(this);
  this.planetPointed = new PlanetPointed(this);
  this.planetContour = new PlanetContour(this);



  /*
  ██╗   ██╗██████╗ ██████╗  █████╗ ████████╗███████╗
  ██║   ██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝
  ██║   ██║██████╔╝██║  ██║███████║   ██║   █████╗  
  ██║   ██║██╔═══╝ ██║  ██║██╔══██║   ██║   ██╔══╝  
  ╚██████╔╝██║     ██████╔╝██║  ██║   ██║   ███████╗
   ╚═════╝ ╚═╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
  */

  var camera_dist_to_center;

  this.update = function () {

    camera_dist_to_center = camera.position.distanceToSquared(THREE.Vector3.ZERO) - 100;

    static_container.lookAt(camera.getWorldPosition());
    scope.static_container.updateMatrix();

    // Rotation of the grid sphere
    this.grid_shpere.rotation.y += .0005;

    // MOVEMENT OF DECOR ORBITS
    if (this.orbits) {
      for (var i = 0; i < this.orbits.length; i++) {
        var orbit = this.orbits[i];
        orbit.rotation.x += orbit._increment.x;
        orbit.rotation.y += orbit._increment.y;
        orbit.rotation.z += orbit._increment.z;
      };
    }

    // Movement of space stations
    if (this.sputniks) {
      for (var i = 0; i < this.sputniks.length; i++) {
        var sputnik = this.sputniks[i];
        sputnik.rotation.y += .0020;
      }
    }

    // SPACE JUNK FLOATING AROUND THE PLANET
    if (this.particles) {
      this.particles.rotation.y += .001;
    }

    // PLANET LANDSCAPE MADE OF POINTS
    this.planetPointed.update();
    if (this.updateBg) this.updateBg();

    // Active hexagon update state
    if (active_hexagon) {
      active_hex_dummy.updateMatrix();
      var pos = active_hex_dummy.getWorldPosition();
      var v1 = pos.clone().project(camera);
      v1.x = (v1.x + 1) / 2 * window.canvasWidth;
      v1.y = -(v1.y - 1) / 2 * window.innerHeight;
      active_hexagon.style.transform = "translate(" + v1.x + "px, " + v1.y + "px)";

      // Deactivate picked hexagons when it moves to the negative side of the planet
      if (!this.isInFrontOfPlanet(active_hex_dummy.position)) {
        scope.deactivateHexagon();
      }
    }

    if (this._PlanetCommentPopup) this._PlanetCommentPopup.update();

    if (this.state == this.IDLE && !isMobile.any) {
      chekHover()
    }

  }



  /*
  ██╗███╗   ██╗████████╗███████╗██████╗  █████╗  ██████╗████████╗██╗██╗   ██╗███████╗
  ██║████╗  ██║╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██║██║   ██║██╔════╝
  ██║██╔██╗ ██║   ██║   █████╗  ██████╔╝███████║██║        ██║   ██║██║   ██║█████╗  
  ██║██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗██╔══██║██║        ██║   ██║╚██╗ ██╔╝██╔══╝  
  ██║██║ ╚████║   ██║   ███████╗██║  ██║██║  ██║╚██████╗   ██║   ██║ ╚████╔╝ ███████╗
  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝  ╚═══╝  ╚══════╝
  */
  // INTERACTIVE
  scope.tile_current = null;
  var mouse = new THREE.Vector2(-2, -2);
  var mouse_dir = mouse.clone(); PlanetPointed

  var mouse_moving_distance = 0;

  var intersect_sphere = new THREE.Sphere(scope.container.position.clone(), radius);
  var raycaster = new THREE.Raycaster();

  DOMElement.addEventListener('touchstart', onMouseDown, false);
  DOMElement.addEventListener('touchmove', onMouseMove, false);
  DOMElement.addEventListener('touchend', onMouseUp, false);

  DOMElement.addEventListener('mousedown', onMouseDown, false);
  DOMElement.addEventListener('mousemove', onMouseMove, false);
  DOMElement.addEventListener('mouseup', onMouseUp, false);

  var mx, my, dx, dy;

  function onMouseDown(e) {

    e.preventDefault();

    if (e.touches) {
      var touch = e.touches[0];
      mx = touch.clientX;
      my = touch.clientY;
    } else {
      mx = e.clientX * ratio;
      my = e.clientY * ratio;
    }

    updateMouse(mx, my);
    mouse_moving_distance = 0;
    mouse_is_down = true;

  }


  function onMouseUp(e) {

    mouse_is_down = false;


    if (scope.state != scope.IDLE) return;

    // is it was a click?
    if (mouse_moving_distance > 6) return;

    if (isMobile.any) {

      checkTapOnObject();

    }
  }

  function onMouseMove(e) {

    e.preventDefault();

    if (e.touches) {
      var touch = e.touches[0];
      mx = touch.clientX;
      my = touch.clientY;
    } else {
      mx = e.clientX * ratio;
      my = e.clientY * ratio;
    }

    updateMouse(mx, my);

  }



  function updateMouse(mx, my) {

    dx = Math.abs(mouse.x - mx);
    dy = Math.abs(mouse.y - my);
    mouse_moving_distance += dx * dx + dy * dy;
    mouse.x = mx;
    mouse.y = my;

    if (isMobile.any) {
      mouse_dir.x = (mouse.x / DOMElement.originalSize.width - .5) * 2;
      mouse_dir.y = -(mouse.y / DOMElement.originalSize.height - .5) * 2;
    } else {
      mouse_dir.x = (mouse.x / DOMElement.width - .5) * 2;
      mouse_dir.y = -(mouse.y / DOMElement.height - .5) * 2;
    }
  }



  function chekHover() {

    if (scope.state != scope.IDLE) return;

    var intersection, _location_current;

    raycaster.setFromCamera(mouse_dir, camera);

    // intersection with sphere
    intersection = raycaster.ray.intersectSphere(intersect_sphere);
    if (intersection) {
      _location_current = scope.getClosestLocation(intersection);
    }

    if (_location_current) {

      if (_location_current != scope.location_current) {
        activateHexagon(_location_current);

        return true;
      }

    }

    return false;
  }



  function checkTapOnObject() {
    var intersection, _location_current;

    raycaster.setFromCamera(mouse_dir, camera);

    // intersection with sphere
    intersection = raycaster.ray.intersectSphere(intersect_sphere);
    if (intersection) {
      _location_current = scope.getClosestLocation(intersection);
    }


    if (_location_current) {
      activateHexagon(_location_current, true);
    } else {
      scope.deactivateHexagon();
    }

  }


  /*
  ██╗  ██╗ ██████╗ ██╗   ██╗███████╗██████╗ ███████╗
  ██║  ██║██╔═══██╗██║   ██║██╔════╝██╔══██╗██╔════╝
  ███████║██║   ██║██║   ██║█████╗  ██████╔╝███████╗
  ██╔══██║██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗╚════██║
  ██║  ██║╚██████╔╝ ╚████╔╝ ███████╗██║  ██║███████║
  ╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝
  */
  var location_picked = null;// hexagon_hovered and picked hexagon



  /*
   █████╗  ██████╗████████╗██╗██╗   ██╗███████╗    ██╗  ██╗███████╗██╗  ██╗ █████╗  ██████╗  ██████╗ ███╗   ██╗
  ██╔══██╗██╔════╝╚══██╔══╝██║██║   ██║██╔════╝    ██║  ██║██╔════╝╚██╗██╔╝██╔══██╗██╔════╝ ██╔═══██╗████╗  ██║
  ███████║██║        ██║   ██║██║   ██║█████╗      ███████║█████╗   ╚███╔╝ ███████║██║  ███╗██║   ██║██╔██╗ ██║
  ██╔══██║██║        ██║   ██║╚██╗ ██╔╝██╔══╝      ██╔══██║██╔══╝   ██╔██╗ ██╔══██║██║   ██║██║   ██║██║╚██╗██║
  ██║  ██║╚██████╗   ██║   ██║ ╚████╔╝ ███████╗    ██║  ██║███████╗██╔╝ ██╗██║  ██║╚██████╔╝╚██████╔╝██║ ╚████║
  ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝  ╚═══╝  ╚══════╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝
  */

  // TODO: separate placing of additive prview hexagons
  var active_hex_dummy = new THREE.Object3D();
  active_hex_dummy.matrixAutoUpdate = false;
  this.container.add(active_hex_dummy);

  var active_hexagon = null;//
  var extActiveHexagonHide;// External method to hide DOM element of the active hexagon

  // ACTIVE HEXAGON
  function activateHexagon(_location, mobile) {
    scope.deactivateHexagon();

    main.controls.autoRotate = false;
    scope.location_current = _location;

    // Define an array of nearby locations to view
    location_picked = _location;
    _location.briefs = PlanetData.hasLocationAnyBriefs(location_picked, true);
    _location.briefs_text = PlanetData.hasLocationAnyBriefTexts(location_picked, true);
    _location.works_list = PlanetData.getWorkList(location_picked, true);
    _location.more = PlanetData.getMoreText(location_picked, true);
    ;

    var _locations = [_location];

    // Hit an external method to show defined hexagons
    if (kaspersky.getHexaspherePopup) {

      var o = kaspersky.getHexaspherePopup(_locations, moveToActiveHexagon, mobile);
      active_hexagon = o.element;
      extActiveHexagonHide = o.close;

      var $active_hexagon = $(active_hexagon);
      $active_hexagon.on("mouseleave", onActiveHexagonMouseLeave);

      function onActiveHexagonMouseLeave() {
        scope.deactivateHexagon();
        $active_hexagon.off("mouseleave", onActiveHexagonMouseLeave);
      }
    }

    active_hex_dummy.position.copy(_location.position);

    // Disable Earth constant rotation
    main.controls.autoRotate = false;
    _location.light.visible = false;

    // Hide current commentary
    scope.commentToggle(false);
  }


  this.deactivateHexagon = function () {

    if (!location_picked) return;

    if (typeof extActiveHexagonHide === "function") extActiveHexagonHide();

    active_hexagon = null;

    scope.location_current = null;
    location_picked.light.visible = true;
    location_picked = null;

    main.controls.autoRotate = true;

    // show a commentary
    scope.commentToggle(true);
  }

  var camera_rotator = new THREE.Object3D();
  camera_rotator.up = new THREE.Vector3(0, 1, 0);
  main.scene.add(camera_rotator);
  camera_rotator.matrixAutoUpdate = false;

  function moveToActiveHexagon(location) {
    var navigateUrl;
    var $info = location.years[PlanetData.YEAR_ID];

    if ($info.type === "brief") {
      navigateUrl = langUrl + $info.brief_id;
    } else {
      navigateUrl = langUrl + "locations/" + PlanetData.YEAR_ID + "/" + location.location_id;
    }
    scope.state = scope.ANIMATED;

    main.controls.detach();
    DOMElement.style.cursor = "default";

    scope.deactivateHexagon();

    // hide current commentary
    scope.commentToggle(false);

    // target rotation
    camera_rotator.lookAt(location.position);
    var qend = camera_rotator.quaternion.clone();
    camera_rotator.lookAt(main.camera.position);
    var qstart = camera_rotator.quaternion.clone();
    camera_rotator.updateMatrix();

    var d = main.camera.position.length();
    camera_rotator.add(main.camera);
    main.camera.position.set(0, 0, d);
    main.camera.rotation.set(0, 0, 0);

    scene.updateMatrixWorld();

    // ANIMATE SPHERICAL ROTATION TO ACTIVE HEXAGON
    camera_rotator._anim_progress_ = 0;
    TweenLite.to(camera_rotator, 1.5, {
      _anim_progress_: 1,
      ease: Sine.easeInOut,
      onUpdate: function () {
        THREE.Quaternion.slerp(qstart, qend, camera_rotator.quaternion, camera_rotator._anim_progress_);
        camera_rotator.updateMatrix();
      },
      onComplete: function () {

        TweenLite.to(main.camera.position, 1.2, {
          z: radius * 1.15,
          ease: Sine.easeIn,

          onComplete: function () {

          }
        });

        // show Transition
        setTimeout(kaspersky.Transition.fadeIn, 400);
        setTimeout(function () {

          kaspersky.navigateTo(navigateUrl);
        }, 400);

      }
    });

  }



  // UTILS

  this.isInFrontOfPlanet = function (position) {
    var dist = camera.position.distanceToSquared(position);
    if (dist > camera_dist_to_center) return false;
    return true;
  }

  this.googlePosToUV = function (_u, _v) {
    if (_u === undefined) {
      var a = ('40.705565,-74.1180857').split(",");
      _u = a[0];
      _v = a[1];
    }
    var u = 1 - (parseFloat(_u) + 90) / 180;
    u += .014; if (u > 1) u = u - 1;
    var v = (parseFloat(_v) + 180) / 360;
    v -= .031; if (v < 0) v = 1 + v;

    return { u: u, v: v };
  }


  // INIT THE PLANET
  var _first_year = window.currentYear || PlanetData.year_ids[0];

  onReady();
  main.animateOut(.05, function () {
    scope.showYear(_first_year, undefined, 6);
  });

}



Planet.prototype.getClosestLocation = function (intersection) {

  var _location_current;
  var min = isMobile.any ? .15 : .04;
  var _locations = this.planetLocations.current_locations;

  for (var i = 0; i < _locations.length; i++) {

    var l = _locations[i];

    // if the location object has no briefs
    if (!l.position) continue;
    if (!PlanetData.hasLocationAnyBriefs(l, true)) continue;

    var d = intersection.distanceToSquared(l.position);
    if (d < min) {
      min = d;
      _location_current = l;
      break;
    }
  };

  return _location_current;
}


Planet.prototype.getAnyClosestLocation = function (intersection, except_locations) {

  var _location_current;
  var min = 10000;
  var _locations = this.planetLocations.current_locations;

  for (var i = 0; i < _locations.length; i++) {

    var l = _locations[i];

    if (except_locations && checkExceptions(l)) continue;

    var d = intersection.distanceToSquared(l.position);
    if (d < min) {
      min = d;
      _location_current = l;
    }
  };

  function checkExceptions(l) {
    for (var j = 0; j < except_locations.length; j++) {
      if (except_locations[j] == l) return true;
    };
    return false;
  }

  return _location_current;
}

function Hexagon(scene) {

  var active_color = new THREE.Color(0xffffff);
  var inactive_color = new THREE.Color(0x507e50);

  var mesh = Utils.createHexagon(.5);
  // mesh.up = new THREE.Vector3(0,1,0);
  var material = mesh.material;
  material.transparent = true;
  material.opacity = .4;
  material.blending = THREE.AdditiveBlending;
  material.depthWrite = false;

  mesh._anim_progress = .001;
  mesh.scale.set(mesh._anim_progress, mesh._anim_progress, mesh._anim_progress);

  mesh.setToLocation = function (l) {
    // console.log("setToTile: ", l);
    mesh.location = l;

    mesh.position.copy(l.position);
    mesh.lookAt(new THREE.Vector3());

    material.color = active_color;
    scene.add(mesh);
    mesh.matrixAutoUpdate = true;
    TweenLite.killTweensOf(mesh);
    TweenLite.to(mesh, .2, {
      _anim_progress: .8,// * .8,
      // ease: Sine.easeOut,
      onUpdate: function () {
        mesh.scale.set(mesh._anim_progress, mesh._anim_progress, mesh._anim_progress);
      },
      onComplete: function () {
        mesh.matrixAutoUpdate = false;
      }
    });
  }

  mesh.hide = function (_assets) {
    mesh.matrixAutoUpdate = true;
    TweenLite.killTweensOf(mesh);
    TweenLite.to(mesh, 1, {
      _anim_progress: .001,
      // ease: Sine.easeIn,
      onUpdate: function () {
        mesh.scale.set(mesh._anim_progress, mesh._anim_progress, mesh._anim_progress);
      },
      onComplete: function () {
        scene.remove(mesh);
        _assets.push(mesh);
        mesh.matrixAutoUpdate = false;
      }
    });
  }
  /*
      //
      mesh.setActive = function() {
        // console.log("setActive", mesh.tile);
        if( !mesh.tile ) return;
        mesh.is_active = true;
        TweenLite.killTweensOf( mesh );
        mesh._anim_progress = 0;
          TweenLite.to( mesh, .2, {
              _anim_progress: 1,
              // ease: Sine.easeOut,
              onUpdate: function () {
                var scl = mesh._anim_progress*1+1;
                  mesh.scale.set( scl, scl, scl );
                  mesh.position.copy( mesh.tile.centerPoint ).multiplyScalar( 1 + scl*.05 );
              }
          });
      }
      mesh.setInactive = function( _assets ) {
        // _assets.push( mesh );
        mesh.is_active = false;
        TweenLite.killTweensOf( mesh );
        // mesh._anim_progress = 0;
          TweenLite.to( mesh, .5, {
              _anim_progress: .01,
              // ease: Sine.easeOut,
              onUpdate: function () {
                  mesh.scale.set( mesh._anim_progress, mesh._anim_progress, mesh._anim_progress );
              },
              onComplete: function () {
                  scene.remove( mesh );
                  _assets.push( mesh );
              }
          });
      }
  */
  return mesh;
}
function PlanetLocations(planet) {

  var data = planet.data;
  var data_locations = data.locations;
  var current_container;

  this.current_locations;// a list of locations corresponding to the current year

  var max_opacity = .8;
  var material_yellow = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    color: new THREE.Color(0xffde00),
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  var material_white = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    color: new THREE.Color(0xffffff),
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });


  // !!! fake locations

  // get image links
  var f_images = [];
  for (var i = 0; i < data_locations.length; i++) {
    f_images.push(data_locations[i].preview);
  }



  // make base location shape
  var hex = Utils.createHexagon(.15, false, undefined);
  // additional shape - the ring
  var hex_ring = Utils.createHexagon(.2, false, undefined, .02);
  hex.add(hex_ring);


  var r = planet.radius * 1.005;
  var zero = new THREE.Vector3();


  // METHODS

  this.init = function (_year) {

    var container = new THREE.Object3D();
    container.matrixAutoUpdate = false;

    var _locations = container._locations = [];
    for (var i = 0; i < data_locations.length; i++) {
      var l = data_locations[i];
      _locations.push(l);/// All Locations are available in all Years
    }
    var geo;
    var geo_yellow = new THREE.Geometry();//hex.geometry.clone();
    var geo_white = new THREE.Geometry();//hex.geometry.clone();

    for (var i = 0; i < _locations.length; i++) {

      var l = _locations[i];
      if (!!l.years[_year] === false) continue;
      var l_year_data = l.years[_year];

      // skip a point creation if the location doesn't have any briefs
      if (!l_year_data.briefs) continue;

      // get shorthand to a country object of the location
      l.country = data.countries_by_id[l.country_id];

      var uv = planet.googlePosToUV(l.planet_u, l.planet_v);
      Utils.setFromSpherical(r, uv.v, uv.u, hex.position);
      hex.lookAt(zero);
      hex.updateMatrix();
      hex.updateMatrixWorld();

      geo = l_year_data.works ? geo_yellow : geo_white;
      geo.merge(hex.geometry, hex.matrixWorld);
      geo.merge(hex_ring.geometry, hex_ring.matrixWorld);

      l.position = hex.position.clone();

      // and finaly the ray
      l.light = addLightRay(hex.position, l_year_data.works);
      container.add(l.light);

    };

    var hexs_yellow = new THREE.Mesh(geo_yellow, material_yellow);
    container.add(hexs_yellow);

    var hexs_white = new THREE.Mesh(geo_white, material_white);
    container.add(hexs_white);

    return container;
  }



  this.show = function (_year, t) {
    var year_data = PlanetData.years[_year];

    if (!year_data.locations_container) year_data.locations_container = this.init(_year);
    current_container = year_data.locations_container;
    this.current_locations = current_container._locations;

    planet.container.add(current_container);

    _showMaterial(material_yellow, t);
    _showMaterial(material_white, t);
    showRays(t / 2, t / 2);
  }

  function _showMaterial(mat, t) {

    var _anim = 0;
    var t1 = .3;

    mat.opacity = 0;

    TweenLite.killTweensOf(mat);
    TweenLite.to(mat, t1, {
      delay: t - t1,
      ease: Sine.easeOut
      , onUpdate: function () {
        _anim += 1;
        mat.opacity = Math.round(_anim % 2) * max_opacity;
      }
      , onComplete: function () {
        mat.opacity = max_opacity;
      }
    });

  }

  this.hide = function (t) {

    _hideMaterial(material_yellow, t);
    _hideMaterial(material_white, t);
    hideRays(t / 2);
  }

  function _hideMaterial(mat, t) {

    var _anim = 0;

    TweenLite.killTweensOf(mat);
    TweenLite.to(mat, .3, {
      ease: Sine.easeInOut
      , onUpdate: function () {
        _anim += 1;
        mat.opacity = Math.round(_anim % 2) * max_opacity;
      }
      , onComplete: function () {
        planet.container.remove(current_container);
      }
    });
  }


  /*
  ██████╗  █████╗ ██╗   ██╗███████╗
  ██╔══██╗██╔══██╗╚██╗ ██╔╝██╔════╝
  ██████╔╝███████║ ╚████╔╝ ███████╗
  ██╔══██╗██╔══██║  ╚██╔╝  ╚════██║
  ██║  ██║██║  ██║   ██║   ███████║
  ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
  */

  var _light_material = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: .9,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
    fog: true
  });
  var m = _light_material;
  m.map = planet.textureLoader.load(PlanetData.textures_path + "lightray.jpg");//,
  m.map.wrapT = THREE.ClampToEdgeWrapping;


  var _light_material_yellow = _light_material.clone();
  _light_material_yellow.map = planet.textureLoader.load(PlanetData.textures_path + "lightray_yellow.jpg");//,

  function addLightRay(_pos, has_works) {

    var h = Math.random() * 2 + 1;
    var geometry = new THREE.PlaneBufferGeometry(.3, h, 1);
    var plane = new THREE.Mesh(geometry, has_works ? _light_material_yellow : _light_material);
    var m = new THREE.Matrix4();
    m.makeRotationX(Math.PI / 2);
    m.setPosition(new THREE.Vector3(0, 0, -h / 2));
    geometry.applyMatrix(m);
    // cross plane of ray
    var plane2 = plane.clone();
    plane.add(plane2);
    plane2.rotation.z = Math.PI / 2;
    plane2.matrixAutoUpdate = false;
    plane2.updateMatrix();

    // main ray plane
    plane.position.copy(_pos);
    plane.lookAt(planet.container.position);
    plane.matrixAutoUpdate = false;
    plane.updateMatrix();

    return plane;
  }


  function showRays(t, d) {
    var val = _light_material.map.offset;
    TweenLite.to(val, t, {
      delay: d,
      y: 0,
      ease: Sine.easeInOut
    });
  }

  function hideRays(t) {
    var val = _light_material.map.offset;
    TweenLite.to(val, t, {
      y: -1,
      ease: Sine.easeInOut
    });
  }


}

/*
██████╗  ██████╗ ██╗███╗   ██╗████████╗███████╗
██╔══██╗██╔═══██╗██║████╗  ██║╚══██╔══╝██╔════╝
██████╔╝██║   ██║██║██╔██╗ ██║   ██║   ███████╗
██╔═══╝ ██║   ██║██║██║╚██╗██║   ██║   ╚════██║
██║     ╚██████╔╝██║██║ ╚████║   ██║   ███████║
╚═╝      ╚═════╝ ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
*/
// POINTS
Planet.prototype.drawPoints = function (radius) {
  this.grid_shpere = new THREE.Object3D();
  // XRAY EARTH
  var _geometry = new THREE.SphereGeometry(radius * 1.1, 66, 44);
  var _material = new THREE.XRayMaterial({
    map: this.textureLoader.load(PlanetData.textures_path + "clouds.jpg"),
    alphaProportion: .5,
    color: new THREE.Color(0xfb2f2c5),
    opacity: 1,
    gridOffsetSpeed: .6
  });

  var clouds_mesh = new THREE.Mesh(_geometry, _material);
  clouds_mesh.matrixAutoUpdate = false;
  this.container.add(clouds_mesh);

  var total = _geometry.vertices.length * 3;
  var positions = new Float32Array(total);
  var colors = new Float32Array(total);
  var alphas = new Float32Array(total);
  var color = new THREE.Color(0xffffff);

  for (var i = 0; i < _geometry.vertices.length; i++) {
    var v = _geometry.vertices[i];
    var ii = i * 3;
    positions[ii] = v.x;
    positions[ii + 1] = v.y;
    positions[ii + 2] = v.z;
    colors[ii] = color.r;
    colors[ii + 1] = color.g;
    colors[ii + 2] = color.b;
    alphas[Math.floor(ii / 3)] = Math.random() * .3 + .5;
  };



  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.addAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
  geometry.computeBoundingSphere();


  var shaderMaterial = new THREE.ShaderMaterial(THREE.AlphaColorShader);

  shaderMaterial.depthWrite = false;
  shaderMaterial.uniforms.fogNear.value = 10.0;
  shaderMaterial.uniforms.fogFar.value = 20.0;

  var points = new THREE.Points(geometry, shaderMaterial);
  points.matrixAutoUpdate = false;
  this.grid_shpere.add(points);
}



/*
██████╗  █████╗ ██████╗ ████████╗██╗ ██████╗██╗     ███████╗███████╗
██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║██╔════╝██║     ██╔════╝██╔════╝
██████╔╝███████║██████╔╝   ██║   ██║██║     ██║     █████╗  ███████╗
██╔═══╝ ██╔══██║██╔══██╗   ██║   ██║██║     ██║     ██╔══╝  ╚════██║
██║     ██║  ██║██║  ██║   ██║   ██║╚██████╗███████╗███████╗███████║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝╚══════╝╚══════╝╚══════╝
*/

Planet.prototype.drawParticles = function (radius) {

  var total = 600;
  var positions = new Float32Array(total * 3);
  var color = new THREE.Color(0xfb2f2c5);

  var spherical = new THREE.Spherical();
  var vec3 = new THREE.Vector3();

  // ADDITIVE POINTS
  for (var i = 0; i < total; i++) {
    var ii = i * 3;

    spherical.radius = radius * (1 + Math.random() * .6);
    spherical.theta = Math.random() * 8;
    spherical.phi = .3 + Math.random() * 2.2;
    vec3.setFromSpherical(spherical);

    positions[ii] = vec3.x;
    positions[ii + 1] = vec3.y;
    positions[ii + 2] = vec3.z;
  };

  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
  // geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
  // geometry.addAttribute( 'alpha', new THREE.BufferAttribute( alphas, 1 ) );
  geometry.computeBoundingSphere();

  // var material = new THREE.ShaderMaterial( THREE.AlphaColorShader );
  var material = new THREE.PointsMaterial();
  material.size = .1 / this.ratio;
  material.color = color;
  material.transparent = true;
  material.opacity = .6;
  material.blending = THREE.AdditiveBlending;
  // console.log("shaderMaterial: ", shaderMaterial);
  material.depthWrite = false;
  // shaderMaterial.uniforms.fogNear.value = 0.1;
  // shaderMaterial.uniforms.fogFar.value = 20.0;

  var points = new THREE.Points(geometry, material);
  points.matrixAutoUpdate = false;

  this.particles = new THREE.Object3D();
  this.scene.add(this.particles);
  this.particles.add(points);
}


/*
██████╗ ██╗███╗   ██╗ ██████╗ 
██╔══██╗██║████╗  ██║██╔════╝ 
██████╔╝██║██╔██╗ ██║██║  ███╗
██╔══██╗██║██║╚██╗██║██║   ██║
██║  ██║██║██║ ╚████║╚██████╔╝
╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
*/
// 
Planet.prototype.drawRing = function (position, radius, width, rotation, dont_orient) {

  var geometry = new THREE.RingGeometry(radius, radius + width, 64, 1);
  var m = new THREE.Matrix4();
  if (!dont_orient) {
    m.makeRotationX(Math.PI / 2);
  } else {
    // m.makeRotationY( Math.PI/2 );
    m.setPosition(new THREE.Vector3(0, 0, radius * .29));
  }
  geometry.applyMatrix(m);

  var material = new THREE.MeshBasicMaterial({ color: this.planet_color, side: THREE.DoubleSide });
  material.transparent = true;
  material.opacity = Math.random() * .2 + .1;
  material.blending = THREE.AdditiveBlending;
  material.depthWrite = false;
  // material.fog = false;
  var cylinder = new THREE.Mesh(geometry, material);
  cylinder.rotation.set(rotation.x, rotation.y, rotation.z);
  cylinder.position.set(position.x, position.y, position.z);

  // cylinder.matrixAutoUpdate = false;

  this.container.add(cylinder);
  return cylinder;
}


// ORBITAS
Planet.prototype.drawOrbitas = function () {
  // draw ORBITAS
  this.orbits = [];

  for (var i = 0; i < this.radius; i += 3) {
    // var position = new THREE.Vector3( 0, Math.random() * radius * 2 - radius , 0 );
    var position = new THREE.Vector3(0, i, 0);
    var p = Math.cos(position.y / this.radius);
    // console.log( ">>>", position.y, p );
    p += Math.random() > .8 ? Math.random() * .7 : Math.random() * .2;
    var rotation = new THREE.Vector3(Math.random() * Math.PI, 0, Math.random() * Math.PI);
    // this.drawRing( position, radius * (Math.random()*.4 + .9), Math.random()*.1 + .02,  rotation );
    position.y = 0;
    var orbit = this.drawRing(position, this.radius * 1.1, Math.random() * .05 + .02, rotation);
    var speed_x = Utils.getRandSides(.002);
    var speed_y = Utils.getRandSides(.002);
    var speed_z = Utils.getRandSides(.002);
    orbit._increment = new THREE.Vector3(speed_x, speed_y, speed_z);
    this.orbits.push(orbit);
  };
  // console.log("> ", this.orbits.length);
}

/*
██████╗  ██████╗ 
██╔══██╗██╔════╝ 
██████╔╝██║  ███╗
██╔══██╗██║   ██║
██████╔╝╚██████╔╝
╚═════╝  ╚═════╝ 
*/

Planet.prototype.drawBG = function () {
  // draw BG
  var scope = this;

  var wo = 2560;
  var ho = 1440;
  var scale_coef = 590;

  // var w = this.radius*.5 / 9*16 *5;
  // var h = this.radius*.5 *5;
  var w = wo / scale_coef * this.radius;
  var h = ho / scale_coef * this.radius;

  var g = new THREE.PlaneGeometry(w, h, 1);

  var m = createMaterial("bg.jpg", function () {

    TweenLite.to(m, 3, {
      opacity: 1,
      ease: Sine.easeInOut
    })

  });

  var bg = this.bg = new THREE.Mesh(g, m);
  bg.matrixAutoUpdate = false;
  // bg.position.z = radius*1.5;
  this.static_container.add(bg);

  var patches = [];

  addPatch("bg_fragment_left.jpg", 933, 1011, 219, 0, 0);
  addPatch("bg_fragment_left_1.jpg", 933, 1011, 219, 0, Math.PI);
  addPatch("bg_fragment_right.jpg", 1074, 1133, 1516, 8, Math.PI / 3);
  addPatch("bg_fragment_right_1.jpg", 1074, 1133, 1516, 8, Math.PI / 3 + Math.PI);

  this.updateBg = function (delta) {

    for (var i = 0; i < patches.length; i++) {
      var m = patches[i];
      m.anim_offset += .03;
      m.opacity = Math.sin(m.anim_offset) * .4 + .2;
    };

  }

  function addPatch(img, ww, hh, xx, yy, anim_offset) {

    ww = ww / wo * w;
    hh = hh / ho * h;

    var g = new THREE.PlaneGeometry(ww, hh, 1);
    var m = createMaterial(img);
    // m.blending = 0;
    m.opacity = 1;
    m.anim_offset = anim_offset || 0;
    patches.push(m);

    var mesh = new THREE.Mesh(g, m);
    mesh.position.x = -w / 2 + ww / 2 + xx / wo * w;
    // console.log( -w/2, mesh.position.x );
    mesh.position.y = h / 2 - hh / 2 - yy / ho * h;
    mesh.position.z = .01;

    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();

    bg.add(mesh);

  }


  function createMaterial(img, onLoad) {
    var m = new THREE.MeshBasicMaterial();
    m.fog = !false;
    m.transparent = true;
    m.opacity = 0;
    m.blending = THREE.AdditiveBlending;
    m.depthWrite = false;
    // m.color = new THREE.Color( 0xff0000 );
    // m.wireframe = true;

    m.map = scope.textureLoader.load(PlanetData.textures_path + img, onLoad);
    m.map.generateMipalphaMaps = false;
    m.map.magFilter = THREE.LinearFilter;
    m.map.minFilter = THREE.LinearFilter;

    return m;
  }

}



/*
███████╗██████╗ ██╗   ██╗████████╗███╗   ██╗██╗██╗  ██╗
██╔════╝██╔══██╗██║   ██║╚══██╔══╝████╗  ██║██║██║ ██╔╝
███████╗██████╔╝██║   ██║   ██║   ██╔██╗ ██║██║█████╔╝ 
╚════██║██╔═══╝ ██║   ██║   ██║   ██║╚██╗██║██║██╔═██╗ 
███████║██║     ╚██████╔╝   ██║   ██║ ╚████║██║██║  ██╗
╚══════╝╚═╝      ╚═════╝    ╚═╝   ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
*/
Planet.prototype.drawSputniks = function () {
  // SPUTNIKS
  this.sputniks = [];

  var sputnik1 = this.addSputnik('station_b.js', this.radius * 1.2, this.container, new THREE.Vector3(-.5, 0, 0));
  var sputnik2 = this.addSputnik('station_c.js', this.radius * 1.25, this.container, new THREE.Vector3(.6, 3, -1.2));
}


Planet.prototype.addSputnik = function (name, radius, container, rotation) {

  var scope = this;
  var loader = new THREE.JSONLoader();

  var ring = scope.drawRing(new THREE.Vector3(), radius, .05, new THREE.Vector3());
  var m = ring.material;
  m.opacity = .3;

  loader.load(
    // resource URL
    PlanetData.textures_path + name,
    // Function when resource is loaded
    function (geometry, materials) {

      var m = new THREE.MeshBasicMaterial({ color: scope.planet_color });
      m.wireframe = true;
      // m.transparent = true;
      // m.blending = THREE.AdditiveBlending;
      // m.depthWrite = false;

      var object = new THREE.Mesh(geometry, m);
      object.position.x = -radius;
      object.rotation.x = .5;
      object.scale.set(.03, .03, .03);
      object.matrixAutoUpdate = false;
      object.updateMatrix();
      ring.add(object);
    }
  );

  scope.sputniks.push(ring);

  var ring_container = new THREE.Object3D();
  scope.container.add(ring_container);
  ring_container.add(ring);

  ring_container.rotation.x = rotation.x;
  ring_container.rotation.y = rotation.y;
  ring_container.rotation.z = rotation.z;

  ring_container.matrixAutoUpdate = false;
  ring_container.updateMatrix();

  return ring;
}
function PlanetPointed(planet) {

  var scope = this;

  /// INIT
  var parts_count = 2;
  var u_grid = 250;
  var v_grid = 250;

  var texture = planet.textureLoader.load(PlanetData.textures_path + "dot.png");
  texture.generateMipalphaMaps = false;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;

  var materials = [];
  for (var i = 0; i < parts_count; i++) {
    var m = new THREE.PointsMaterial({ size: .15 / planet.ratio });// 
    m.color = new THREE.Color(0x31b477);
    m.map = texture;
    m.depthWrite = false;
    m.transparent = true;
    m.opacity = 0;
    m.blending = THREE.AdditiveBlending;
    // m.side = THREE.BackSide;//FrontSide;

    var prop = i / parts_count;
    m.t_ = prop * Math.PI * 2;
    m.speed_ = .04;
    m.min_ = Math.random() * .2 + .5;
    m.delta_ = Math.random() * .1 + .1;
    m.opacity_coef_ = 1;

    materials.push(m);
  }

  var current_container;







  var sea_hex_material;

  // METHODS
  this.init = function (_year) {

    var container = new THREE.Object3D();
    container.matrixAutoUpdate = false;

    // LAND

    var sphere_parts = [];

    for (var i = 0; i < parts_count; i++) {
      sphere_parts[i] = {
        positions: [],
        // colors: [],
      };
    };

    var positions = [];
    // var colors = [];

    spherical = new THREE.Spherical();
    spherical.radius = planet.radius;
    var pos = new THREE.Vector3();
    var projectiveImage = PlanetData.years[_year].earth_image;

    // var col = new THREE.Color(0xb1f7a0);
    for (var sv = 0; sv < v_grid; sv++) {
      var st = (u_grid * (1 - Math.sin(sv / v_grid * Math.PI))) / u_grid + .5;
      // console.log(sv,st);
      for (var su = 0; su < u_grid; su += st) {
        var u = su / u_grid;
        var v = sv / v_grid;
        var is_land = projectiveImage.isLandByUV(u, v);
        if (is_land) {
          var o = sphere_parts[Math.floor(Math.random() * parts_count)];
          spherical.theta = u * Math.PI * 2 - Math.PI / 2;
          spherical.phi = v * Math.PI;
          pos.setFromSpherical(spherical);
          o.positions.push(pos.x);
          o.positions.push(pos.y);
          o.positions.push(pos.z);
          // o.colors.push( col.r );
          // o.colors.push( col.g );
          // o.colors.push( col.b );
        }
      }
    };

    // POINTS
    for (var i = 0; i < sphere_parts.length; i++) {
      var o = sphere_parts[i];
      var geometry = new THREE.BufferGeometry();

      var positions_ = new Float32Array(o.positions.length);
      for (var j = 0; j < o.positions.length; j++) {
        positions_[j] = o.positions[j];
      };

      // var colors_ = Float32Array.from( o.colors );
      geometry.addAttribute('position', new THREE.BufferAttribute(positions_, 3));
      // geometry.addAttribute( 'color', new THREE.BufferAttribute( colors_, 3 ) );
      geometry.computeBoundingSphere();

      o.material = materials[i];

      var points = o.mesh = new THREE.Points(geometry, o.material);
      points.matrixAutoUpdate = false;
      container.add(points);
    };





    // SEA HEXS

    var r = planet.radius * .97;

    sea_hex_material = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      color: new THREE.Color(0x31b477),
      blending: THREE.AdditiveBlending,
      // side : THREE.DoubleSide,
      depthWrite: false
      // ,wireframe: true
    });

    // Utils.drawFunction( undefined, 0 );

    var hex = Utils.createHexagon(.12, false, sea_hex_material, .025);
    var geo = new THREE.Geometry();//hex.geometry.clone();
    var step = .01;
    var stp = step;
    var end, xx, y, yy;
    var pi2 = Math.PI * 2;
    var check_offset = .02;
    var row = false;

    for (var _y = -Math.PI + .5; _y < -.6; _y += .04) {
      y = Math.cos(_y) * .5 + .5;
      // console.log(">>", _y, y );
      row = !row;
      stp = Math.abs(step / Math.sin(y * Math.PI));
      end = Math.floor(1 / stp);
      // console.log( y, stp, end );

      for (var x = 0; x < end; x++) {

        xx = .5 + (end / 2 - x - (row ? .5 : 0)) * stp;
        yy = y;

        if (
          Math.random() > .25 ||
          projectiveImage.isLandByUV(xx, yy)
          || projectiveImage.isLandByUV(xx - check_offset, yy)
          || projectiveImage.isLandByUV(xx + check_offset, yy)
          || projectiveImage.isLandByUV(xx, yy - check_offset)
          || projectiveImage.isLandByUV(xx, yy + check_offset)
        ) continue;

        Utils.setFromSpherical(planet.radius * (.97 - Math.random() * .01), xx, yy, hex.position);
        hex.lookAt(THREE.Vector3.ZERO);
        hex.updateMatrix();
        hex.updateMatrixWorld();

        geo.merge(hex.geometry, hex.matrixWorld);

      }
    };

    // console.log("=>", geo );
    var hexs = new THREE.Mesh(geo, sea_hex_material);
    hexs.matrixAutoUpdate = false;
    container.add(hexs);




    return container;
  }



  this.update = function () {
    for (var i = 0; i < materials.length; i++) {
      var m = materials[i];
      m.t_ += m.speed_;
      // o.material.opacity = Math.sin(o.t)*.2+.5;
      m.opacity = (Math.sin(m.t_) * m.delta_ + m.min_) * m.opacity_coef_;
    };
  }


  this.show = function (_year, t) {
    var year_data = PlanetData.years[_year];

    if (!year_data.pointed_sphere) year_data.pointed_sphere = this.init(_year);
    current_container = year_data.pointed_sphere;

    planet.container.add(current_container);

    for (var i = 0; i < materials.length; i++) {
      var m = materials[i];
      TweenLite.killTweensOf(m);
      TweenLite.to(m, t, {
        opacity_coef_: 1,
        ease: Sine.easeInOut,
        onComplete: function () {

        }
      })
    };

    TweenLite.killTweensOf(sea_hex_material);
    TweenLite.to(sea_hex_material, t, {
      opacity: .4,
      ease: Sine.easeInOut
    });
  }


  this.hide = function (t) {

    for (var i = 0; i < materials.length; i++) {
      var m = materials[i];
      TweenLite.killTweensOf(m);
      TweenLite.to(m, t, {
        opacity_coef_: 0,
        ease: Sine.easeInOut,
        onComplete: function () {
          planet.container.remove(current_container);
        }
      })
    };

    TweenLite.killTweensOf(sea_hex_material);
    TweenLite.to(sea_hex_material, t, {
      opacity: 0,
      ease: Sine.easeInOut
    });
  }

}
// LAND CONTOUR
PlanetContour = function (planet) {

  var max_opacity = .8;//.65;

  var _geometry = new THREE.SphereGeometry(planet.radius * .995, 32, 32, 0, Math.PI);
  var m1 = new THREE.MeshBasicMaterial();
  m1.color = new THREE.Color(0x31b477);
  m1.fog = false;
  m1.transparent = true;
  m1.blending = THREE.AdditiveBlending;
  m1.depthWrite = false;

  var sphere1 = new THREE.Mesh(_geometry, m1);
  sphere1.visible = false;
  sphere1.matrixAutoUpdate = false;
  // sphere1.rotation.y = Math.PI * .999;
  sphere1.updateMatrix();
  planet.container.add(sphere1);
  sphere1.matrixAutoUpdate = false;

  // 2nd halfsphere
  var m2 = m1.clone();

  var sphere2 = sphere1.clone();
  sphere2.material = m2;
  planet.container.add(sphere2);
  sphere2.rotation.y = Math.PI;
  sphere2.updateMatrix();




  // METHODS

  this.show = function (_year, t) {
    var year_data = PlanetData.years[_year];

    if (!year_data.contour_texture) {
      var urls = year_data.contour_url;
      year_data.contour_texture = [getTexture(urls[0]), getTexture(urls[1])];
    }

    m1.map = year_data.contour_texture[0];
    m1.map.generateMipalphaMaps = false;
    m1.map.magFilter = THREE.LinearFilter;
    m1.map.minFilter = THREE.LinearFilter;
    m1.needsUpdate = true;

    m2.map = year_data.contour_texture[1];
    m2.map.generateMipalphaMaps = false;
    m2.map.magFilter = THREE.LinearFilter;
    m2.map.minFilter = THREE.LinearFilter;
    m2.needsUpdate = true;

    fadeIn(sphere1, t);
    fadeIn(sphere2, t);
  }



  this.hide = function (t) {
    fadeOut(sphere1, t);
    fadeOut(sphere2, t);
  }





  function getTexture(path) {
    var map = planet.textureLoader.load(path);// PlanetData.textures_path + "contour1_1.png"
    map.generateMipalphaMaps = false;
    map.magFilter = THREE.LinearFilter;
    map.minFilter = THREE.LinearFilter;
    return map;
  }

  function fadeIn(o, t) {
    o.visible = true;
    var m = o.material;
    m.opacity = 0;
    TweenLite.killTweensOf(m);
    TweenLite.to(m, t, {
      opacity: max_opacity,
      ease: Sine.easeInOut
      // ,onComplete: function(){

      // }
    })
  }

  function fadeOut(o, t) {
    var m = o.material;
    TweenLite.killTweensOf(m);
    TweenLite.to(m, t, {
      opacity: 0,
      ease: Sine.easeInOut,
      onComplete: function () {
        // o.visible = false;
      }
    })
  }

}
// COMMENT POPUP
function PlanetCommentPopup($container) {
  var comment_is_shown = false;
  var planet = window.PLANET;
  var shownext_timer;

  var $line = $("<div class='planet-comment-line'>")
    .appendTo($container)
    .hide();

  var $comment = $("<div class='planet-comment'>")
    .appendTo($container)
    .hide();

  var $text = $("<div class='planet-comment-text'>")
    .appendTo($comment)

  var camera = planet.main.camera;

  var comment_dummy = new THREE.Object3D();
  planet.container.add(comment_dummy);

  this.show = function (text, _position, delay, onFinish) {
    if (planet.state != planet.IDLE) {
      setTimeout(show.bind(this, text.name, _position, delay, onFinish), 2000);
      return;
    }

    $line.show();
    $text.text(text.name);
    $text.attr("href", text.id);
    $text.on("click", function () {
      location.href = $(this).attr("href");
    });
    $comment.stop().show(200);
    comment_is_shown = true;

    comment_dummy.position.copy(_position);

    if (delay) {
      clearTimeout(shownext_timer);
      shownext_timer = setTimeout(function () {
        hide(onFinish);
      }, delay);
    }
  }




  this.hide = function (onFinish) {
    clearTimeout(shownext_timer);
    $comment.stop().hide(200, function () {
      $line.hide();
      comment_is_shown = false;
      if (onFinish) onFinish();
    });
  }



  var _timeout;

  this.showRandom = function () {

    var _location;
    var _locations = planet.planetLocations.current_locations;

    clearTimeout(_timeout);
    if (!_locations) {
      _timeout = setTimeout(this.showRandom, 100);
      return;
    }

    for (var i = 0; _locations.length > 0 && i < 10; i++) {
      _location = _locations[~~(Math.random() * _locations.length)];

      if (_location.position && PlanetData.hasLocationAnyBriefs(_location, true) && planet.isInFrontOfPlanet(_location.position)) {
        break;
      }
      _location = null;
    }

    if (!_location) {
      _timeout = setTimeout(this.showRandom, 200);
      return;
    }

    planet.getLocationBriefs(_location.location_id, function (briefs) {

      if (briefs && briefs.length) {
        var brief = briefs[~~(Math.random() * briefs.length)];
        show(brief, _location.position, 3000, showRandom);

      } else {
        _timeout = setTimeout(this.showRandom, 100);

      }

    });
  }




  this.update = function () {
    if (!comment_is_shown) return;

    var pos = comment_dummy.getWorldPosition();
    var v1 = pos.clone().project(camera);
    v1.x = (v1.x + 1) / 2 * window.canvasWidth;
    v1.y = -(v1.y - 1) / 2 * window.innerHeight;

    var v2 = pos.clone().multiplyScalar(1.1).project(camera);
    v2.x = (v2.x + 1) / 2 * window.canvasWidth;
    v2.y = -(v2.y - 1) / 2 * window.innerHeight;

    $comment.css({
      transform: "translate(" + v2.x + "px, " + v2.y + "px)",
      height: "auto",
      width: "auto",
    });

    var w = v1.x - v2.x;
    var h = v1.y - v2.y;
    var scl = Math.sqrt(w * w + h * h) + 1;
    var a = Math.atan2(h + 1, w);

    $line.css({
      transform: "translate(" + (v2.x) + "px, " + (v2.y) + "px) rotate(" + a + "rad)",
      width: scl + "px"
    });

    if (!planet.isInFrontOfPlanet(pos)) showRandom();

  }


  return this;
}

var PlanetData = (function () {

  var scope = this;

  this.textures_path = "./";

  this.YEAR = null;// Current YEAR data container
  this.YEAR_ID = null;// Current year id container

  // YEARS DATA
  this.years = {

    "2030": {
      "earth_url": this.textures_path + "imgs/map.jpg",
      "contour_url": [this.textures_path + "contour1_1.png", this.textures_path + "contour2_1.png"]
      , min_locations: 100
    },

    "2040": {
      "earth_url": this.textures_path + "imgs/map.jpg",
      "contour_url": [this.textures_path + "contour1_1.png", this.textures_path + "contour2_1.png"]
      , min_locations: 50
    },

    "2050": {
      "earth_url": this.textures_path + "imgs/map.jpg",
      "contour_url": [this.textures_path + "contour1_1.png", this.textures_path + "contour2_1.png"]
      , min_locations: 10
    },
  };

  // 
  this.year_ids = [];
  for (var i in this.years) {
    this.year_ids.push(i);
  };

  this.hasLocationAnyBriefs = function (_location, year) {
    // current year
    if (year === true && !!_location.years[scope.YEAR_ID]) {
      return _location.years[scope.YEAR_ID].briefs;

      // specified year
    } else if (year !== undefined && !!_location.years[year]) {
      return _location.years[year].briefs;

    }

    // any year
    for (var i in _location.years) {
      var briefs = _location.years[i].briefs;
      if (briefs) return briefs;
    };

    return 0;

  }

  this.hasLocationAnyBriefTexts = function (_location, year) {

    // current year
    if (year === true) {

      return _location.years[scope.YEAR_ID].briefs_text;

      // specified year
    } else if (year !== undefined) {

      return _location.years[year].briefs_text;

    }

    // any year
    for (var i in _location.years) {
      var briefs = _location.years[i].briefs;
      if (briefs) return _location.years[i].briefs_text;
    };

    return 0;

  }

  this.getWorkList = function (_location, year) {
    if (year == true) {
      return _location.years[scope.YEAR_ID].works_list;
    } else if (year !== undefined) {
      return _location.years[year].works_list;
    }

    return 0;
  }

  this.getMoreText = function (_location, year) {
    if (year == true) {
      return _location.years[scope.YEAR_ID].more_btn;
    } else if (year !== undefined) {
      return _location.years[year].more_btn;
    }

    return 0;
  }

  return this;

})();
/*
██╗   ██╗███████╗ █████╗ ██████╗ ███████╗
╚██╗ ██╔╝██╔════╝██╔══██╗██╔══██╗██╔════╝
 ╚████╔╝ █████╗  ███████║██████╔╝███████╗
  ╚██╔╝  ██╔══╝  ██╔══██║██╔══██╗╚════██║
   ██║   ███████╗██║  ██║██║  ██║███████║
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
*/

Planet.prototype.showYear = function (_year, onReady) {

  var scope = this;
  // console.log(">>>! ", this.main.controls.autoRotate );

  if (PlanetData.YEAR_ID) {
    this.hidePlanet(_year, onReady);
    return;
  }

  PlanetData.YEAR_ID = _year;
  PlanetData.YEAR = PlanetData.years[_year];

  if (PlanetData.YEAR.earth_image) {

    show();

  } else {

    PlanetData.YEAR.earth_image = this.projectiveImage = new ProjectiveImage(PlanetData.YEAR.earth_url, show);
  }

  $(".timeline").css("pointer-events", "none");

  function show() {

    var t = 2.25;
    scope.main.animateIn(t, function () {
      scope.state = scope.IDLE;
      scope.commentToggle(true);
      $(".timeline").css("pointer-events", "auto");
    });

    t = t / 3 * 2;
    scope.planetLocations.show(_year, t);
    scope.planetPointed.show(_year, t);
    scope.planetContour.show(_year, t);

    if (onReady) onReady();

    // show commentary tip
    if (scope._PlanetCommentPopup) scope._PlanetCommentPopup.showRandom();
  }

}

Planet.prototype.hidePlanet = function (_year, onReady, t) {


  this.state = this.ANIMATED;
  var scope = this;
  // console.log("hidePlanet");
  this.deactivateHexagon();

  $(".timeline").css("pointer-events", "none");
  scope.commentToggle(false);

  if (t === undefined) t = 1.5;

  this.main.animateOut(t, function () {
    PlanetData.YEAR_ID = undefined;
    scope.showYear(_year, onReady);
    // $(".timeline").css( "pointer-events", "auto" );
  });

  scope.planetLocations.hide(t / 2);
  scope.planetPointed.hide(t / 2);
  scope.planetContour.hide(t / 2);

  if (this._PlanetCommentPopup) this._PlanetCommentPopup.hide();

}
THREE.Text = function (params) {

  // params.text
  // params.font_propotion
  // params.font
  // params.width
  // params.height
  // params.transparent
  // params.offset_x
  // params.offset_y
  // params.multiplier
  // params.fillStyle
  // params.debug

  var scope = this;
  scope.offset_x = params.offset_x || 0;
  scope.border_x = params.border_x || 0;
  scope.offset_y = params.offset_y || 0;
  scope.font = params.font || "Arial";
  scope.font_propotion = params.font_propotion || 20;
  // scope.multiplier = params.multiplier || 1;
  scope.fillStyle = params.fillStyle || "rgba(255,0,0, 0.95)";
  scope.fontStyle = params.fontStyle || "";

  // scope.pow_coef_x = 1;

  var canvas = scope.canvas = document.createElement('canvas');
  var context = scope.context = canvas.getContext('2d');
  if (params.debug) {
    document.body.appendChild(canvas);
    // $(canvas).css({ position: "absolute", top: 0, left: 0 });
    canvas.style.position = "absolute";
    canvas.style.top = 0;
    canvas.style.left = 0;
  }

  var texture = new THREE.Texture(canvas)
  texture.needsUpdate = true;
  texture.generateMipmaps = false;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  // texture.repeat.x = - 1;
  texture.needsUpdate = true;

  var material = new THREE.MeshBasicMaterial({ map: texture });
  material.transparent = params.transparent || false;
  material.side = params.side == undefined ? THREE.DoubleSide : params.side;
  material.depthWrite = !true;
  // material.wireframe = true;

  var g = new THREE.PlaneGeometry(1, 1);
  var m = new THREE.Matrix4();
  m.setPosition(new THREE.Vector3(.5, .5, 0));
  g.applyMatrix(m);

  // var material_test = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

  var mesh = scope.mesh = new THREE.Mesh(g, material);
  mesh.matrixAutoUpdate = false;
  mesh.visible = false;

  mesh.setSize = function (width, height) {
    // console.log("setSize: ", width);

    mesh.width = width;
    mesh.height = height;

    var w = mesh.canvas_vis_width = Math.floor(width * 100);
    var h = mesh.canvas_vis_height = Math.floor(height * 100);
    var wc = Utils.nearestPow2(w);
    var hc = Utils.nearestPow2(h);
    canvas.width = wc;
    canvas.height = hc;
    texture.repeat.x = mesh.pow_coef_x = w / wc;
    texture.repeat.y = mesh.pow_coef_y = h / hc;
    texture.offset.y = (1 - texture.repeat.y);
    // console.log( "setSize>> W:", width, w, wc, mesh.pow_coef_x );
    // console.log( "setSize>> H:", height, h, hc, mesh.pow_coef_y );
    mesh.scale.set(width, height, 1);
    mesh.updateMatrix();
  }

  mesh.setWidth = function (text) {
    var w;
    if (typeof text == "string") {// get width from text
      setupText();
      w = (context.measureText(text).width + scope.offset_x + scope.border_x) / 100;
      // console.log("setWidth: ", text, w );
      // console.log(">: ", scope.offset_x, scope.border_x );
    } else w = text;

    mesh.setSize(w, params.height);

    return w;

  }

  mesh.setText = function (text, width) {
    // console.log("\n");
    // console.log("setText: ", scope.offset_x );

    mesh.setWidth(width || text);

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (mesh.prefill) mesh.prefill.apply(scope);

    // console.log( ">>> ", context.font );

    // debug !!!
    // context.fillStyle = "#FF0000";
    // // context.fillRect( 0, 0, mesh.canvas_vis_width, mesh.canvas_vis_height );
    // context.fillRect( 0, 0, canvas.width, canvas.height );
    // debug !!!


    setupText();
    // context.fillStyle = "#000000";
    context.fillText(text, scope.offset_x, mesh.canvas_vis_height / 2);

    texture.needsUpdate = true;
  }

  function setupText() {
    scope.font_height = scope.font_propotion * mesh.canvas_vis_height;
    context.font = scope.fontStyle + " " + (scope.font_height) + 'px ' + scope.font;//"Bold 40px Arial";
    context.fillStyle = scope.fillStyle;
    context.textBaseline = "middle";
  }
  // mesh.setText( "init" );


  mesh.show = function (_delay) {
    mesh.scale.x = .001;
    mesh.matrixAutoUpdate = true;
    TweenLite.killTweensOf(mesh.scale);
    TweenLite.to(mesh.scale, .2, {
      delay: _delay,
      x: Math.floor(mesh.width),
      ease: Sine.easeOut,
      onStart: function () {
        mesh.visible = true;
      },
      onComplete: function () {
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
      }
    });
  }

  mesh.hide = function (_delay) {
    if (!mesh.visible) return;
    mesh.scale.x = 0;
    mesh.matrixAutoUpdate = true;
    TweenLite.killTweensOf(mesh.scale);
    TweenLite.to(mesh.scale, .2, {
      delay: _delay,
      x: .001,
      ease: Sine.easeIn,
      onComplete: function () {
        mesh.visible = false;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
      }
    });
  }

  return mesh;
}
// IMAGE
function ProjectiveImage(_img_url, _onload) {

  var projectionContext;

  var img = document.createElement("img");
  img.src = _img_url;
  img.onload = function () {
    var projectionCanvas = document.createElement('canvas');
    projectionContext = projectionCanvas.getContext('2d');
    projectionCanvas.width = img.width;
    projectionCanvas.height = img.height;
    projectionContext.drawImage(img, 0, 0, img.width, img.height);
    if (_onload) _onload();
  }

  var pixelData = null;

  var maxLat = -100;
  var maxLon = 0;
  var minLat = 0;
  var minLon = 0;

  this.isLand = function (lat, lon) {

    var x = parseInt(img.width * (lon + 180) / 360);
    var y = parseInt(img.height * (lat + 90) / 180);

    if (pixelData == null) {
      pixelData = projectionContext.getImageData(0, 0, img.width, img.height);
    }
    return pixelData.data[(y * pixelData.width + x) * 4] === 0;
  };

  this.isLandByUV = function (u, v) {
    if (pixelData == null) {
      pixelData = projectionContext.getImageData(0, 0, img.width, img.height);
    }
    var x = parseInt(img.width * u);
    var y = parseInt(img.height * v);
    return pixelData.data[(y * pixelData.width + x) * 4] === 0;
  };

  this.getUV = function (lat, lon) {
    return {
      x: (lon + 180) / 360,
      y: (lat + 90) / 180
    }
  }

  this.getUVOfPI = function (lat, lon) {
    return {
      x: (lon + Math.PI) / Utils.PI2,
      y: (lat + Utils.PIh) / Math.PI
    }
  }
}

var Utils = new function () {

  this.getHalfPoint = function (p1, p2) {
    var p1 = new THREE.Vector3(p1.x, p1.y, p1.z);
    var p2 = new THREE.Vector3(p2.x, p2.y, p2.z);
    var b2 = p2.sub(p1).divideScalar(2).add(p1);
    return b2;
  }

  this.getRandSides = function (value) {
    return Math.random() * value * 2 - value;
  }

  this.PIh = Math.PI / 2;
  this.PI2 = Math.PI * 2;

  THREE.Vector3.ZERO = new THREE.Vector3();

  this.createHexagon = function (h, orient, material, ring_width) {
    var g = ring_width ? new THREE.RingGeometry(h, h + ring_width, 32, 1) : new THREE.CircleGeometry(h, 32);
    if (orient) {
      var m = new THREE.Matrix4();
      m.identity().makeRotationX(Math.PI / 2); g.applyMatrix(m);
      m.identity().makeRotationY(Utils.PI2 / 6 / 2); g.applyMatrix(m);
    }

    if (!material) var material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    material.side = THREE.BackSide;
    var mesh = new THREE.Mesh(g, material);
    mesh.matrixAutoUpdate = false;

    return mesh;
  }

  this.orientHexagon = function (mesh, t, look_at_corner) {
    var up_coef = 10;
    mesh.position.copy(t.centerPoint);
    // mesh.scale.set( t.width, t.width, t.width );
    // mesh.scale.set( .001, .001, .001 );
    mesh.up.set(t.centerPoint.x * up_coef, t.centerPoint.y * up_coef, t.centerPoint.z * up_coef);
    if (look_at_corner) mesh.lookAt(t.boundary[0]);
    // mesh.updateMatrix();
  }

  this.nearestPow2 = function (aSize) {
    return Math.pow(2, Math.ceil(Math.log(aSize) / Math.log(2)));
  }

  this.setFromSpherical = function (radius, u, v, vec3) {
    var spherical = new THREE.Spherical();
    spherical.radius = radius;
    spherical.theta = u * Math.PI * 2 - Math.PI / 2;
    spherical.phi = v * Math.PI;
    if (!vec3) vec3 = new THREE.Vector3();
    vec3.setFromSpherical(spherical);
    return vec3;
  }

}


Utils.getEventCursorPosition = function (e, mouse_obj) {
  var pos;
  var touches = e.originalEvent.touches;
  if (touches) pos = touches.length ? touches[0] : e.originalEvent.changedTouches[0];
  else pos = e;

  if (mouse_obj) {
    mouse_obj.x = pos.clientX;
    mouse_obj.y = pos.clientY;
    return;
  }

  return { x: pos.clientX, y: pos.clientY };
}

Utils.getEventCursorPositionOrientation = function (e, mouse_obj) {
  Util.getEventCursorPosition(e, mouse_obj);
  mouse_obj.x = (mouse_obj.x / window.innerWidth) * 2 - 1;
  mouse_obj.y = - (mouse_obj.y / window.innerHeight) * 2 + 1;
}

Utils.get2dPosition = function (position, camera, dom_element) {
  var v = position.clone().project(camera);
  v.x = (v.x + 1) / 2 * dom_element.innerWidth;
  v.y = -(v.y - 1) / 2 * dom_element.innerHeight;// - window.innerHeight * .08;
  return v;
}



Utils.drawFunction = function (start, end, foo, step, amplitude) {

  console.log('====================================');

  start = start == undefined ? -Math.PI : start;
  end = end == undefined ? Math.PI : end;
  step = step == undefined ? .1 : step;
  amplitude = amplitude == undefined ? 30 : amplitude;
  foo = foo == undefined ? function (v) { return Math.cos(v) } : foo;

  var count = 0;

  for (var y = start; y < end; y += step) {
    var str = '';
    for (var i = 0; i < amplitude * 2; i++) {
      str += i == amplitude ? ':' : "-";
    };
    var p = foo(y);
    var x = Math.round(p * amplitude) + amplitude;
    str = str.substr(0, x) + "*" + str.substr(x + 1);
    console.log(count + " |" + str, x);
    count++; if (count >= 10) count = 0;
  }
  console.log('====================================');
}












// FAKE EXTERNAL METHODS
/*
var kaspersky = kaspersky || {};
(function(){
    
    var $DOMElement = $("<div id='active_hexagon' style='\
        position:fixed;\
        top: 0;\
        left: 0;\
        width: 100px;\
        height: 100px;\
        background: red;\
        display: none;\
    '>").appendTo( $("html") );
    if( !kaspersky.getHexaspherePopup ) kaspersky.getHexaspherePopup = function( data, onClick ){
        console.log( "getHexaspherePopup> ", data );
        $DOMElement.show();
        $DOMElement.off().click( function(){
            onClick( data[0] );
        });
        
        return {
            "element": $DOMElement[0],
            "close": function(){
                $DOMElement.hide();
                console.log( "The active hexagon close!" );
            } //закрытие окна
        }
    }
})();
*/
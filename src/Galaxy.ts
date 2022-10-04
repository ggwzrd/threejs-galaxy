import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  ShaderMaterial,
  sRGBEncoding,
  PlaneBufferGeometry,
  InstancedBufferGeometry,
  InstancedBufferAttribute,
  DoubleSide,
  TextureLoader,
  Color,
  Vector3,
  Vector4,
  Mesh,
  Object3D,
} from "three"

import { doesNeedResize, lerp } from "./helpers"

import spiral from './glsl/spiral.glsl';
import barredSpiral from './glsl/barred-spiral.glsl';
import fragment from './glsl/fragment.glsl';

class Galaxy {
  private canvas: HTMLElement;
  private type: GalaxyTypes;
  private layers: Layer[];
  private window: Window;

  camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private materials: ShaderMaterial[];
  private stopAnimation: boolean;

  constructor(opts: GalaxyOptions) {
    this.canvas = opts.canvas;
    this.type = opts.type || "barred-spiral";
    this.layers = opts.layers
    this.window = opts.window || window
    this.materials = []

    this.renderer = new WebGLRenderer({ canvas: this.canvas });
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      70,
      this.window.innerWidth / this.window.innerHeight,
      0.000000000001,
      1000,
    );

    this.renderer.setClearColor(opts.backgroundColor || 0x000000, 1);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = sRGBEncoding
    this.camera.position.set(0, 3, 2);
    this.stopAnimation = false
   
    this.generate = this.generate.bind(this)
    this.resize = this.resize.bind(this)
    this.render = this.render.bind(this)
    this.animate = this.animate.bind(this)
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)
    this.trackMouse = this.trackMouse.bind(this)

    this.layers.forEach(this.generate);
  }

  private generate(layer: Layer) {
    const {
      count,
      color,
      texture,
      sizeAmp = 1,
      minRadius = 0.2,
      maxRadius = 2,
      speedAmp = 1,
      yAmp = 1,
    } = layer
    let particlegeo = new PlaneBufferGeometry(1, 1);
    let geo = new InstancedBufferGeometry();
    geo.instanceCount = count
    geo.setAttribute("position", particlegeo.getAttribute("position"))
    geo.index = particlegeo.index

    let pos = new Float32Array(count * 3)

    for (let index = 0; index < count; index++) {
      let theta = Math.random() * 2 * Math.PI;
      let r = lerp(minRadius, maxRadius, Math.random());
      let x = r * Math.sin(theta);
      let y = (Math.random() - 0.05) * (lerp(0.2, 0.1, Math.random()) * yAmp);
      let z = r * Math.cos(theta);

      pos.set([
        x, y, z,
      ], index * 3)

    }

    geo.setAttribute('pos', new InstancedBufferAttribute(pos, 3, false))

    const material = new ShaderMaterial({
      extensions: {
        derivatives: true,
      },
      side: DoubleSide,
      uniforms: {
        uTexture: { value: new TextureLoader().load(texture) },
        uColor: { value: new Color(color) },
        uSizeAmp: { value: sizeAmp },
        uSpeedAmp: { value: speedAmp },
        uYTwistAmp: { value: yAmp },
        uMouse: { value: new Vector3() },
        time: { value: 0 },
        resolution: { value: new Vector4() },
      },
      // wireframe: true,
      transparent: true,
      depthTest: false,
      vertexShader: barredSpiral,
      fragmentShader: fragment,
    })

    this.materials.push(material)

    const points = new Mesh(geo, material);
    this.scene.add(points)
  }

  resize() {
    if (doesNeedResize(this.renderer)) {
      const pixelRatio = Math.min(this.window.devicePixelRatio);
      const width = this.canvas.clientWidth * pixelRatio | 0;
      const height = this.canvas.clientHeight * pixelRatio | 0;
      const canvas = this.renderer.domElement;

      this.renderer.setPixelRatio(pixelRatio)
      this.renderer.setSize(width, height, false);

      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }
  }

  add(object: Object3D) {
    this.scene.add(object)
  }

  render() {
    this.resize()
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    this.render()
    this.materials.forEach(m => m.uniforms.time.value += 1)
  }

  play() {
    this.stopAnimation ? this.render() : this.animate();

    requestAnimationFrame(this.play);
  }

  stop() {
    this.stopAnimation = true
  }

  trackMouse(xyz: Vector3) {
    this.materials.forEach(m => m.uniforms.uMouse.value = xyz)
  }
}

export default Galaxy;

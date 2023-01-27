import { VSMShadowMap, WebGLRenderer } from 'three';

import World from '../world/World';
import GameCamera from './gameCamera/GameCamera';
import Stats from 'three/examples/jsm/libs/stats.module';
import PostprocessorManager from './postprocessorManager/PostprocessorManager';
import LoopsManager from '../loopsManager/LoopsManager';

export default class Renderer {
  private static renderer: WebGLRenderer | null = null;
  private static postprocessorManager: PostprocessorManager | null = null;
  private static stats = Stats();
  private static canvas: HTMLCanvasElement | null = null;

  static init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    GameCamera.init(canvas);

    const renderer = new WebGLRenderer({
      canvas,
    });
    this.renderer = renderer;

    renderer.setClearColor(0x00ffff);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = VSMShadowMap;

    window.addEventListener('resize', this.setSize);
    this.setSize();
    LoopsManager.subscribe('render', this.render);

    this.postprocessorManager = new PostprocessorManager(renderer);
  }

  private static setSize = () => {
    const windowPixelRatio = 1;
    const windowWidth = +window.innerWidth * windowPixelRatio;
    const windowHeight = +window.innerHeight * windowPixelRatio;

    const renderer = this.renderer;

    if (!renderer) {
      console.error('[Renderer setSize] renderer undefined');
      return;
    }

    renderer.setSize(windowWidth, windowHeight, false);
    renderer.setPixelRatio(windowPixelRatio);

    const { canvas } = this;
    if (!canvas) {
      throw new Error('[Renderer setSize] canvas undefined');
    }

    const camera = GameCamera.getCamera();

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    if (this.postprocessorManager) {
      this.postprocessorManager.setSize(windowWidth, windowHeight);
    }
  };

  static dispose() {
    document.removeEventListener('resize', this.setSize);
    this.renderer?.dispose();
  }

  static render = () => {
    this.stats.update();
    if (this.postprocessorManager && this.postprocessorManager.isDisabled() === false) {
      this.postprocessorManager.render();
    } else {
      this.renderer?.render(World.getScene(), GameCamera.getCamera());
    }
  };
}
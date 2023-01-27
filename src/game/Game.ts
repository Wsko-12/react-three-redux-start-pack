// import World from './world/World';

import LoopsManager from "./loopsManager/LoopsManager";
import Renderer from "./renderer/Renderer";
import World from "./world/World";

export default class Game {
  static init = async (canvas: HTMLCanvasElement) => {
    LoopsManager.init();
    // World must be first because its creates Scene
    // and then Renderer use this Scene by World.getScene()
    World.init();
    Renderer.init(canvas);
    LoopsManager.start();
  };
}
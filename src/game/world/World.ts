import { Mesh, MeshBasicMaterial, Scene } from 'three';
import Assets from '../../assets/Assets';

export default class World {
  static scene: Scene | null = null;
  static init() {
    const scene = new Scene();
    this.scene = scene;
    
    const geometry = Assets.getGeometry('test');
    const texture = Assets.getTexture('test');
    
    const mesh = new Mesh(geometry, new MeshBasicMaterial({map: texture}))
    this.scene.add(mesh);
  }

  static getScene() {
    if (!this.scene) {
      throw new Error('[World getScene] scene undefined');
    }
    return this.scene;
  }
}
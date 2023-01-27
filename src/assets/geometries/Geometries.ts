import { geometriesAtlas } from './atlas';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { BufferGeometry } from 'three';
import { EAssetType, TAssetsLoadingStatus } from '../Assets';

class Geometries {
    static loaded: Record<string, BufferGeometry> = {};
    static load = (loadingCb: TAssetsLoadingStatus) => {
        return new Promise((res) => {
            const loader = new GLTFLoader();
            let index = -1;
            const load = () => {
                index++;
                loadingCb(EAssetType.geometry, index/geometriesAtlas.length)
                if (!geometriesAtlas[index]) {
                    res(true);
                    return;
                }
                const data = geometriesAtlas[index];
                const path = process.env.PUBLIC_URL + '/assets/geometries/' + data.folder + '/' + data.file;
                loader.load(path, (model) => {
                    const mesh = model.scene.children[0] as THREE.Mesh;
                    this.loaded[data.name] = mesh.geometry;
                    load();
                });
            };
            load();
        });
    };

    static get(name: string) {
        return this.loaded[name];
    }
}
export default Geometries;

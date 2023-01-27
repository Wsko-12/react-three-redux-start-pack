import { NearestFilter, Texture, TextureLoader } from 'three';
import { EAssetType, TAssetsLoadingStatus } from '../Assets';
import { textureAtlas } from './atlas';

class Textures {
    static loaded: Record<string, Texture> = {};
    static load(loadingCb: TAssetsLoadingStatus) {
        return new Promise((res) => {
            const loader = new TextureLoader();
            let index = -1;
            const load = () => {

                index++;
                loadingCb(EAssetType.texture, index/textureAtlas.length);
                if (!textureAtlas[index]) {
                    res(true);
                    return;
                }

                const data = textureAtlas[index];
                const path = process.env.PUBLIC_URL + '/assets/textures/' + data.folder + '/' + data.file;
                loader.load(path, (texture) => {
                    texture.flipY = false;
                    texture.magFilter = NearestFilter;
                    this.loaded[data.name] = texture;
                    load();
                });
            };
            load();
        });
    }

    static get(name: string) {
        return this.loaded[name];
    }
}
export default Textures;

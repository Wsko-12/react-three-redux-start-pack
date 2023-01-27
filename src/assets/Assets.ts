import { setAssetsLoadingStatus } from '../store/slices/gameSlice/gameSlice';
import { store } from '../store/store';
import Geometries from './geometries/Geometries';
import Images from './images/Images';
import Textures from './textures/Textures';
export enum EAssetType {
    geometry = 'geometry',
    texture = 'texture',
    image = 'image',
}

export interface AtlasItem {
    name: string;
    folder: string;
    file: string;
}

export type TAssetsLoadingStatus = (asset: EAssetType , progress: number) => void
class Assets {
    static load = async () => {
        const loadingCb: TAssetsLoadingStatus = (asset, progress) => {
            store.dispatch(setAssetsLoadingStatus({asset, progress}))
        };
        await Textures.load(loadingCb);
        await Images.load(loadingCb);
        await Geometries.load(loadingCb);
        return true;
    };

    static getTexture(name: string) {
        return Textures.get(name);
    }
    static getGeometry(name: string) {
        return Geometries.get(name);
    }
}

export default Assets;


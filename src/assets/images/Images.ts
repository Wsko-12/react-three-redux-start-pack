import { EAssetType, TAssetsLoadingStatus } from '../Assets';
import { imagesAtlas } from './atlas';

export default class Images {
    static loaded: Record<string, HTMLImageElement> = {};
    static load(loadingCb: TAssetsLoadingStatus) {
        return new Promise((res) => {
            let index = -1;
            const load = () => {
                
                index++;
                loadingCb(EAssetType.image, index/imagesAtlas.length)

                if (!imagesAtlas[index]) {
                    res(true);
                    return;
                }

                const data = imagesAtlas[index];
                const path = process.env.PUBLIC_URL + '/assets/images/' + data.folder + '/' + data.file;

                const img = new Image();
                img.src = path;
                img.onload = () => {
                    this.loaded[data.name] = img;
                    load();
                };
            };
            load();
        });
    }
}

import React, { memo } from 'react';
import { EAssetType } from '../../../assets/Assets';
import { selectAssetsLoadingStatus } from '../../../store/slices/gameSlice/gameSelectors';
import { useAppSelector } from '../../../store/store';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';


const getTitle = (asset: EAssetType) => {
    switch (asset) {
        case EAssetType.geometry: 
            return 'Loading geometries';
        case EAssetType.image: 
            return 'Loading image';
        case EAssetType.texture: 
            return 'Loading textures';
        default: 
            return 'Loading';
    }
}

export const AssetsLoadingScreen = memo(() => {
    const assetsStatus = useAppSelector(selectAssetsLoadingStatus);

    const title = getTitle(assetsStatus.asset);

    return (
        <LoadingScreen title={title} progress={assetsStatus.progress} />
    );
});

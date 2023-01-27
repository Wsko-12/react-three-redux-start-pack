import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EAssetType } from "../../../assets/Assets";

export enum EGameStatuses {
    started = 'started',
    loading = 'loading',
    assetsLoading = 'assetsLoading',
    lobby = 'lobby',
}

interface IGameState {
    process: EGameStatuses,
    assetsLoadingStatus: {
        asset: EAssetType,
        progress: number,
    }
}

const initialState: IGameState = {
    process: EGameStatuses.lobby,
    assetsLoadingStatus: {
        asset: EAssetType.texture,
        progress: 0,
    }
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameStatus: (state, action: PayloadAction<EGameStatuses>) => {
            state.process = action.payload;
        },

        setAssetsLoadingStatus: (state, action: PayloadAction<IGameState['assetsLoadingStatus']>) => {
            state.assetsLoadingStatus = action.payload;
        },
    }
});

export default gameSlice.reducer;

export const {setGameStatus, setAssetsLoadingStatus} = gameSlice.actions;
import { RootState } from "../../store";

export const selectGameProcess = (state: RootState) => state.game.process;
export const selectAssetsLoadingStatus = (state: RootState) => state.game.assetsLoadingStatus;
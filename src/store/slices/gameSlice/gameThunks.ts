import { createAsyncThunk } from "@reduxjs/toolkit";
import Assets from "../../../assets/Assets";
import { EGameStatuses, setGameStatus } from "./gameSlice";

export const startGame = createAsyncThunk('game/start', async (_, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(setGameStatus(EGameStatuses.assetsLoading));
    await Assets.load();
    dispatch(setGameStatus(EGameStatuses.started));
});
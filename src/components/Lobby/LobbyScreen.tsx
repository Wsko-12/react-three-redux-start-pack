import { memo } from "react";
import { selectGameProcess } from "../../store/slices/gameSlice/gameSelectors";
import { EGameStatuses } from "../../store/slices/gameSlice/gameSlice";
import { startGame } from "../../store/slices/gameSlice/gameThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";

export const LobbyScreen = memo(() => {
    const gameStatus = useAppSelector(selectGameProcess);
    const dispatch = useAppDispatch();

    if(gameStatus !== EGameStatuses.lobby) {
        return null;
    }

    return <button onClick={() => dispatch(startGame())}>Start Game</button>
})
import React, { memo, useEffect, useRef } from 'react';
import Game from '../../game/Game';

export const GameCanvas = memo(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        if (canvasRef.current) {
            Game.init(canvasRef.current);
        }
    }, []);
    return (
        <canvas ref={canvasRef} style={{position: 'fixed'}}/>
    );
});

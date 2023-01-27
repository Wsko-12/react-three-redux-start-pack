import React, { memo } from 'react';
import style from './loading-screen.module.scss';
interface ILoadingScreenProps {
    title: string,
    progress: number,
}

const LoadingScreen = memo<ILoadingScreenProps>(({title, progress}) => {
    return (
        <div className={style.container}>
            <h3 className={style.title}>{title}</h3>
            <h3 className={style.progress}>{Math.floor(progress * 100)}%</h3>
        </div>
    );
});

export default LoadingScreen;
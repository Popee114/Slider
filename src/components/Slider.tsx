import { useEffect, useState } from 'react';
import styles from './Slider.module.css';

export interface SliderItem {
    id: any;
    label?: string;
    image: any;
    width?: number;
    height?: number;
};

type ScliderProps = {
    screenWidth: number;
    sliderItems: SliderItem[];
};

export const Slider: React.FC<ScliderProps> = ({ sliderItems, screenWidth }) => {
    const [slider, updateSlider] = useState(<></>);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const [mouseStartPosition, setMouseStartPositin] = useState<number>(0);
    const [mouseMoved, setMouseMoved] = useState<number>(0);
    const [mouseMovedDirection, setMouseMovedDirection] = useState<boolean | null>(null);
    const [imgIndex, setImageIndex] = useState<number>(0);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        if (!sliderItems.length) {
            updateSlider(<></>);
        } else {
            const sideMargin = Math.abs(mouseMoved);
            setIsChanged(sideMargin > screenWidth * 0.1);
            updateSlider(getImageByIndex(imgIndex, sideMargin));
        }
    }, [mouseMoved, screenWidth]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsMouseDown(true);
        setMouseStartPositin(e.pageX);
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsMouseDown(false);
        if (isChanged) {
            //image apears from fight
            if (mouseMovedDirection === true) {
                const centerImgIndex = imgIndex + 1 > sliderItems.length - 1 ? 0 : imgIndex + 1;
                switchToRight(centerImgIndex);
            } else if (mouseMovedDirection === false) {
                const centerImgIndex = imgIndex - 1 < 0 ? sliderItems.length - 1 : imgIndex - 1;
                switchToLeft(centerImgIndex);
            }
        } else {
            setMouseMoved(0);
        }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isMouseDown)
            return;
        const path = e.pageX - mouseStartPosition;
        setMouseMovedDirection(path < 0);
        setMouseMoved(path);
    }

    const getImageByIndex = (centerImgIndex: number, sideMargin: number) => {
        const leftImgIndex = centerImgIndex - 1 < 0 ? sliderItems.length - 1 : centerImgIndex - 1;
        const rightImgIndex = centerImgIndex + 1 > sliderItems.length - 1 ? 0 : centerImgIndex + 1;

        const leftImgStyle = generateLeftImgStyle(sideMargin);
        const centerImgStyle = generateCenterImgStyle(sideMargin);
        const rightImgStyle = generateRightImgStyle(sideMargin);

        return (
            <>
                <img
                    id={sliderItems[leftImgIndex].id}
                    style={leftImgStyle}
                    draggable='false'
                    key={sliderItems[leftImgIndex].id}
                    alt={sliderItems[leftImgIndex].label}
                    className={styles.sliderItem}
                    src={sliderItems[leftImgIndex].image}
                    width={sliderItems[leftImgIndex].width}
                    height={sliderItems[leftImgIndex].height}
                />
                <img
                    id={sliderItems[centerImgIndex].id}
                    style={centerImgStyle}
                    draggable='false'
                    key={sliderItems[centerImgIndex].id}
                    alt={sliderItems[centerImgIndex].label}
                    className={styles.sliderItem}
                    src={sliderItems[centerImgIndex].image}
                    width={sliderItems[centerImgIndex].width}
                    height={sliderItems[centerImgIndex].height} 
                    />
                <img
                    id={sliderItems[rightImgIndex].id}
                    style={rightImgStyle}
                    draggable='false'
                    key={sliderItems[rightImgIndex].id}
                    alt={sliderItems[rightImgIndex].label}
                    className={styles.sliderItem}
                    src={sliderItems[rightImgIndex].image}
                    width={sliderItems[rightImgIndex].width}
                    height={sliderItems[rightImgIndex].height}
                />
            </>
        );
    };

    const switchToLeft = (centerImgIndex: number) => {
        const style = { transition: 'left 0.5s', left: '0px' };

        const img = sliderItems[centerImgIndex];

        setImageIndex(centerImgIndex);
        updateSlider(
            <img
                id={img.id}
                style={style}
                draggable='false'
                key={img.id}
                alt={img.label}
                className={styles.sliderItem}
                src={img.image}
                width={img.width}
                height={img.height} />
        );
    }

    const switchToRight = (centerImgIndex: number) => {
        const style = { transition: 'right 0.5s', right: '1px' };

        const img = sliderItems[centerImgIndex];

        setImageIndex(centerImgIndex);
        updateSlider(
            <img
                id={img.id}
                style={style}
                draggable='false'
                key={img.id}
                alt={img.label}
                className={styles.sliderItem}
                src={img.image}
                width={img.width}
                height={img.height} />
        );
    }

    const generateCenterImgStyle = (sideMargin: number) => {
        let centerImgStyle = {};

        if (mouseMovedDirection === false) {
            centerImgStyle = !isMouseDown ?
                { transition: 'left 0.5s', left: `${-screenWidth}px` } :
                { left: `${-screenWidth + sideMargin}px` };
        }
        if (mouseMovedDirection === null) {
            centerImgStyle = {};
        }
        if (mouseMovedDirection === true) {
            centerImgStyle = !isMouseDown ?
                { transition: 'right 0.5s', right: `${sideMargin}px` } :
                { right: `${sideMargin}px` };
        }

        return centerImgStyle;
    }

    const generateLeftImgStyle = (sideMargin: number) => {
        return mouseMovedDirection === false ? (!isMouseDown ?
            { transition: 'left 0.5s', left: `${-screenWidth}px` } :
            { left: `${-screenWidth + sideMargin}px` }) : { display: 'none' };
    }

    const generateRightImgStyle = (sideMargin: number) => {
        return mouseMovedDirection === true ? (!isMouseDown ?
            { transition: 'right 0.5s', right: `${sideMargin}px` } :
            { right: `${sideMargin}px` }) : { display: 'none' };
    }

    return sliderItems.length ?
        (<div
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className={styles.sliderContainer}>
            {slider}
        </div>) :
        (<></>);
}
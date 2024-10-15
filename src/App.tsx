import { Slider } from "./components/Slider";
import styles from './App.module.css';

const firstImg = require('./images/shrek-1.webp');
const secondImg = require('./images/shrek-2.jpeg');
const thirdImg = require('./images/shrek-3.webp');
const fourthImg = require('./images/shrek-4.jpg');

export const App: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <div style={{ backgroundColor: 'gray', zIndex: 2 }}></div>
      <div className={styles.slider}>
        <Slider screenWidth={650} sliderItems={
          [
            { id: 1, image: firstImg, width: 650, height: 370 },
            { id: 2, image: secondImg, width: 650, height: 370 },
            { id: 3, image: thirdImg, width: 650, height: 370 },
            { id: 4, image: fourthImg, width: 650, height: 370 }
          ]} />
      </div>
      <div style={{ backgroundColor: 'gray', zIndex: 2 }}></div>
    </div>
  );
}
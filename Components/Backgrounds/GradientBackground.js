import { useEffect, useRef, useState } from 'react';
import styles from './GradientBackground.module.css';

const GradientBackground = (props) => {
  const childRef = useRef();
  const circleRef = useRef();
  const [circlesArray, setCirclesArray] = useState([]);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    setHeight(childRef.current.clientHeight);
    setWidth(childRef.current.clientWidth);
    const count = height;
    const circles = [];
    const coord = [[-250, -250]];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * (height + 1) - 250);
      const y = Math.floor(Math.random() * (width + 1) - 250);
      var dis = circleRef.current.clientWidth * 2;
      for (let j = 0; j < coord.length; j++) {
        dis = Math.min(
          dis,
          Math.pow(
            (x - coord[j][0]) * (x - coord[j][0]) +
              (y - coord[j][1]) * (y - coord[j][1]),
            0.5
          )
        );
      }
      if (dis >= (4 * circleRef.current.clientWidth) / 3) {
        coord.push([x, y]);
        circles.push(
          <div
            key={i + 1}
            style={{ top: x, left: y }}
            className={styles.gradientCircles}
          ></div>
        );
      }
    }
    setCirclesArray(circles);
  }, [props, height, width, windowSize]);

  return (
    <div className={styles.gradient}>
      <div style={{ height: height, width: width }} className={styles.circles}>
        <div
          key={0}
          style={{ top: '-250px', left: '-250px' }}
          className={styles.gradientCircles}
          ref={circleRef}
        ></div>
        {circlesArray}
      </div>
      <div className={styles.child} ref={childRef}>
        {props.children}
      </div>
    </div>
  );
};

export default GradientBackground;

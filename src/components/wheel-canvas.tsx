import React, { FunctionComponent } from "react";
import {
  bigWheelSecId,
  centerWheelSecId,
  levelZero,
  smallWheelSecId,
} from "./setup/settings";
import styles from "./wheel-canvas.module.css";

type WheelCanvasTypes = {
  canvasHW: string;
  smallCanvasHW: string;
  rotDeg?: number;
  easeOutSec: number;
  spinLevel: number;
};

const WheelCanvas: FunctionComponent<WheelCanvasTypes> = ({
  canvasHW,
  smallCanvasHW,
  rotDeg,
  easeOutSec,
  spinLevel,
}) => {
  return (
    <div className={styles.canvasDiv}>
      <canvas
        id={bigWheelSecId}
        className={styles.bigWheel}
        width={canvasHW}
        height={canvasHW}
        style={{
          WebkitTransform: `rotate(${rotDeg}deg)`,
          WebkitTransition: `-webkit-transform ${easeOutSec}s ease-out`,
        }}
      />
      {spinLevel === levelZero ? (
        <canvas
          id={smallWheelSecId}
          className={styles.smallWheel}
          width={smallCanvasHW}
          height={smallCanvasHW}
        />
      ) : null}
      <canvas
        id={centerWheelSecId}
        className={styles.centerWheel}
        width={canvasHW}
        height={canvasHW}
      />
    </div>
  );
};

export default WheelCanvas;

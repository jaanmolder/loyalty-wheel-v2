import React, { FunctionComponent } from "react";
import {
  bigWheelSecId,
  levelOne,
  levelZero,
  smallWheelSecId,
} from "./setup/settings";
import styles from "./wheel-canvas.module.css";
import { maxWin } from "./spinner-param";

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
  let centerTextStyle = styles.centerTextZero;
  let centerWheelStyle = styles.centerWheelZero;

  if (spinLevel === levelOne) {
    centerTextStyle = styles.centerTextOne;
    centerWheelStyle = styles.centerWheelZero;
  }

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

      <div className={styles.centerWheelDiv}>
        <div className={centerWheelStyle}>
          <span className={centerTextStyle}>{maxWin}</span>
        </div>
      </div>
    </div>
  );
};

export default WheelCanvas;

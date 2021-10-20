import React, { FunctionComponent, useEffect, useState } from "react";
import { bigSpinMapping, smallSpinMapping, spinButton } from "./spinner-param";
import {
  bigWheelSecId,
  canvasHW,
  defaultBigWheelStartDeg,
  levelOne,
  levelZero,
  smallCanvasHW,
  smallWheelSecId,
} from "./setup/settings";
import style from "./spinner.module.css";
import WheelCanvas from "./wheel-canvas";
import {initLoyaltyWheel} from "./func/init-wheel";
import {spinWheel} from "./func/wheel-action";

const MainSpinner: FunctionComponent = () => {
  // SMALL SPIN
  const smallWheelRadPx = 50;
  const smallBaseSize = smallWheelRadPx * 2.33;
  const smallTextRadius = smallBaseSize - smallWheelRadPx * 1.1;
  // const smallCanvasHW = "233";

  // BIG SPIN
  const bigWheelRadPx = 100;
  const bigBaseSize = bigWheelRadPx * 3.5;
  const bigTextRadius = bigBaseSize - bigWheelRadPx * 2;

  //CHANGE
  const [spinLevel, setSpinLevel] = useState(levelZero);
  const [wheelArray, setWheelArray] = useState(bigSpinMapping);
  // const [wheelRadPx, setWheelRadPx] = useState(75);
  // const [baseSize, setBaseSize] = useState(wheelRadPx * 3.33);
  // const [textRadius, setTextRadius] = useState(baseSize - wheelRadPx * 2);
  // const [canvasHW, setCanvasHW] = useState("500");
  // BACK
  // const wheelRadPx = 75;
  // const baseSize = wheelRadPx * 3.33;
  // const textRadius = baseSize - 150;
  const [rotDeg, setRotDeg] = useState(defaultBigWheelStartDeg);
  const [easeOutSec, setEaseOutSec] = useState(0);
  const [angleRadians, setAngleRadians] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [offsetRadians, setOffsetRadians] = useState(0);
  const [resIndex, setResIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (spinLevel === levelZero) {
      initLoyaltyWheel(
        smallSpinMapping,
        setAngleRadians,
        setTopIndex,
        setOffsetRadians,
        smallWheelRadPx,
        smallBaseSize,
        smallTextRadius,
        smallWheelSecId,
        spinLevel
      );
    }
    initLoyaltyWheel(
      wheelArray,
      setAngleRadians,
      setTopIndex,
      setOffsetRadians,
      bigWheelRadPx,
      bigBaseSize,
      bigTextRadius,
      bigWheelSecId,
      spinLevel
    );
  }, [
    wheelArray,
    bigBaseSize,
    bigTextRadius,
    spinLevel,
    smallBaseSize,
    smallTextRadius,
  ]);

  const resetWheel = () => {
    setRotDeg(defaultBigWheelStartDeg);
    setEaseOutSec(0);
    setResIndex(0);
    setStarted(false);
  };

  const spinWheelHandler = () => {
    if (started) {
      resetWheel();
    } else {
      spinWheel(
        setRotDeg,
        setEaseOutSec,
        setStarted,
        topIndex,
        angleRadians,
        wheelArray,
        setResIndex,
        offsetRadians
      );
    }
  };

  const changeWheelHandler = () => {
    if (spinLevel === levelZero) {
      setSpinLevel(levelOne);
      setWheelArray(smallSpinMapping);
      // setWheelRadPx(75);
      // setBaseSize(wheelRadPx * 3.33);
      // setTextRadius(baseSize - wheelRadPx* 2);
      // setCanvasHW("500");
    }
  };

  if (wheelArray[resIndex] === "NX") {
    changeWheelHandler();
  }

  return (
    <div>
      <span className={style.arrowDown} />

      <WheelCanvas
        canvasHW={canvasHW}
        smallCanvasHW={smallCanvasHW}
        rotDeg={rotDeg}
        easeOutSec={easeOutSec}
        spinLevel={spinLevel}
      />

      <button
        type="button"
        className={style.spinButton}
        onClick={spinWheelHandler}
      >
        {spinButton()}
      </button>

      <div />
      <button
        type="button"
        className={style.changeButton}
        onClick={changeWheelHandler}
      >
        CHANGE
      </button>

      {/*{spinning ? (*/}
      {/*  <button type="button" id="reset" onClick={resetWheel}>*/}
      {/*    reset*/}
      {/*  </button>*/}
      {/*) : (*/}
      {/*  <button type="button" id="spin" onClick={spin}>*/}
      {/*    spin*/}
      {/*  </button>*/}
      {/*)}*/}
      <div>
        <span className={style.readout}>
          YOU WON:{"  "}
          <span>{wheelArray[resIndex]}</span>
        </span>
      </div>
    </div>
  );
};

export default MainSpinner;

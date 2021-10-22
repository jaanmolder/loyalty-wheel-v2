import React, { FunctionComponent, useEffect, useState } from "react";
import { bigSpinMapping, smallSpinMapping } from "./spinner-param";
import {
  canvasHW,
  defaultBigWheelStartDeg,
  defaultBigWheelStartDegLevelTwo,
  levelOne,
  levelTwo,
  levelZero,
  smallCanvasHW,
  winIconParam,
  winSwitchDelay,
} from "../setup/settings";
import style from "./spinner.module.css";
import WheelCanvas from "./wheel-canvas";
import { sleep } from "./func/general";
import SpinButton from "./spin-button";
import ChangeButton from "./change-button";
import { init } from "./func/init";

const LoyaltyWheel: FunctionComponent = () => {
  const [textRadiusMulti, setTextRadiusMulti] = useState(2);
  const [spinLevel, setSpinLevel] = useState(levelZero);
  const [wheelArray, setWheelArray] = useState(bigSpinMapping);
  const [rotDeg, setRotDeg] = useState(defaultBigWheelStartDeg);
  const [easeOutSec, setEaseOutSec] = useState(0);
  const [angleRadians, setAngleRadians] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [offsetRadians, setOffsetRadians] = useState(0);
  const [resIndex, setResIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const smallWheelRadPx = 50;
  const smallBaseSize = smallWheelRadPx * 2.33;
  const smallTextRadius = smallBaseSize - smallWheelRadPx * 1.1;
  const bigWheelRadPx = 100;
  const bigBaseSize = bigWheelRadPx * 3.5;
  const bigTextRadius = bigBaseSize - bigWheelRadPx * textRadiusMulti;

  useEffect(() => {
    (async function () {
      await init(
        spinLevel,
        setAngleRadians,
        setTopIndex,
        setOffsetRadians,
        smallWheelRadPx,
        smallBaseSize,
        smallTextRadius,
        wheelArray,
        bigWheelRadPx,
        bigBaseSize,
        bigTextRadius
      );
    })();
  }, [
    wheelArray,
    bigBaseSize,
    bigTextRadius,
    spinLevel,
    smallBaseSize,
    smallTextRadius,
  ]);

  useEffect(() => {
    (async function () {
      if (wheelArray[resIndex] === winIconParam) {
        await sleep(winSwitchDelay);
        changeWheelHandler();
      }
    })();
  }, [resIndex, wheelArray]);

  const changeWheelHandler = () => {
    if (spinLevel === levelZero) {
      setSpinLevel(levelOne);
      setWheelArray(smallSpinMapping);
      setTextRadiusMulti(2.2);
      setRotDeg(defaultBigWheelStartDegLevelTwo);
    } else if (spinLevel === levelOne) {
      setSpinLevel(levelTwo);
    }
  };

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
      <div />
      <ChangeButton changeWheelHandler={changeWheelHandler} />
      <SpinButton
        spinLevel={spinLevel}
        setRotDeg={setRotDeg}
        setEaseOutSec={setEaseOutSec}
        setResIndex={setResIndex}
        setStarted={setStarted}
        started={started}
        topIndex={topIndex}
        angleRadians={angleRadians}
        wheelArray={wheelArray}
        offsetRadians={offsetRadians}
        resIndex={resIndex}
      />
    </div>
  );
};

export default LoyaltyWheel;

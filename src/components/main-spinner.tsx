import React, { FunctionComponent, useEffect, useState } from "react";
import { bigSpinMapping, smallSpinMapping } from "./spinner-param";
import { initLoyaltyWheel, spin } from "./func/wheel-func";
import { bigWheelSecId, smallWheelSecId } from "./setup/settings";
import style from "./spinner.module.css";

const MainSpinner: FunctionComponent = () => {
  // SMALL SPIN
  // const wheelArray = smallSpinMapping;
  // const wheelRadPx = 50;
  // const baseSize = wheelRadPx * 2.33;
  // const textRadius = baseSize - wheelRadPx;
  // const canvasHW = "233";

  // BIG SPIN
  // const wheelArray = bigSpinMapping;
  // const wheelRadPx = 75;
  // const baseSize = wheelRadPx * 3.33;
  // const textRadius = baseSize - wheelRadPx * 2;
  // const canvasHW = "500";

  //CHANGE
  const [spinLevel, setSpinLevel] = useState(0);
  const [wheelArray, setWheelArray] = useState(bigSpinMapping);
  const [wheelRadPx, setWheelRadPx] = useState(75);
  const [baseSize, setBaseSize] = useState(wheelRadPx * 3.33);
  const [textRadius, setTextRadius] = useState(baseSize - wheelRadPx * 2);
  const [canvasHW, setCanvasHW] = useState("500");
  // BACK
  // const wheelRadPx = 75;
  // const baseSize = wheelRadPx * 3.33;
  // const textRadius = baseSize - 150;
  const [rotDeg, setRotDeg] = useState(0);
  const [easeOutSec, setEaseOutSec] = useState(0);
  const [angleRadians, setAngleRadians] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [offsetRadians, setOffsetRadians] = useState(0);
  const [resIndex, setResIndex] = useState(0); // INDEX
  const [started, setStarted] = useState(false);
  // const [radius, setRadius] = useState(75); // PIXELS
  // const [net, setNet] = useState(0); // RADIANS

  useEffect(() => {
    initLoyaltyWheel(
      wheelArray,
      setAngleRadians,
      setTopIndex,
      setOffsetRadians,
      wheelRadPx,
      baseSize,
      textRadius,
      bigWheelSecId
    );
  });

  const resetWheel = () => {
    setRotDeg(0);
    setEaseOutSec(0);
    setResIndex(0);
    setStarted(false);
  };

  const spinWheelHandler = () => {
    if (started) {
      resetWheel();
    } else {
      spin(
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
    if (spinLevel === 0) {
      setSpinLevel(1);
      setWheelArray(smallSpinMapping);
      // setWheelRadPx(75);
      // setBaseSize(wheelRadPx * 3.33);
      // setTextRadius(baseSize - wheelRadPx* 2);
      // setCanvasHW("500");
    }
  };

  return (
    <div className={style.mainSpin}>
      <span className={style.selector}>&#9660;</span>

      <canvas
        id={bigWheelSecId}
        width={canvasHW}
        height={canvasHW}
        style={{
          WebkitTransform: `rotate(${rotDeg}deg)`,
          WebkitTransition: `-webkit-transform ${easeOutSec}s ease-out`,
        }}
      />

      <button
        type="button"
        className={style.spinButton}
        onClick={spinWheelHandler}
      >
        ICON
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

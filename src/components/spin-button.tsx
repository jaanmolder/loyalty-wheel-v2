import React, { FunctionComponent } from "react";
import {
  defaultBigWheelStartDeg,
  defaultBigWheelStartDegLevelTwo,
  levelOne,
} from "../setup/settings";
import style from "./spinner.module.css";
import { spinWheel } from "./func/wheel-action";
import "./spin-button.css";

type SpinButtonTypes = {
  spinLevel: number;
  setRotDeg: (arg0: number) => void;
  setEaseOutSec: (arg0: number) => void;
  setResIndex: (arg0: number) => void;
  setStarted: (arg0: boolean) => void;
  started: boolean;
  topIndex: number;
  angleRadians: number;
  wheelArray: any;
  offsetRadians: number;
  resIndex: number;
};

const SpinButton: FunctionComponent<SpinButtonTypes> = ({
  spinLevel,
  setRotDeg,
  setEaseOutSec,
  setResIndex,
  setStarted,
  started,
  topIndex,
  angleRadians,
  wheelArray,
  offsetRadians,
  resIndex,
}) => {
  const resetWheel = () => {
    if (spinLevel === levelOne) {
      setRotDeg(defaultBigWheelStartDegLevelTwo);
    } else {
      setRotDeg(defaultBigWheelStartDeg);
    }
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

  // if (started) {
  //   console.log("YOU WON: " + wheelArray[resIndex]);
  // }

  return (
    <>
      <div className={style.spinButton} onClick={spinWheelHandler}>
        <ul className="iconlist">
          <li>
            <div className="icon-holder">
              <div className="icon">
                <i className="icofont-spinner-alt-3" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SpinButton;

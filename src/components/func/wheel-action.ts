import { spinResDelay } from "../setup/settings";

export const getSpinRes = (
  spin: number,
  offsetRadians: number,
  topIndex: number,
  angleRadians: number,
  wheelArray: any,
  setResIndex: (arg0: any) => void
) => {
  let netRotation = ((spin % 360) * Math.PI) / 180;
  let travel = netRotation + offsetRadians;
  let count = topIndex + 1;

  while (travel > 0) {
    travel = travel - angleRadians;
    count--;
  }

  let getResult;

  if (count >= 0) {
    getResult = count;
  } else {
    getResult = wheelArray.length + count;
  }
  setResIndex(getResult);
};

export const spinWheel = (
  setRotDeg: (arg0: number) => void,
  setEaseOutSec: (arg0: number) => void,
  setStarted: (arg0: boolean) => void,
  topIndex: number,
  angleRadians: number,
  wheelArray: string | any[],
  setResIndex: (arg0: any) => void,
  offsetRadians: number,
) => {
  const randomSpin = Math.floor(Math.random() * 900) + 500;
  setRotDeg(randomSpin);
  setEaseOutSec(2);
  setStarted(true);

  setTimeout(() => {
    getSpinRes(
      randomSpin,
      offsetRadians,
      topIndex,
      angleRadians,
      wheelArray,
      setResIndex
    );
  }, spinResDelay);
};

export const getWheelTopPos = (
  num: number,
  angle: number,
  setTop: any,
  setOffset: any
) => {
  let topSpot = 0;
  let degreesOff = 0;

  if (num === 10) {
    topSpot = 8;
    degreesOff = Math.PI / 2 - angle * 2;
  } else if (num === 9) {
    topSpot = 7;
    degreesOff = Math.PI / 2 - angle * 2;
  } else if (num === 8) {
    topSpot = 6;
    degreesOff = 0;
  } else if (num <= 7 && num > 4) {
    topSpot = num - 1;
    degreesOff = Math.PI / 2 - angle;
  } else if (num === 4) {
    topSpot = num - 1;
    degreesOff = 0;
  } else if (num <= 3) {
    topSpot = num;
    degreesOff = Math.PI / 2;
  }

  setTop(topSpot - 1);
  setOffset(degreesOff);
};

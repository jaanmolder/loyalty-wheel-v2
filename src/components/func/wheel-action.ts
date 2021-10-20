export const getSpinRes = (
  spin: number,
  offsetRadians: number,
  topIndex: number,
  angleRadians: number,
  wheelArray: any,
  setResIndex: (arg0: any) => void
) => {
  // find net rotation and add to offset angle
  // repeat substraction of inner angle amount from total distance traversed
  // use count as an index to find value of result from state list
  // const { angle, top, offset, list } = this.state;
  let netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
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
  offsetRadians: number
) => {
  // set random spin degree and ease out time
  // set state variables to initiate animation
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
  }, 2000);
};

// get index of starting position of selector
export const getWheelTopPos = (
  num: number,
  angle: number,
  setTop: any,
  setOffset: any
) => {
  // set starting index and angle offset based on list length
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

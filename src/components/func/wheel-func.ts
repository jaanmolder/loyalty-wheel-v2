import {
  secTextColor,
  bigSecTextFont,
  bigWheelSecId,
  smallSecTextFont,
} from "../setup/settings";

export const isOdd = (num: number) => num % 2 === 1;

// export const sleep = (time: number) => {
//   return new Promise((resolve) => setTimeout(resolve, time));
// };

export const getSecCol = (i: number) => {
  if (isOdd(i)) {
    return `#c9c9c9`;
  } else {
    return `#757575`;
  }
};

// get index of starting position of selector
export const wheelTopPos = (
  num: number,
  angle: number,
  setTop: any,
  setOffset: any
) => {
  // set starting index and angle offset based on list length
  // works upto 9 options
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

export const spin = (
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

  const getResult = (spin: number) => {
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
    let result;
    if (count >= 0) {
      result = count;
    } else {
      result = wheelArray.length + count;
    }

    // set state variable to display result
    // setNet(netRotation);
    setResIndex(result);
  };

  // calcalute result after wheel stops spinning
  setTimeout(() => {
    getResult(randomSpin);
  }, 2000);
};

export const renWheelSec = (
  index: number,
  text: string,
  startAngle: number,
  arc: number,
  colorCode: string,
  wheelRadPx: number,
  baseSize: number,
  textRadius: number,
  wheelSecId: string
) => {
  // create canvas arc for each list element
  const canvas = document.getElementById(wheelSecId);
  // @ts-ignore
  const ctx = canvas.getContext("2d");
  // @ts-ignore
  const x = canvas.width / 2;
  // @ts-ignore
  const y = canvas.height / 2;
  // let getRadius = wheelRadius;
  // let startAngle = start;
  const endAngle = startAngle + arc;
  const angle = index * arc;

  ctx.beginPath();
  ctx.arc(x, y, wheelRadPx, startAngle, endAngle, false);
  ctx.lineWidth = wheelRadPx * 2;
  ctx.strokeStyle = colorCode;

  if (wheelSecId === bigWheelSecId) {
    ctx.font = bigSecTextFont;
    ctx.fillStyle = secTextColor;
  } else {
    ctx.font = smallSecTextFont;
    ctx.fillStyle = secTextColor;
  }
  ctx.stroke();

  ctx.save();
  ctx.translate(
    baseSize + Math.cos(angle - arc / 2) * textRadius,
    baseSize + Math.sin(angle - arc / 2) * textRadius
  );
  ctx.rotate(angle - arc / 2 + Math.PI / 2);
  ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
  ctx.restore();
};

export const initLoyaltyWheel = (
  wheelArray: string | any[],
  setAngleRadians: (arg0: number) => void,
  setTopIndex: any,
  setOffsetRadians: any,
  wheelRadPx: number,
  baseSize: number,
  textRadius: number,
  wheelSecId: string
) => {
  // determine number/size of sectors that need to created
  const numOptions = wheelArray.length;
  const arcSize = (2 * Math.PI) / numOptions;
  setAngleRadians(arcSize);

  wheelTopPos(numOptions, arcSize, setTopIndex, setOffsetRadians);

  // dynamically generate sectors from state list
  let angleDeg = 0;
  for (let i = 0; i < numOptions; i++) {
    let text = wheelArray[i];
    renWheelSec(
      i + 1,
      text,
      angleDeg,
      arcSize,
      getSecCol(i),
      wheelRadPx,
      baseSize,
      textRadius,
      wheelSecId
    );
    angleDeg += arcSize;
  }
};
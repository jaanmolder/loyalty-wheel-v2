import React, { FunctionComponent, useEffect, useState } from "react";
import { spinnerMapping } from "./spinner-param";
import { getSecCol } from "./func/gen-func";

const MainSpinner: FunctionComponent = () => {
  const list = spinnerMapping;
  const [radius, setRadius] = useState(75); // PIXELS
  const [rotate, setRotate] = useState(0); // DEGREES
  const [easeOut, setEaseOut] = useState(0); // SECONDS
  const [angle, setAngle] = useState(0); // RADIANS
  const [top, setTop] = useState(0); // INDEX
  const [offset, setOffset] = useState(0); // RADIANS
  const [net, setNet] = useState(0); // RADIANS
  const [result, setResult] = useState(0); // INDEX
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    initWheel();
  });

  const topPosition = (num: number, angle: number) => {
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

  const renderSector = (
    index: number,
    text: string,
    start: number,
    arc: number,
    color: string
  ) => {
    // create canvas arc for each list element
    let canvas = document.getElementById("wheel");
    // @ts-ignore
    let ctx = canvas.getContext("2d");
    // @ts-ignore
    let x = canvas.width / 2;
    // @ts-ignore
    let y = canvas.height / 2;
    let getRadius = radius;
    let startAngle = start;
    let endAngle = start + arc;
    let angle = index * arc;
    let baseSize = getRadius * 3.33;
    let textRadius = baseSize - 150;

    ctx.beginPath();
    ctx.arc(x, y, getRadius, startAngle, endAngle, false);
    ctx.lineWidth = getRadius * 2;
    ctx.strokeStyle = color;

    ctx.font = "17px Arial";
    ctx.fillStyle = "black";
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

  const spin = () => {
    // set random spin degree and ease out time
    // set state variables to initiate animation
    let randomSpin = Math.floor(Math.random() * 900) + 500;
    setRotate(randomSpin);
    setEaseOut(2);
    setSpinning(true);

    // calcalute result after wheel stops spinning
    setTimeout(() => {
      getResult(randomSpin);
    }, 2000);
  };

  const getResult = (spin: number) => {
    // find net rotation and add to offset angle
    // repeat substraction of inner angle amount from total distance traversed
    // use count as an index to find value of result from state list
    // const { angle, top, offset, list } = this.state;
    let netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
    // @ts-ignore
    let travel = netRotation + offset;
    let count = top + 1;
    while (travel > 0) {
      travel = travel - angle;
      count--;
    }
    let result;
    if (count >= 0) {
      result = count;
    } else {
      result = list.length + count;
    }

    // set state variable to display result
    setNet(netRotation);
    setResult(result);
  };

  const reset = () => {
    // reset wheel and result
    setRotate(0);
    setEaseOut(0);
    setResult(0);
    setSpinning(false);
  };

  const initWheel = () => {
    // determine number/size of sectors that need to created
    let numOptions = list.length;
    let arcSize = (2 * Math.PI) / numOptions;
    setAngle(arcSize);

    // get index of starting position of selector
    topPosition(numOptions, arcSize);

    // dynamically generate sectors from state list
    let angle = 0;
    for (let i = 0; i < numOptions; i++) {
      let text = list[i];
      renderSector(i + 1, text, angle, arcSize, getSecCol(i));
      angle += arcSize;
    }
  };

  return (
    <>
      {" "}
      <div className="app">
        <span className="selector">&#9660;</span>
        <canvas
          className="wheel"
          id="wheel"
          width="500"
          height="500"
          style={{
            WebkitTransform: `rotate(${rotate}deg)`,
            WebkitTransition: `-webkit-transform ${easeOut}s ease-out`,
          }}
        />

        {spinning ? (
          <button type="button" id="reset" onClick={reset}>
            reset
          </button>
        ) : (
          <button type="button" id="spin" onClick={spin}>
            spin
          </button>
        )}
        <div className="display">
          <span id="readout">
            YOU WON:{"  "}
            <span id="result">{list[result]}</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default MainSpinner;

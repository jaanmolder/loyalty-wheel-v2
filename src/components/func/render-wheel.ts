import { maxWin } from "../spinner-param";
import {
  bigSecTextFont,
  bigWheelSecId,
  bigWinIcon,
  IconArrowDown,
  levelOne,
  levelTwo,
  levelZero,
  secTextColor,
  smallSecTextFont,
  winIconParam,
  winSecTextFont,
} from "../../setup/settings";

export const renWheelSec = (
  index: number,
  text: string,
  startAngle: number,
  arc: number,
  colorCode: string,
  wheelRadPx: number,
  baseSize: number,
  textRadius: number,
  wheelSecId: string,
  spinLevel: number
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

  let getText = text;

  ctx.beginPath();
  ctx.arc(x, y, wheelRadPx, startAngle, endAngle, false);
  ctx.lineWidth = wheelRadPx * 2;
  ctx.strokeStyle = colorCode;

  if (spinLevel === levelZero) {
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
  if (text === winIconParam) {
    ctx.font = bigWinIcon;
    getText = IconArrowDown;
  }
  ctx.fillText(getText, -ctx.measureText(getText).width / 2, 0);
  ctx.restore();
};

export const renWheelBorder = (wheelSecId: string, wheelRadPx: number) => {
  const canvas = document.getElementById(wheelSecId);
  // @ts-ignore
  const ctx = canvas.getContext("2d");
  // @ts-ignore
  const x = canvas.width / 2;
  // @ts-ignore
  const y = canvas.height / 2;
  ctx.strokeStyle = "#2b1912";
  ctx.lineWidth = 20;
  let outRad = wheelRadPx * 2;

  if (wheelSecId === bigWheelSecId) {
    outRad = outRad + 10;
  } else {
    outRad = outRad - 5;
  }

  ctx.beginPath();
  ctx.arc(x, y, outRad, 0, 2 * Math.PI);
  ctx.stroke();
};

export const renCenterWheel = (
  wheelSecId: string,
  wheelRadPx: number,
  spinLevel: number
) => {
  const canvas = document.getElementById(wheelSecId);
  // @ts-ignore
  const ctx = canvas.getContext("2d");
  // @ts-ignore
  const x = canvas.width / 2;
  // @ts-ignore
  const y = canvas.height / 2;
  const text = maxWin;
  ctx.fillStyle = "#333333";
  ctx.font = bigSecTextFont;
  let outRad = 40;

  if (spinLevel === levelOne) {
    outRad = 80;
    ctx.font = smallSecTextFont;
  } else if (spinLevel === levelTwo) {
    outRad = 200;
    ctx.font = winSecTextFont;
  }

  ctx.beginPath();
  ctx.arc(x, y, outRad, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.fillStyle = secTextColor;
  ctx.fillText(text, x - ctx.measureText(text).width / 2, y + 21 / 2);
};

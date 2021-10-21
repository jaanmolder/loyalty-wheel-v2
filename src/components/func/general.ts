import {
  bigWheelSecId,
  colorDarkGray,
  colorGray,
  colorGrayZero,
  colorLightGray,
  colorLightGrayZero,
  levelOne,
  levelZero,
  smallWheelSecId,
  textError,
} from "../setup/settings";

export const isOdd = (num: number) => num % 2 === 1;

export const getSecCol = (i: number, wheelSecId: string, spinLevel: number) => {
  if (wheelSecId === bigWheelSecId && spinLevel === levelZero) {
    if (isOdd(i)) {
      return colorLightGrayZero;
    } else {
      return colorGrayZero;
    }
  } else if (wheelSecId === smallWheelSecId && spinLevel === levelZero) {
    if (i === 0) {
      return colorGray;
    } else if (i === 1) {
      return colorLightGray;
    } else if (i === 2) {
      return colorDarkGray;
    } else if (i === 4) {
      return colorLightGray;
    } else {
      return colorGray;
    }
  } else if (wheelSecId === bigWheelSecId && spinLevel === levelOne) {
    if (i === 0) {
      return colorGray;
    } else if (i === 1) {
      return colorLightGray;
    } else if (i === 2) {
      return colorDarkGray;
    } else if (i === 4) {
      return colorLightGray;
    } else {
      return colorGray;
    }
  } else {
    return textError;
  }
};

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

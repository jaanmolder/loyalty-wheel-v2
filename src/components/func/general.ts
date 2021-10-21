import { bigWheelSecId, smallWheelSecId, textError } from "../setup/settings";

export const isOdd = (num: number) => num % 2 === 1;

export const getSecCol = (i: number, wheelSecId: string) => {
  if (wheelSecId === bigWheelSecId) {
    if (isOdd(i)) {
      return `#c9c9c9`;
    } else {
      return `#757575`;
    }
  } else if (wheelSecId === smallWheelSecId) {
    if (isOdd(i)) {
      return `#a3a3a3`;
    } else {
      return `#727170`;
    }
  } else {
    return textError;
  }
};

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

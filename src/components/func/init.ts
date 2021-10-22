import {
  bigWheelSecId,
  iniLoadDelay,
  levelZero,
  smallWheelSecId,
} from "../../setup/settings";
import { sleep } from "./general";
import { render } from "./init-wheel";
import { smallSpinMapping } from "../spinner-param";

export const init = async (
  spinLevel: number,
  setAngleRadians: { (arg0: number): void; (arg0: number): void },
  setTopIndex: any,
  setOffsetRadians: any,
  smallWheelRadPx: number,
  smallBaseSize: number,
  smallTextRadius: number,
  wheelArray: any[],
  bigWheelRadPx: number,
  bigBaseSize: number,
  bigTextRadius: number
) => {
  await sleep(iniLoadDelay);

  if (spinLevel === levelZero) {
    render(
      smallSpinMapping,
      setAngleRadians,
      setTopIndex,
      setOffsetRadians,
      smallWheelRadPx,
      smallBaseSize,
      smallTextRadius,
      smallWheelSecId,
      spinLevel
    );
  }
  render(
    wheelArray,
    setAngleRadians,
    setTopIndex,
    setOffsetRadians,
    bigWheelRadPx,
    bigBaseSize,
    bigTextRadius,
    bigWheelSecId,
    spinLevel
  );
};

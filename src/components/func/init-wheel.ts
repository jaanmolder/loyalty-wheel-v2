import { renCenterWheel, renWheelBorder, renWheelSec } from "./render-wheel";
import { bigWheelSecId, centerWheelSecId } from "../setup/settings";
import { getSecCol } from "./general";
import { getWheelTopPos } from "./wheel-action";

export const initLoyaltyWheel = (
  wheelArray: any[],
  setAngleRadians: (arg0: number) => void,
  setTopIndex: any,
  setOffsetRadians: any,
  wheelRadPx: number,
  baseSize: number,
  textRadius: number,
  wheelSecId: string,
  spinLevel: number
) => {
  // determine number/size of sectors that need to created
  const numOfOpt = wheelArray.length;
  const arcSize = (2 * Math.PI) / numOfOpt;
  let angleDeg = 0;
  setAngleRadians(arcSize);

  getWheelTopPos(numOfOpt, arcSize, setTopIndex, setOffsetRadians);
  renWheelBorder(wheelSecId, wheelRadPx);

  if (wheelSecId === bigWheelSecId) {
    renCenterWheel(centerWheelSecId, wheelRadPx);
  }

  for (let item = 0; item < numOfOpt; item++) {
    const getColorCode = getSecCol(item, wheelSecId);
    let text = wheelArray[item];

    renWheelSec(
      item + 1,
      text,
      angleDeg,
      arcSize,
      getColorCode,
      wheelRadPx,
      baseSize,
      textRadius,
      wheelSecId,
      spinLevel
    );
    angleDeg += arcSize;
  }
};

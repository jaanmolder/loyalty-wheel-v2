import { renCenterWheel, renWheelBorder, renWheelSec } from "./render-wheel";
import { bigWheelSecId, centerWheelSecId } from "../setup/settings";
import { getSecCol } from "./general";
import { getWheelTopPos } from "./wheel-action";

export const initLoyaltyWheel = (
  wheelArray: string | any[],
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
  const numOptions = wheelArray.length;
  const arcSize = (2 * Math.PI) / numOptions;
  let angleDeg = 0;
  setAngleRadians(arcSize);

  getWheelTopPos(numOptions, arcSize, setTopIndex, setOffsetRadians);
  renWheelBorder(wheelSecId, wheelRadPx);

  if (wheelSecId === bigWheelSecId) {
    renCenterWheel(centerWheelSecId, wheelRadPx);
  }

  for (let i = 0; i < numOptions; i++) {
    const getColorCode = getSecCol(i, wheelSecId);
    let text = wheelArray[i];

    renWheelSec(
      i + 1,
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

import React, { FunctionComponent } from "react";
import style from "./spinner.module.css";

type ChangeButtonTypes = {
  changeWheelHandler: any;
};

const ChangeButton: FunctionComponent<ChangeButtonTypes> = ({
  changeWheelHandler,
}) => {
  return (
    <>
      <button
        type="button"
        className={style.changeButton}
        onClick={changeWheelHandler}
      >
        CHANGE
      </button>
    </>
  );
};

export default ChangeButton;

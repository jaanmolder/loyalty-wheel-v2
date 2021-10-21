import { winIconParam } from "./setup/settings";
import "./icofont/icofont.css";

// export const arrowDownIcon = () => (
//   <div className="icon-holder">
//     <div className="icon">
//       <i className="icofont-simple-down" />
//     </div>
//   </div>
// );

export const spinButton = () => (
  <div className="icon">
    <i className="icofont-spinner-alt-3" />
  </div>
);

export const bigSpinMapping = [
  "8 €",
  "3 €",
  "6 €",
  "2 €",
  "6 €",
  winIconParam,
  "4 €",
  "5 €",
  "1 €",
  "5 €",
];

export const smallSpinMapping = ["9 €", "10 €", winIconParam, "15 €", "11 €"];
export const maxWin = "23 €";

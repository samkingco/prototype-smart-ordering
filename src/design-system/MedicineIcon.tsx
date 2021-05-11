import * as React from "react";
import { EchoLogoIcon } from "@echo-health/icons-web";
import { Icon } from "./Icon";
import Bottle from "./medicine-icons/Bottle";
import Capsule from "./medicine-icons/Capsule";
import Drop from "./medicine-icons/Drop";
import Inhaler from "./medicine-icons/Inhaler";
import Spray from "./medicine-icons/Spray";
import Tablet from "./medicine-icons/Tablet";
import Tub from "./medicine-icons/Tub";
import Sachet from "./medicine-icons/Sachet";
import Dressing from "./medicine-icons/Dressing";
import Needle from "./medicine-icons/Needle";
import Patch from "./medicine-icons/Patch";
import Stocking from "./medicine-icons/Stocking";
import Strip from "./medicine-icons/Strip";
import Cylinder from "./medicine-icons/Cylinder";
import { MedicineForm } from "../store/medicines/slice";

interface Props {
  type: MedicineForm;
}

export const MedicineIcon = ({ type }: Props) => {
  switch (type) {
    case "bottle":
      return <Bottle />;
    case "capsule":
      return <Capsule />;
    case "dressing":
      return <Dressing />;
    case "drop":
      return <Drop />;
    case "inhaler":
      return <Inhaler />;
    case "needle":
    case "syringe":
      return <Needle />;
    case "patch":
      return <Patch />;
    case "sachet":
      return <Sachet />;
    case "spray":
      return <Spray />;
    case "stocking":
      return <Stocking />;
    case "test-strip":
      return <Strip />;
    case "tablet":
      return <Tablet />;
    case "tub":
      return <Tub />;
    case "tube-cylinder":
      return <Cylinder />;
    default:
      return <Icon type={EchoLogoIcon} />;
  }
};

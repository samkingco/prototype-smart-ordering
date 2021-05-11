import { css } from "styled-components";
import theme from "./theme";

export interface WithPaddingProp {
  padding?: string;
}

interface SizeMap {
  [K: string]: string;
}

const sizes: SizeMap = theme.spacing;

export default function withPadding({ padding = "" }: WithPaddingProp) {
  const trimmedPadding = padding.trim();

  if (!trimmedPadding) {
    return "";
  }

  const paddings: string[] = trimmedPadding
    .split(" ")
    .filter(Boolean)
    .map((sizeStr: string) => {
      if (!sizeStr) return "";

      let size = sizeStr.trim();
      let isNegative = false;

      if (size.startsWith("-") && size.split("-").length > 1) {
        isNegative = true;
        size = size.split("-")[1];
      }

      if (Object.keys(sizes).includes(size)) {
        return isNegative ? `-${sizes[size]}` : sizes[size];
      } else if (size === "0") {
        return "0";
      } else {
        return "";
      }
    });

  switch (paddings.slice(0, 4).length) {
    case 1:
      return css`
        padding: ${paddings[0]};
      `;
    case 2:
      return css`
        padding: ${paddings[0]} ${paddings[1]};
      `;
    case 3:
      return css`
        padding: ${paddings[0]} ${paddings[1]} ${paddings[2]};
      `;
    case 4:
      return css`
        padding: ${paddings[0]} ${paddings[1]} ${paddings[2]} ${paddings[3]};
      `;
    default:
      return css`
        padding: 0;
      `;
  }
}

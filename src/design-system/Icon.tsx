import React from "react";
import styled from "../styled";
import theme from "../styled/theme";
import withMargin, { WithMarginProp } from "../styled/withMargin";

export type IconComponent = (
  props: React.SVGProps<SVGSVGElement>
) => React.ReactElement<SVGElement>;

export const sizeMap = {
  s: 16,
  m: 24,
  l: 32,
  xl: 64,
};

const StyledSvg = styled.svg<WithMarginProp>`
  line-height: 1;
  ${withMargin};
`;

interface IconSize {
  width: number;
  height: number;
}

interface Props extends WithMarginProp {
  type: IconComponent;
  color?: keyof typeof theme.color | "currentColor";
  size?: keyof typeof sizeMap;
  customSize?: IconSize;
  className?: string;
}

export const Icon = ({
  type: IconComponent,
  color = "gray40",
  size = "m",
  customSize,
  ...props
}: Props) => {
  let width = sizeMap[size];
  let height = sizeMap[size];

  if (customSize) {
    width = customSize.width;
    height = customSize.height;
  }

  return (
    <StyledSvg
      // @ts-ignore
      as={({ ...props }) => <IconComponent {...props} />}
      width={width}
      height={height}
      color={color === "currentColor" ? "currentColor" : theme.color[color]}
      fill={color === "currentColor" ? "currentColor" : theme.color[color]}
      {...props}
    />
  );
};

import React from "react";
import styled from "styled-components";
import withMargin from "../styled/withMargin";

type DisplayHeadingColor = "gray90" | "white";
type DisplayHeadingSize = "xl" | "xxl";
type DisplayHeadingAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";

interface StyledDisplayHeadingProps {
  size: DisplayHeadingSize;
  color: DisplayHeadingColor;
  align: "left" | "center";
  margin?: string;
}

const StyledDisplayHeading = styled("h1")<StyledDisplayHeadingProps>`
  width: 100%;
  font-size: ${(p) => p.theme.typography.size[p.size]};
  font-family: ${(p) => p.theme.typography.displayFamily};
  font-weight: ${(p) => p.theme.typography.weight.bold};
  line-height: ${(p) => p.theme.typography.lineHeight[p.size]};
  color: ${(p) => p.theme.color[p.color]};
  text-align: ${(p) => p.align};
  padding: 0;
  ${withMargin}
`;

export interface DisplayHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: DisplayHeadingAs;
  size?: DisplayHeadingSize;
  color?: DisplayHeadingColor;
  align?: "left" | "center";
  margin?: string;
  id?: string;
}

function getTagForSize(size: DisplayHeadingSize): DisplayHeadingAs {
  if (size === "xl") {
    return "h2";
  }

  return "h1";
}

export const DisplayHeading: React.FC<DisplayHeadingProps> = ({
  children,
  className,
  as,
  size = "xl",
  color = "gray90",
  align = "left",
  margin,
  id,
}) => {
  return (
    <StyledDisplayHeading
      className={className}
      as={as || getTagForSize(size)}
      align={align}
      size={size}
      color={color}
      margin={margin}
      id={id}
    >
      {children}
    </StyledDisplayHeading>
  );
};

import React from "react";
import styled from "styled-components";
import withMargin from "../styled/withMargin";

type HeadingColor = "gray90" | "white";
type HeadingSize = "l" | "xl" | "xxl";
type HeadingAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";

interface StyledHeadingProps {
  size: HeadingSize;
  color: HeadingColor;
  align: "left" | "center";
  margin?: string;
  $isInline?: boolean;
}

const StyledHeading = styled("h1")<StyledHeadingProps>`
  width: ${(p) => (p.$isInline ? undefined : "100%")};
  font-size: ${(p) => p.theme.typography.size[p.size]};
  font-family: ${(p) => p.theme.typography.bodyFamily};
  font-weight: ${(p) => p.theme.typography.weight.bold};
  line-height: ${(p) => p.theme.typography.lineHeight[p.size]};
  color: ${(p) => p.theme.color[p.color]};
  text-align: ${(p) => p.align};
  padding: 0;
  ${withMargin}
`;

export interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ReactType | keyof JSX.IntrinsicElements;
  size?: "l" | "xl" | "xxl";
  color?: HeadingColor;
  align?: "left" | "center";
  id?: string;
  margin?: string;
  isInline?: boolean;
}

function getTagForSize(size: HeadingSize): HeadingAs {
  if (size === "l") {
    return "h3";
  }

  if (size === "xl") {
    return "h2";
  }

  return "h1";
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  className,
  as,
  size = "l",
  color = "gray90",
  align = "left",
  margin,
  isInline,
  id,
}) => {
  return (
    <StyledHeading
      className={className}
      as={as || getTagForSize(size)}
      align={align}
      size={size}
      color={color}
      margin={margin}
      id={id}
      $isInline={isInline}
    >
      {children}
    </StyledHeading>
  );
};

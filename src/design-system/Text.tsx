import React from "react";
import styled, { css } from "styled-components";
import withMargin from "../styled/withMargin";

type TextColor =
  | "gray90"
  | "gray70"
  | "gray30"
  | "red70"
  | "green70"
  | "blue70"
  | "orange70"
  | "purple70"
  | "white"
  | "inherit";

interface StyledTextProps {
  align: "left" | "center" | "right" | "justify";
  size: "xs" | "s" | "m";
  color: TextColor;
  isInline: boolean;
  isBold: boolean;
  margin?: string;
}

const StyledText = styled.p<StyledTextProps>`
  display: ${(p) => (p.isInline ? "inline-block" : "block")};
  color: ${(p) => (p.color === "inherit" ? "inherit" : p.theme.color[p.color])};
  font-family: ${(p) => p.theme.typography.bodyFamily};
  font-weight: ${(p) =>
    p.isBold
      ? p.theme.typography.weight.bold
      : p.theme.typography.weight.normal};
  font-size: ${(p) => p.theme.typography.size[p.size]};
  line-height: ${(p) => p.theme.typography.lineHeight[p.size]};
  text-align: ${(p) => p.align};

  ${(p) =>
    p.onClick &&
    css`
      &:hover,
      &:focus {
        color: ${p.theme.color.blue70};
      }
    `};

  ${withMargin};
`;

export interface TextProps extends React.AriaAttributes {
  children: React.ReactNode;
  as?: React.ReactType | keyof JSX.IntrinsicElements;
  className?: string;
  align?: "left" | "center" | "right" | "justify";
  size?: "xs" | "s" | "m";
  color?: TextColor;
  isInline?: boolean;
  isBold?: boolean;
  onClick?: () => void;
  margin?: string;
  id?: string;
  nonSensitive?: boolean;
}

export const Text = ({
  children,
  className,
  as,
  id,
  align = "left",
  size = "m",
  color = "gray90",
  isInline = false,
  isBold = false,
  margin,
  nonSensitive = false,
  ...props
}: TextProps) => {
  const tag = as ? as : isInline ? "span" : "p";
  return (
    <StyledText
      className={className + (!nonSensitive ? " fs-exclude" : "")}
      id={id}
      as={tag}
      align={align}
      size={size}
      color={color}
      isInline={isInline}
      isBold={isBold}
      margin={margin}
      {...props}
    >
      {children}
    </StyledText>
  );
};

import React from "react";
import styled, { keyframes } from "styled-components";
import withMargin from "../styled/withMargin";
import { VisuallyHidden } from "./VisuallyHidden";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

type Colors = "white" | "gray60";
type Sizes = "s" | "m" | "l" | "xl";

interface SpinnerProps {
  color: Colors;
  size: Sizes;
  margin?: string;
}

const Spinner = styled("span")<SpinnerProps>`
  width: ${(p) => p.theme.spacing[p.size]};
  height: ${(p) => p.theme.spacing[p.size]};
  display: inline-block;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 100%;
    border-top: 2px solid ${(p) => p.theme.color[p.color]};
    border-left: 2px solid transparent;
    border-bottom: 2px solid transparent;
    border-right: 2px solid transparent;
    animation: ${rotate} 650ms ease-in-out infinite;
  }

  ${withMargin};
`;

interface LoadingIndicatorProps {
  color?: Colors;
  size?: Sizes;
  margin?: string;
  fallbackText?: string;
}

export const LoadingIndicator = ({
  color = "gray60",
  size = "xl",
  fallbackText = "Loading…",
  ...props
}: LoadingIndicatorProps) => {
  return (
    <Spinner color={color} size={size} {...props}>
      <VisuallyHidden>{fallbackText}</VisuallyHidden>
    </Spinner>
  );
};

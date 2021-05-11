import React from "react";
import styled, { css } from "styled-components";
import withMargin, { WithMarginProp } from "../styled/withMargin";
import theme from "../styled/theme";

type SvgProps = React.SVGProps<SVGSVGElement> &
  WithMarginProp & {
    onClick?: () => void;
    color?: keyof typeof theme.color;
    children: React.ReactNode;
    as?: React.ReactType | keyof JSX.IntrinsicElements;
  };

const Wrapper = styled.span`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

const StyledSVG = styled.svg<SvgProps>`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 0;
  background: transparent;

  ${({ theme, ...props }) => css`
    ${props.color &&
    css`
      color: ${theme.color[props.color]};
    `};
    width: ${props.width};
    height: ${props.height};
  `}

  ${withMargin}
`;

export const SVG = ({
  width = 20,
  height = 20,
  color,
  margin,
  type,
  ref,
  as,
  className,
  ...props
}: SvgProps) => {
  return (
    <Wrapper onClick={props.onClick} as={as} className={className}>
      <StyledSVG
        color={color}
        width={width}
        height={height}
        margin={margin}
        {...props}
      >
        {props.children}
      </StyledSVG>
    </Wrapper>
  );
};

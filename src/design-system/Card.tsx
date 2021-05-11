import React from "react";
import styled, { css } from "styled-components";
import withMargin from "../styled/withMargin";
import withPadding from "../styled/withPadding";

export interface CardProps {
  children: React.ReactNode;
  margin?: string;
  padding?: string;
}

const Wrapper = styled.div<{ margin?: string; padding?: string }>`
  flex: 1;
  width: 100%;
  background: ${(p) => p.theme.color.white};
  padding: ${(p) => p.theme.spacing.m};
  ${withMargin};
  ${withPadding};

  ${(props) => css`
    @media screen and (min-width: ${props.theme.breakpoints.s}) {
      padding: ${props.theme.spacing.l};
      box-shadow: ${props.theme.shadow.depth1};
      border-radius: ${props.theme.misc.borderRadius};
    }

    @media screen and (min-width: ${props.theme.breakpoints.m}) {
      padding: ${props.theme.spacing.xl};
    }
  `}
`;

export const Card = ({ children, ...props }: CardProps) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

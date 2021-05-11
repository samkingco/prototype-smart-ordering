import React from "react";
import styled from "styled-components";
import withMargin, { WithMarginProp } from "../styled/withMargin";

interface ButtonGroupProps extends WithMarginProp {
  children: React.ReactNode;
  reverseOrder?: boolean;
  alignLeft?: boolean;
}

const ButtonGroupWrapper = styled.div<Omit<ButtonGroupProps, "chidlren">>`
  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    display: flex;
    justify-content: ${(p) => (p.alignLeft ? "flex-start" : "space-between")};
    flex-direction: ${(p) => (p.reverseOrder ? "row" : "row-reverse")};
  }
  ${withMargin};
`;

const ButtonWrapper = styled.div<{ alignLeft?: boolean }>`
  margin-bottom: ${(p) => p.theme.spacing.m};

  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    margin: 0;
    margin-right: ${(p) => (p.alignLeft ? p.theme.spacing.m : 0)};
  }

  &:last-child {
    margin: 0;
  }
`;

export const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  return (
    <ButtonGroupWrapper
      margin={props.margin}
      reverseOrder={props.reverseOrder}
      alignLeft={props.alignLeft}
    >
      {React.Children.map(props.children, (child) => {
        // We don't want to render a button wrapper with associated margins etc. if the child is null/falsy
        if (!child) return child;
        return (
          <ButtonWrapper alignLeft={props.alignLeft}>{child}</ButtonWrapper>
        );
      })}
    </ButtonGroupWrapper>
  );
};

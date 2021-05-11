import React from "react";
import * as Switch from "@radix-ui/react-switch";
import styled from "styled-components";
import withMargin, { WithMarginProp } from "../styled/withMargin";
import { VisuallyHidden } from "./VisuallyHidden";

const switchWidth = "40px";
const thumbDiameter = "20px";
const thumbPadding = "2px";
const thumbActiveGrowWidth = "4px";

const Label = styled.label<WithMarginProp>`
  ${withMargin};
`;

const StyledThumb = styled(Switch.Thumb)`
  display: block;
  width: ${thumbDiameter};
  height: ${thumbDiameter};
  background-color: ${(p) => p.theme.color.white};
  border-radius: ${thumbDiameter};
  box-shadow: ${(p) => p.theme.shadow.depth1};
  transform: translateX(${thumbPadding});
  will-change: transform;

  &[data-state="checked"] {
    transform: translateX(
      calc(${switchWidth} - ${thumbDiameter} - ${thumbPadding})
    );
  }

  /* Recommended reading: https://tatianamac.com/posts/prefers-reduced-motion/ */
  @media (prefers-reduced-motion: no-preference) {
    transition: transform 100ms, width 100ms;
  }
`;

const StyledSwitch = styled(Switch.Root)`
  appearance: none;
  border: none;
  padding: 0;
  width: ${switchWidth};
  height: calc(${thumbDiameter} + (${thumbPadding} * 2));
  background-color: ${(p) => p.theme.color.gray20};
  border-radius: ${switchWidth};
  position: relative;

  &:hover:not(:disabled) {
    background-color: ${(p) => p.theme.color.gray30};
  }

  &:focus:not(:hover) {
    outline: none;
    box-shadow: ${(p) => `${p.theme.shadow.focusRing} ${p.theme.color.blue20}`};
  }

  &[data-state="checked"] {
    background-color: ${(p) => p.theme.color.blue60};

    &:hover:not(:disabled) {
      background-color: ${(p) => p.theme.color.blue80};
    }
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  transition: box-shadow 200ms ease-in-out;

  @media (prefers-reduced-motion: no-preference) {
    transition: background-color 200ms ease-in-out, box-shadow 200ms ease-in-out;

    &:active:not(:disabled) {
      ${StyledThumb} {
        width: calc(${thumbDiameter} + ${thumbActiveGrowWidth});

        &[data-state="checked"] {
          transform: translateX(
            calc(
              ${switchWidth} - ${thumbDiameter} - ${thumbPadding} -
                ${thumbActiveGrowWidth}
            )
          );
        }
      }
    }
  }
`;

interface Props extends WithMarginProp {
  accessibilityLabel?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
}

export const SwitchInput = ({
  onChange,
  accessibilityLabel,
  checked,
  margin,
  ...props
}: Props) => (
  <Label as={accessibilityLabel ? "label" : "div"} margin={margin}>
    <StyledSwitch
      aria-label={accessibilityLabel}
      onCheckedChange={onChange}
      checked={checked}
      value={checked ? "on" : "off"}
      {...props}
    >
      <StyledThumb />
    </StyledSwitch>
    {!!accessibilityLabel && (
      <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
    )}
  </Label>
);

export default SwitchInput;

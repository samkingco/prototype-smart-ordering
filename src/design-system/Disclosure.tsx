import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronRightIcon } from "@echo-health/icons-web";
import styled, { css } from "styled-components";
import withMargin, { WithMarginProp } from "../styled/withMargin";
import withPadding, { WithPaddingProp } from "../styled/withPadding";
import { Icon, sizeMap } from "./Icon";

const iconSize = `${sizeMap.m}px`;
const iconHorizontalPadding = "12px";

const DisclosureWrapper = styled.div<
  WithMarginProp &
    WithPaddingProp & { withBottomBorder?: boolean; withTopBorder?: boolean }
>`
  ${withMargin}
  ${withPadding}

  ${(p) =>
    p.withTopBorder &&
    css`
      border-top: 1px solid ${(p) => p.theme.color.gray10};
    `}

  ${(p) =>
    p.withBottomBorder &&
    css`
      border-bottom: 1px solid ${(p) => p.theme.color.gray10};
    `}
`;

const DisclosureIcon = styled(Icon)`
  flex-shrink: 0;
  margin-right: ${iconHorizontalPadding};
  border-radius: 100%;
  transition: transform 340ms, background-color 200ms ease-in-out,
    box-shadow 200ms ease-in-out, color 200ms ease-in-out;
`;

const DisclosureButton = styled(Collapsible.Button)`
  display: inline-flex;
  align-items: center;
  width: 100%;
  color: ${(p) => p.theme.color.gray90};
  font-family: ${(p) => p.theme.typography.bodyFamily};
  font-weight: ${(p) => p.theme.typography.weight.bold};
  font-size: ${(p) => p.theme.typography.size.m};
  line-height: ${(p) => p.theme.typography.lineHeight.m};
  text-decoration: none;
  text-align: left;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: ${(p) => p.theme.spacing.m} 0;

  &:hover > ${DisclosureIcon}, &:focus > ${DisclosureIcon} {
    color: ${(p) => p.theme.color.blue60};
  }

  &:hover > ${DisclosureIcon} {
    background: ${(p) => p.theme.color.blue10};
  }

  &:focus:not(:hover) > ${DisclosureIcon} {
    box-shadow: ${(p) => `${p.theme.shadow.focusRing} ${p.theme.color.blue20}`};
  }

  &[data-state="open"] {
    padding: ${(p) => p.theme.spacing.m} 0 ${(p) => p.theme.spacing.s} 0;

    ${DisclosureIcon} {
      transform: rotate(90deg);
    }
  }

  &[data-state="closed"] {
    ${DisclosureIcon} {
      transform: rotate(0deg);
    }
  }
`;

const DisclosurePanel = styled(Collapsible.Content)`
  &[data-state="open"] {
    margin-left: calc(${iconSize} + ${iconHorizontalPadding});
    padding-bottom: ${(p) => p.theme.spacing.m};
  }
`;

export interface DisclosureProps extends WithMarginProp, WithPaddingProp {
  title: string | React.ReactNode;
  onChange?: (open: boolean) => void;
  isOpen?: boolean;
  withBottomBorder?: boolean;
  withTopBorder?: boolean;
  children: React.ReactNode;
}

export const Disclosure = ({
  isOpen,
  onChange,
  title,
  children,
  margin,
  padding,
  withTopBorder,
  withBottomBorder,
}: DisclosureProps) => {
  return (
    <Collapsible.Root open={isOpen} onOpenChange={onChange}>
      <DisclosureWrapper
        margin={margin}
        padding={padding}
        withBottomBorder={withBottomBorder}
        withTopBorder={withTopBorder}
      >
        <DisclosureButton type="button">
          <DisclosureIcon size="m" type={ChevronRightIcon} color="gray40" />
          {title}
        </DisclosureButton>
        <DisclosurePanel>{children}</DisclosurePanel>
      </DisclosureWrapper>
    </Collapsible.Root>
  );
};

export default Disclosure;

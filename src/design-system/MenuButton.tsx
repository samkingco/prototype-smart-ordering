import React from "react";
import {
  Menu as ReachMenu,
  MenuPopover as ReachPopover,
  MenuButton as ReachMenuButton,
  MenuItems as ReachMenuItems,
  MenuItem as ReachMenuItem,
} from "@reach/menu-button";
import { positionRight } from "@reach/popover";
import { KeyboardArrowDownIcon } from "@echo-health/icons-web";
import styled from "styled-components";
import { Icon } from "./Icon";
import withMargin, { WithMarginProp } from "../styled/withMargin";
import { TextButtonStyleProps, textButtonStyles } from "./common-button-styles";

const Wrapper = styled.div<WithMarginProp>`
  ${withMargin};
`;

const DropdownIcon = styled(Icon)`
  flex-shrink: 0;
  border-radius: 100%;
  transition: transform 340ms, color 200ms ease-in-out;
`;

const DropdownButton = styled(ReachMenuButton)<TextButtonStyleProps>`
  &[data-reach-menu-button] {
    border: none;
    background: none;
  }

  &[data-reach-menu-button][aria-expanded="true"] {
    ${DropdownIcon} {
      transform: rotate(180deg);
    }
  }

  ${textButtonStyles};
`;

const DropdownContainer = styled(ReachPopover)`
  z-index: 1;
  padding-top: ${(p) => p.theme.spacing.xs};
  border: none;
  outline: none;
`;

const DropdownCard = styled.div`
  background-color: ${(p) => p.theme.color.white};
  padding: ${(p) => p.theme.spacing.s};
  box-shadow: ${(p) => p.theme.shadow.depth2};
  border-radius: ${(p) => p.theme.misc.borderRadius};
`;

const DropdownItems = styled(ReachMenuItems)`
  outline: none;
  border: none;
  padding: 0;

  [data-reach-menu-item] {
    padding: ${(p) => p.theme.spacing.s};
    border-radius: ${(p) => p.theme.misc.borderRadius};
    cursor: pointer;
  }

  [data-reach-menu-item][data-selected] {
    background-color: ${(p) => p.theme.color.gray10};
  }

  [data-reach-menu-item][data-selected]:focus {
    color: ${(p) => p.theme.color.blue70};
    background-color: ${(p) => p.theme.color.blue10};
    box-shadow: ${(p) =>
      `${p.theme.misc.focusRingShadow} ${p.theme.color.blue20}`};
  }
`;

interface MenuOption {
  label: string;
  onClick?: () => void;
}

interface Props extends WithMarginProp {
  label: string;
  options: MenuOption[];
  align?: "left" | "right";
}

export const MenuButton = (props: Props) => {
  return (
    <Wrapper margin={props.margin}>
      <ReachMenu>
        <DropdownButton hasIcon>
          {props.label}
          <DropdownIcon
            type={KeyboardArrowDownIcon}
            margin="0 0 0 xs"
            color="currentColor"
          />
        </DropdownButton>
        <DropdownContainer
          position={props.align === "right" ? positionRight : undefined}
        >
          <DropdownCard>
            <DropdownItems>
              {props.options.map((item) => {
                if (item.onClick) {
                  return (
                    <ReachMenuItem onSelect={item.onClick}>
                      {item.label}
                    </ReachMenuItem>
                  );
                }
                return null;
              })}
            </DropdownItems>
          </DropdownCard>
        </DropdownContainer>
      </ReachMenu>
    </Wrapper>
  );
};

import { css } from "styled-components";
import withMargin, { WithMarginProp } from "../styled/withMargin";
import { Theme } from "../styled/styled";
import { IconComponent } from "./Icon";

export type ButtonVariants = "primary" | "secondary" | "tertiary";
export type ButtonSizes = "s" | "m";

export interface CommonButtonProps extends WithMarginProp {
  className?: string;
  label: string;
  variant?: ButtonVariants;
  isLoading?: boolean;
  isDisabled?: boolean;
  isDestructive?: boolean;
  shouldSubmit?: boolean;
  form?: string;
  size?: ButtonSizes;
  iconLeading?: IconComponent;
  iconTrailing?: IconComponent;
}

export interface ButtonStyleProps extends WithMarginProp {
  variant: ButtonVariants;
  isLoading?: boolean;
  isDisabled?: boolean;
  isDestructive?: boolean;
  width?: "fill" | "min-content";
  size?: ButtonSizes;
}

export const buttonStyles = ({
  theme,
  width = "fill",
  ...props
}: { theme: Theme } & ButtonStyleProps) => css`
  position: relative;
  display: ${width === "fill" ? "flex" : "inline-flex"};
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  min-width: 100px;
  width: ${width === "fill" ? "100%" : "auto"};
  padding: ${props.size === "s"
    ? `${theme.spacing.s} ${theme.spacing.m}`
    : `12px ${theme.spacing.m}`};
  border-radius: ${theme.misc.borderRadius};
  font-family: ${theme.typography.bodyFamily};
  font-weight: ${theme.typography.weight.bold};
  font-size: ${theme.typography.size.m};
  line-height: ${theme.typography.lineHeight.m};
  text-decoration: none;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;

  ${props.variant === "primary" &&
  (props.isDestructive
    ? css`
        color: ${theme.color.white};
        background: ${theme.color.red60};

        &:hover {
          color: ${theme.color.white};
          background: ${theme.color.red70};
        }

        &:focus:not(:hover) {
          background: ${theme.color.red60};
          box-shadow: ${theme.shadow.focusRing} ${theme.color.red20};
        }
      `
    : css`
        color: ${theme.color.green90};
        background: ${theme.color.green40};

        &:hover {
          background: ${theme.color.green30};
        }

        &:focus:not(:hover) {
          background: ${theme.color.green40};
          box-shadow: ${theme.shadow.focusRing} ${theme.color.green20};
        }
      `)}

  ${props.variant === "secondary" &&
  (props.isDestructive
    ? css`
        color: ${theme.color.red70};
        background: ${theme.color.red10};

        &:hover {
          color: ${theme.color.red80};
          background: ${theme.color.red20};
        }

        &:focus:not(:hover) {
          background: ${theme.color.red10};
          box-shadow: ${theme.shadow.focusRing} ${theme.color.red20};
        }
      `
    : css`
        color: ${theme.color.purple70};
        background: ${theme.color.purple10};

        &:hover {
          color: ${theme.color.purple80};
          background: ${theme.color.purple20};
        }

        &:focus:not(:hover) {
          background: ${theme.color.purple10};
          box-shadow: ${theme.shadow.focusRing} ${theme.color.purple20};
        }
      `)}
  ${props.variant === "tertiary" &&
  (props.isDestructive
    ? css`
        color: ${theme.color.red70};
        background: ${theme.color.white};
        box-shadow: inset 0 0 0 2px ${theme.color.gray10};

        &:hover {
          color: ${theme.color.red80};
          background: ${theme.color.gray10};
        }

        &:focus:not(:hover) {
          background: ${theme.color.red10};
          box-shadow: ${theme.shadow.focusRing} ${theme.color.red20};
        }
      `
    : css`
        color: ${theme.color.blue70};
        background: ${theme.color.white};
        box-shadow: inset 0 0 0 2px ${theme.color.gray10};

        &:hover {
          color: ${theme.color.blue80};
          background: ${theme.color.gray10};
        }

        &:focus:not(:hover) {
          background: ${theme.color.gray10};
          box-shadow: ${theme.shadow.focusRing} ${theme.color.blue20};
        }
      `)}

  ${(props.isDisabled || props.isLoading) &&
  css`
    border: none;
    &,
    &:hover,
    &:focus {
      cursor: not-allowed;
      background: ${theme.color.gray20};
      color: ${theme.color.gray70};
    }

    ${props.variant === "tertiary" &&
    css`
      // Remove tertiary inset box shadow when disabled
      &:not(:focus) {
        box-shadow: none;
      }
    `}
  `}

  ${props.isLoading &&
  css`
    &,
    &:hover,
    &:focus {
      color: transparent;
    }
  `}

  ${withMargin}
`;

export interface TextButtonStyleProps extends WithMarginProp {
  color?: "gray";
  isDestructive?: boolean;
  size?: "s" | "m";
  hasIcon?: boolean;
}

export const textButtonStyles = ({
  theme,
  ...props
}: { theme: Theme } & TextButtonStyleProps) => css`
  display: ${props.hasIcon ? "flex" : "inline-flex"};
  flex-direction: row;
  align-items: center;
  border: none;
  padding: 0;
  margin: 0;
  background: none;
  color: ${props.color === "gray"
    ? `${theme.color.gray70}`
    : `${theme.color.blue70}`};
  font-family: ${theme.typography.bodyFamily};
  font-weight: ${theme.typography.weight.bold};
  font-size: ${theme.typography.size.m};
  text-align: left;
  text-decoration: none;
  transition: color 200ms ease;
  border-radius: ${theme.misc.borderRadius};
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;

  ${props.size === "s" &&
  css`
        font-size: ${theme.typography.size.s};
        line-height: ${theme.typography.lineHeight.s}
        font-weight: ${theme.typography.weight.bold};
      `}

  &:hover:not(:disabled) {
    color: ${theme.color.blue80};
    text-decoration: underline;
  }

  &:focus:not(:disabled) {
    box-shadow: 0 0 0 2px ${theme.color.blue60};
  }

  ${props.isDestructive &&
  css`
    color: ${theme.color.red70};

    &:hover:not(:disabled) {
      color: ${theme.color.red60};
    }

    &:focus:not(:disabled) {
      box-shadow: 0 0 0 2px ${theme.color.red60};
    }
  `}

  &:disabled {
    color: ${theme.color.gray70};
    cursor: not-allowed;
  }
`;

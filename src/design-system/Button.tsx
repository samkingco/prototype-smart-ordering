import React from "react";
import styled from "styled-components";
import {
  ButtonStyleProps,
  buttonStyles,
  CommonButtonProps,
} from "./common-button-styles";
import { ButtonContent } from "./ButtonContent";

interface Props extends CommonButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  width?: "fill" | "min-content";
}

const StyledButton = styled.button<ButtonStyleProps>`
  ${buttonStyles}
`;

export const Button = ({
  label,
  variant = "primary",
  isLoading = false,
  isDisabled = false,
  isDestructive = false,
  shouldSubmit = false,
  size = "m",
  iconLeading,
  iconTrailing,
  ...props
}: Props) => {
  return (
    <StyledButton
      variant={variant}
      type={shouldSubmit ? "submit" : "button"}
      disabled={Boolean(isLoading || isDisabled)}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isDestructive={isDestructive}
      size={size}
      {...props}
    >
      <ButtonContent
        label={label}
        isLoading={isLoading}
        size={size}
        iconLeading={iconLeading}
        iconTrailing={iconTrailing}
      />
    </StyledButton>
  );
};

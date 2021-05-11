import React from "react";
import styled from "styled-components";
import withMargin from "../styled/withMargin";
import { textButtonStyles, TextButtonStyleProps } from "./common-button-styles";
import { Icon, IconComponent } from "./Icon";

interface Props {
  className?: string;
  label: string;
  isDisabled?: boolean;
  isDestructive?: boolean;
  shouldSubmit?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  margin?: string;
  iconLeading?: IconComponent;
  iconTrailing?: IconComponent;
  size?: "s" | "m";
}

const StyledButton = styled.button<TextButtonStyleProps>`
  ${textButtonStyles}
  ${withMargin}
`;

export const TextButton = ({
  className,
  label,
  iconLeading,
  iconTrailing,
  isDisabled = false,
  isDestructive = false,
  shouldSubmit = false,
  onClick,
  margin,
  size,
  ...props
}: Props) => {
  return (
    <StyledButton
      className={className}
      type={shouldSubmit ? "submit" : "button"}
      onClick={onClick}
      disabled={isDisabled}
      isDestructive={isDestructive}
      hasIcon={!!iconLeading || !!iconTrailing}
      margin={margin}
      size={size}
      {...props}
    >
      {iconLeading && (
        <Icon
          type={iconLeading}
          margin="0 s 0 0"
          color="currentColor"
          size="m"
        />
      )}
      {label}
      {iconTrailing && (
        <Icon
          type={iconTrailing}
          margin="0 0 0 s"
          color="currentColor"
          size="m"
        />
      )}
    </StyledButton>
  );
};

import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { LocationDescriptor } from "history";
import styled from "styled-components";
import {
  ButtonStyleProps,
  buttonStyles,
  CommonButtonProps,
} from "./common-button-styles";
import { ButtonContent } from "./ButtonContent";

export interface Props extends CommonButtonProps {
  linkTo: string | LocationDescriptor;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  width?: "fill" | "min-content";
  shouldOpenInNewTab?: boolean;
}

const StyledAnchorButton = styled.a<ButtonStyleProps>`
  ${buttonStyles}
`;

// Filters out our custom props from NavLinkProps
// This is required for 3rd party components such as NavLink
const StyledLinkButton = styled(
  ({ isDisabled, isLoading, ...otherProps }: LinkProps & ButtonStyleProps) => (
    <Link {...otherProps} />
  )
)`
  ${buttonStyles}
`;

export const LinkButton = ({
  label,
  variant = "primary",
  isLoading = false,
  isDisabled = false,
  linkTo,
  iconLeading,
  iconTrailing,
  shouldOpenInNewTab = false,
  ...props
}: Props) => {
  const buttonProps = {
    ...props,
    variant: variant,
    isDisabled: isDisabled,
    isLoading: isLoading,
  };

  // We use a normal anchor link for external links, and the
  // react-router `Link` component for internal links because
  // `Link` only takes a `to` prop, not `href`.
  if (
    typeof linkTo === "string" &&
    (linkTo.startsWith("http") ||
      linkTo.startsWith("mailto:") ||
      linkTo.startsWith("tel:"))
  ) {
    // as={Boolean(isDisabled || isLoading) ? "span" : undefined}
    return (
      <StyledAnchorButton
        href={linkTo}
        target={shouldOpenInNewTab ? "_blank" : undefined}
        rel={shouldOpenInNewTab ? "noreferrer" : undefined}
        {...buttonProps}
      >
        <ButtonContent
          label={label}
          isLoading={isLoading}
          iconLeading={iconLeading}
          iconTrailing={iconTrailing}
        />
      </StyledAnchorButton>
    );
  } else {
    // as={Boolean(isDisabled || isLoading) ? "span" : undefined}
    return (
      <StyledLinkButton to={linkTo} {...buttonProps}>
        <ButtonContent
          label={label}
          isLoading={isLoading}
          iconLeading={iconLeading}
          iconTrailing={iconTrailing}
        />
      </StyledLinkButton>
    );
  }
};

import React from "react";
import { Link } from "react-router-dom";
import { LocationDescriptor } from "history";
import styled from "styled-components";
import withMargin from "../styled/withMargin";
import { TextButtonStyleProps, textButtonStyles } from "./common-button-styles";
import { Icon, IconComponent } from "./Icon";

interface Props {
  className?: string;
  label: string;
  type?: "external" | "internal";
  linkTo: string | LocationDescriptor;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  margin?: string;
  size?: "s" | "m";
  iconLeading?: IconComponent;
  iconTrailing?: IconComponent;
  color?: "gray";
}

const StyledAnchor = styled.a<TextButtonStyleProps>`
  ${textButtonStyles}
  ${withMargin}
`;

const StyledLink = styled(
  ({
    // Remove the layout helper props from being rendered in HTML
    hasIcon,
    ...props
  }) => <Link {...props} />
)<TextButtonStyleProps>`
  ${textButtonStyles}
  ${withMargin}
`;

export const TextLink = ({
  linkTo,
  type,
  label,
  iconLeading,
  iconTrailing,
  ...props
}: Props) => {
  const isExternal =
    type === "external" ||
    (typeof linkTo === "string" &&
      (linkTo.startsWith("http") ||
        linkTo.startsWith("mailto:") ||
        linkTo.startsWith("tel:")));
  // We use a normal anchor link for external links, and the
  // react-router `Link` component for internal links because
  // `Link` only takes a `to` prop, not `href`.
  if (isExternal && typeof linkTo === "string") {
    return (
      <StyledAnchor
        href={linkTo}
        target="_blank"
        rel="noreferrer"
        hasIcon={!!iconLeading || !!iconTrailing}
        {...props}
      >
        {iconLeading && (
          <Icon
            type={iconLeading}
            color="blue70"
            margin="0 s 0 0"
            size={props.size}
          />
        )}
        {label}
        {iconTrailing && (
          <Icon
            type={iconTrailing}
            margin="0 0 0 s"
            color="currentColor"
            size={props.size}
          />
        )}
      </StyledAnchor>
    );
  } else {
    return (
      <StyledLink
        to={linkTo}
        hasIcon={!!iconLeading || !!iconTrailing}
        {...props}
      >
        {iconLeading && (
          <Icon
            type={iconLeading}
            color="blue70"
            margin="0 s 0 0"
            size={props.size}
          />
        )}
        {label}
        {iconTrailing && (
          <Icon
            type={iconTrailing}
            margin="0 0 0 s"
            color="currentColor"
            size={props.size}
          />
        )}
      </StyledLink>
    );
  }
};

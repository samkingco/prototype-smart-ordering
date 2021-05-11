import React from "react";
import { Link } from "react-router-dom";
import { LocationDescriptor } from "history";
import styled from "styled-components";
import { ChevronRightIcon, LaunchIcon } from "@echo-health/icons-web";
import { Icon, IconComponent } from "./Icon";
import TextRow from "./TextRow";
import { Text } from "./Text";
import {
  selectableRowStyles,
  selectableRowInteractionStyles,
  linkRowStyles,
} from "./common-row-styles";
import { WithPaddingProp } from "../styled/withPadding";

const StyledAnchor = styled.a`
  ${linkRowStyles}
  ${selectableRowStyles}
  ${selectableRowInteractionStyles}
`;

const StyledLink = styled(Link)`
  ${linkRowStyles}
  ${selectableRowStyles}
  ${selectableRowInteractionStyles}
`;

const StyledButton = styled.button`
  ${selectableRowStyles}
  ${selectableRowInteractionStyles}
`;

const getTrailingIcon = (variant: LinkVariant) => {
  switch (variant) {
    case "external":
      return (
        <Icon
          aria-label="Opens in a new tab"
          type={LaunchIcon}
          color="blue60"
        />
      );
    case "push":
      return <Icon type={ChevronRightIcon} />;
    default:
      return undefined;
  }
};

type LinkVariant = "push" | "modal" | "external";

interface Props extends WithPaddingProp {
  variant?: LinkVariant;
  title: string;
  description?: string | React.ReactNode;
  leading?: IconComponent | React.ReactNode;
  trailing?: IconComponent | React.ReactNode;
  additionalContent?: React.ReactNode;
  onClick?: () => void;
  linkTo?: string | LocationDescriptor;
}

const LinkRow = ({
  variant = "push",
  title,
  description,
  leading,
  trailing,
  additionalContent,
  linkTo,
  onClick,
  padding,
}: Props) => {
  let trailingEl = null;

  if (linkTo) {
    trailingEl = trailing || getTrailingIcon(variant);
  }

  const content = (
    <TextRow
      title={
        <Text
          color={variant === "modal" ? "blue70" : undefined}
          isBold={variant === "modal"}
        >
          {title}
        </Text>
      }
      description={description}
      leading={leading}
      trailing={trailingEl}
      additionalContent={additionalContent}
      padding={padding}
    />
  );

  const isExternalLink =
    linkTo &&
    typeof linkTo === "string" &&
    (linkTo.startsWith("http") ||
      linkTo.startsWith("mailto:") ||
      linkTo.startsWith("tel:"));

  if (linkTo && !isExternalLink) {
    return (
      <StyledLink
        to={linkTo}
        onClick={onClick}
        {...(variant === "external" && {
          target: "_blank",
          rel: "noreferrer",
        })}
      >
        {content}
      </StyledLink>
    );
  }

  if (isExternalLink && typeof linkTo === "string") {
    return (
      <StyledAnchor
        href={linkTo}
        onClick={onClick}
        {...(variant === "external" && {
          target: "_blank",
          rel: "noreferrer",
        })}
      >
        {content}
      </StyledAnchor>
    );
  }

  return <StyledButton onClick={onClick}>{content}</StyledButton>;
};

export default LinkRow;

import React from "react";
import { ErrorIcon, InfoIcon, WarningIcon } from "@echo-health/icons-web";
import styled, { css } from "styled-components";
import withMargin, { WithMarginProp } from "../styled/withMargin";
import { Icon } from "./Icon";
import { Text } from "./Text";

const Wrapper = styled.div<
  WithMarginProp & { $variant: BannerVariant; $withIcon: boolean }
>`
  ${({ theme, ...props }) => css`
    display: grid;
    grid-template-columns: ${props.$withIcon ? "min-content 1fr" : "1fr"};
    grid-gap: 12px;
    background: ${theme.color.white};
    padding: ${theme.spacing.m};
    border: 2px solid;
    border-radius: ${theme.misc.borderRadius};

    ${props.$variant === "warning" &&
    css`
      border-color: ${theme.color.orange20};
    `};
    ${props.$variant === "error" &&
    css`
      border-color: ${theme.color.red20};
    `};
    ${props.$variant === "info" &&
    css`
      border-color: ${theme.color.gray20};
    `};

    ${withMargin};
  `}
`;

const getIcon = (variant: BannerVariant) => {
  switch (variant) {
    case "info":
      return <Icon type={InfoIcon} />;
    case "error":
      return <Icon type={ErrorIcon} color="red60" />;
    case "warning":
      return <Icon type={WarningIcon} color="orange40" />;
    default:
      return undefined;
  }
};

type BannerVariant = "info" | "error" | "warning";

interface BannerProps extends WithMarginProp {
  className?: string;
  title?: string;
  variant: BannerVariant;
  withIcon?: boolean;
  children?: React.ReactNode;
}

export function Banner({
  title,
  children,
  variant,
  withIcon = true,
  ...props
}: BannerProps) {
  const icon = getIcon(variant);

  return (
    <Wrapper {...props} $withIcon={withIcon} $variant={variant}>
      {withIcon && icon}
      <div>
        {title && (
          <Text isBold={true} margin={children ? "0 0 s" : undefined}>
            {title}
          </Text>
        )}
        {children && <div>{children}</div>}
      </div>
    </Wrapper>
  );
}

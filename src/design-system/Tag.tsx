import React from "react";
import styled, { css } from "styled-components";
import withMargin, { WithMarginProp } from "../styled/withMargin";

export type TagVariant = "success" | "error" | "warning" | "info";

type WrapperProps = WithMarginProp & {
  variant: TagVariant;
};

const Wrapper = styled("div")<WrapperProps>`
  display: inline-block;
  padding: 5px 7px;
  border-radius: 5px;
  font-size: 13px;
  line-height: 1em;
  letter-spacing: 0.1px;
  font-weight: ${(p) => p.theme.typography.weight.bold};

  ${(p) =>
    p.variant === "warning" &&
    css`
      color: ${p.theme.color.orange70};
      background-color: ${p.theme.color.orange10};
    `};
  ${(p) =>
    p.variant === "error" &&
    css`
      color: ${p.theme.color.red70};
      background-color: ${p.theme.color.red10};
    `};
  ${(p) =>
    p.variant === "info" &&
    css`
      color: ${p.theme.color.gray70};
      background-color: ${p.theme.color.gray10};
    `};

  ${(p) =>
    p.variant === "success" &&
    css`
      color: ${p.theme.color.green70};
      background-color: ${p.theme.color.green10};
    `};

  ${withMargin}
`;

export type TagProps = WithMarginProp & {
  variant: TagVariant;
  label: string;
};

export const Tag = ({ label, margin, variant }: TagProps) => {
  return (
    <Wrapper margin={margin} variant={variant}>
      {label}
    </Wrapper>
  );
};

export default Tag;

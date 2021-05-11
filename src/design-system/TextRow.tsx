import React from "react";
import styled, { css } from "styled-components";
import { Icon, IconComponent } from "./Icon";
import { isIconComponent } from "../types";
import withPadding, { WithPaddingProp } from "../styled/withPadding";
import withMargin, { WithMarginProp } from "../styled/withMargin";
import { Text } from "./Text";

const Wrapper = styled.div<WithMarginProp & WithPaddingProp>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  ${withMargin}
  ${withPadding}
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const Content = styled.div`
  flex: 1;
`;

const leadingTrailingMinWidth = "24px";
const leadingTrailingMarginHorizontal = "12px";

const Leading = styled.div<{ $alignment: Alignment }>`
  align-self: ${({ $alignment = "center" }) => alignmentMap[$alignment]};
  display: flex;
  align-items: stretch;
  flex-shrink: 0;
  min-width: ${leadingTrailingMinWidth};
  margin-right: ${leadingTrailingMarginHorizontal};
`;

const Trailing = styled.div<{ $alignment: Alignment }>`
  align-self: ${({ $alignment = "center" }) => alignmentMap[$alignment]};
  display: flex;
  align-items: stretch;
  flex-shrink: 0;
  min-width: ${leadingTrailingMinWidth};
  margin-left: ${leadingTrailingMarginHorizontal};
`;

const AdditionalContent = styled.div<{ $hasLeading: boolean }>`
  margin-top: ${(p) => p.theme.spacing.s};

  /**
   * Apply a left offset to additional content if there is a leading element, so that it aligns
   * with the main content row above *and* allows the leading/trailing content to be center
   * aligned with only the main content (_that's_ the tricky part!) - this assumes that the
   * leading element only occupies the min-width, as it's unlikely that there will be a case where
   * we have a leading element larger than an icon *and* additional content
   */
  ${(p) =>
    p.$hasLeading &&
    css`
      margin-left: calc(
        ${leadingTrailingMinWidth} + ${leadingTrailingMarginHorizontal}
      );
    `}
`;

const alignmentMap = {
  leading: "flex-start",
  center: "center",
  trailing: "flex-end",
  stretch: "stretch",
} as const;

type Alignment = "leading" | "center" | "trailing" | "stretch";

interface Props extends WithMarginProp, WithPaddingProp {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  leading?: IconComponent | React.ReactNode;
  trailing?: IconComponent | React.ReactNode;
  additionalContent?: React.ReactNode;
  alignLeading?: Alignment;
  alignTrailing?: Alignment;
}

const TextRow = ({
  title,
  description,
  leading,
  trailing,
  additionalContent,
  alignLeading = "center",
  alignTrailing = "center",
  padding,
  margin,
}: Props) => {
  return (
    <Wrapper margin={margin} padding={padding}>
      <Body>
        {leading && (
          <Leading $alignment={alignLeading}>
            {isIconComponent(leading) ? <Icon type={leading} /> : leading}
          </Leading>
        )}
        <Content>
          {typeof title === "string" ? <Text>{title}</Text> : title}
          {description && (
            <>
              {typeof description === "string" ? (
                <Text color="gray70" size="s">
                  {description}
                </Text>
              ) : (
                description
              )}
            </>
          )}
        </Content>
        {trailing && (
          <Trailing $alignment={alignTrailing}>
            {isIconComponent(trailing) ? <Icon type={trailing} /> : trailing}
          </Trailing>
        )}
      </Body>
      {additionalContent && (
        <AdditionalContent $hasLeading={!!leading}>
          {additionalContent}
        </AdditionalContent>
      )}
    </Wrapper>
  );
};

export default TextRow;

import React from "react";
import styled, { css } from "styled-components";
import withMargin from "../styled/withMargin";

interface Props<T> extends React.AriaAttributes {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  margin?: string;
  withBottomBorder?: boolean;
  withTopBorder?: boolean;
  withDividers?: boolean;
}

export const StyledLi = styled.li<{
  $withDividers: boolean;
}>`
  ${(p) =>
    p.$withDividers &&
    css`
      & + & {
        border-top: 1px solid ${(p) => p.theme.color.gray10};
      }
    `}
`;

export const StyledUl = styled.ul<{
  $withBottomBorder?: boolean;
  $withTopBorder?: boolean;
  $withDividers?: boolean;
  margin?: string;
}>`
  list-style-type: none;

  ${(p) =>
    p.$withDividers
      ? css`
          & ${StyledLi} > * {
            padding-top: ${p.theme.spacing.m};
            padding-bottom: ${p.theme.spacing.m};
          }
        `
      : css`
          /**
           * When the list is rendered without item dividers then we can render
           * the items with more compact vertical spacing within the list
           */
          & ${StyledLi} > * {
            padding-top: ${p.theme.spacing.s};
            padding-bottom: ${p.theme.spacing.s};
          }

          & ${StyledLi}:first-child > * {
            padding-top: ${p.theme.spacing.m};
          }

          & ${StyledLi}:last-child > * {
            padding-bottom: ${p.theme.spacing.m};
          }
        `}

  ${(p) =>
    p.$withTopBorder
      ? css`
          border-top: 1px solid ${(p) => p.theme.color.gray10};
        `
      : css`
          /**
           * For first item remove the top padding (so that it aligns with any
           * content before it without introducing additional space)
           */
          & ${StyledLi}:first-child > * {
            margin-top: -${p.theme.spacing.m};
            padding-top: ${p.theme.spacing.m};
          }
        `}

  ${(p) =>
    p.$withBottomBorder
      ? css`
          border-bottom: 1px solid ${(p) => p.theme.color.gray10};
        `
      : css`
          /**
           * For last item remove bottom padding (so that we don't visibly
           * introduce extra bottom padding to the parent e.g. if the list is at
           * the end of a card)
           */
          & ${StyledLi}:last-child > * {
            margin-bottom: -${p.theme.spacing.m};
            padding-bottom: ${p.theme.spacing.m};
          }
        `}

  ${withMargin};
`;

export function List<T>(props: Props<T>) {
  const {
    items,
    renderItem,
    keyExtractor,
    margin,
    withBottomBorder,
    withTopBorder,
    withDividers = true,
    ...ariaProps
  } = props;

  const content = items
    .map((item, index) => {
      return renderItem(item, index);
    })
    .filter((x) => x !== null);

  // Don't render the list if no content
  if (content.length === 0) {
    return null;
  }

  return (
    <StyledUl
      margin={margin}
      $withBottomBorder={withBottomBorder}
      $withTopBorder={withTopBorder}
      $withDividers={withDividers}
      {...ariaProps}
    >
      {items.map((item, index) => {
        const content = renderItem(item, index);
        const key = keyExtractor(item, index);

        if (!content) {
          return null;
        }

        return (
          <StyledLi
            key={key}
            $withDividers={withDividers}
            data-testid={"listItem" + key}
          >
            {content}
          </StyledLi>
        );
      })}
    </StyledUl>
  );
}

export default List;

import styled from "styled-components";
import withMargin, { WithMarginProp } from "../styled/withMargin";

export const Divider = styled.hr<WithMarginProp>`
  clear: both;
  display: block;
  border: 0;
  border-top: 1px solid ${(p) => p.theme.color.gray10};
  margin: ${(p) => p.theme.spacing.l} 0;

  ${withMargin}
`;

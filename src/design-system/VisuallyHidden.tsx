import styled from "styled-components";

export const VisuallyHidden = styled.div`
  /* Check out https://a11yproject.com/posts/how-to-hide-content/ */

  &:not(:focus):not(:active) {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
  }
`;

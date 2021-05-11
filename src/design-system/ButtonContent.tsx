import React from "react";
import styled from "styled-components";
import { LoadingIndicator } from "./LoadingIndicator";
import { Icon, IconComponent } from "./Icon";

const LoadingIndicatorWrapper = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const StyledIcon = styled(Icon)`
  flex-shrink: 0;
`;

export const ButtonContent = (props: {
  label: string;
  isLoading?: boolean;
  iconLeading?: IconComponent;
  iconTrailing?: IconComponent;
  size?: "s" | "m";
}) => (
  <>
    {props.iconLeading && (
      <StyledIcon
        type={props.iconLeading}
        margin="0 s 0 0"
        color="currentColor"
      />
    )}
    {props.label}
    {props.iconTrailing && (
      <StyledIcon
        type={props.iconTrailing}
        margin="0 0 0 s"
        color="currentColor"
      />
    )}
    {props.isLoading && (
      <LoadingIndicatorWrapper>
        <LoadingIndicator size={props.size === "s" ? "m" : "l"} />
      </LoadingIndicatorWrapper>
    )}
  </>
);

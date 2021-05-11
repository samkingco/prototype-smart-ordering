import React from "react";
import styled from "styled-components";
import { Text } from "./Text";
import { TextLink } from "./TextLink";

const Wrapper = styled.footer`
  padding: ${(p) => p.theme.spacing.m};

  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    max-width: ${(p) => `calc(600px + (${p.theme.spacing.xl} * 2))`};
    padding: ${(p) => p.theme.spacing.xl};
  }
`;

export const EmailFooter: React.FC = () => {
  return (
    <Wrapper>
      <Text size="xs" color="gray70" margin="0 0 s">
        This is an important message about your Echo account. This isn’t a
        marketing email, but you can{" "}
        <TextLink linkTo="/account" label="unsubscribe" size="s" /> from those.
      </Text>
      <Text size="xs" color="gray70" margin="0 0 m">
        Metabolic Healthcare Ltd., Unit 1 Westpoint Trading Estate, Alliance
        Road, Acton, W3 0RA.
        <br />
        GPhC number: 9011008.
      </Text>
    </Wrapper>
  );
};

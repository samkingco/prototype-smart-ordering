import React from "react";
import seed from "seed-random";
import styled from "styled-components";
import { Theme } from "../styled/styled";

function getAvatarColorForName(name: string, theme: Theme) {
  const randomNumber = seed(name)();
  const availableColours = [
    { bg: theme.color.purple20, fg: theme.color.purple80 },
    { bg: theme.color.green20, fg: theme.color.green80 },
    { bg: theme.color.blue20, fg: theme.color.blue80 },
    { bg: theme.color.orange20, fg: theme.color.orange80 },
  ];
  return availableColours[Math.floor(randomNumber * availableColours.length)];
}

function getInitials(name: string) {
  const names = name.match(/\b\w/g) || [];
  const initials = ((names.shift() || "") + (names.pop() || "")).toUpperCase();
  return initials;
}

const StyledAvatar = styled.div<{ name: string }>`
  background: ${(p) => getAvatarColorForName(p.name, p.theme).bg};
  color: ${(p) => getAvatarColorForName(p.name, p.theme).fg};
  font-size: ${(p) => p.theme.typography.size.xs};
  font-weight: ${(p) => p.theme.typography.weight.bold};
  width: ${(p) => p.theme.spacing.l};
  height: ${(p) => p.theme.spacing.l};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: ${(p) => p.theme.spacing.l};
`;

interface AvatarProps {
  name: string;
}

export function Avatar({ name }: AvatarProps) {
  return (
    <StyledAvatar name={name} title={name}>
      {getInitials(name)}
    </StyledAvatar>
  );
}

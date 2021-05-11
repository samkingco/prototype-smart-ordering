import React, { useRef, useState } from "react";
import illustrations from "@echo-health/illustrations-web";
import styled, { keyframes } from "styled-components";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export type IllustrationName = keyof typeof illustrations;

const shimmer = keyframes`{
  0%{
    left: -100%;
  }
  100%{
    left: 100%;
  }
}`;

const Wrapper = styled.div<{
  $width: number;
  $height: number;
  $hasLoaded: boolean;
}>`
  position: relative;
  width: 100%;
  max-width: ${(p) => p.$width}px;
  overflow: hidden;

  background: ${(p) => (p.$hasLoaded ? "transparent" : p.theme.color.gray10)};
  border-radius: ${(p) => (p.$hasLoaded ? 0 : p.theme.misc.borderRadius)};

  &:before {
    content: "";
    display: ${(p) => (p.$hasLoaded ? "none" : "block")};
    position: absolute;
    top: 0;
    left: -100%;
    height: 100%;
    width: 250px;
    background: ${(p) =>
      `linear-gradient(to right, ${p.theme.color.gray10} 0%, ${p.theme.color.white} 50%, ${p.theme.color.gray10} 100%)`};
    background-size: 100%;
    animation: ${shimmer} 1s ease-in-out infinite;
  }
`;

const AspectRatioBox = styled.div<{ $ratio: number }>`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${(p) => p.$ratio * 100}%;
  overflow: hidden;
`;

const Image = styled.img<{ $hasLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${(p) => (p.$hasLoaded ? 1 : 0)};
  transition: opacity 200ms ease-in-out;
`;

interface Props {
  className?: string;
  src: IllustrationName;
}

export function Illustration({ src, ...props }: Props) {
  const illustration = illustrations[src];
  const wrapperRef = useRef(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { isInView, supportsFeature } = useIntersectionObserver(wrapperRef, {
    threshold: 0,
    rootMargin: "50%",
  });

  const isVisible = supportsFeature ? isInView : true;

  if (!illustration) {
    return null;
  }

  return (
    <Wrapper
      ref={wrapperRef}
      $height={illustration.height}
      $width={illustration.width}
      $hasLoaded={hasLoaded}
      {...props}
    >
      <AspectRatioBox $ratio={illustration.height / illustration.width}>
        <Image
          src={isVisible ? illustration["@1x"] : ""}
          srcSet={
            isVisible
              ? `${illustration["@1x"]} 1x, ${illustration["@2x"]} 2x, ${illustration["@3x"]} 3x, ${illustration["@4x"]} 4x`
              : ""
          }
          alt=""
          onLoad={() => setHasLoaded(true)}
          $hasLoaded={hasLoaded}
        />
      </AspectRatioBox>
    </Wrapper>
  );
}

import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import styled from "styled-components";
import { Text } from "./Text";

const StyledContent = styled(RadixTooltip.Content)`
  padding: ${(p) => p.theme.spacing.s} ${(p) => p.theme.spacing.m};
  background-color: ${(p) => p.theme.color.gray70};
  box-shadow: ${(p) => p.theme.shadow.depth2};
`;

const StyledArrow = styled(RadixTooltip.Arrow)`
  fill: ${(p) => p.theme.color.gray70};
`;

interface Props {
  children: React.ReactChild;
  content?: string;
  delayDuration?: number;
  side?: "top" | "left" | "right" | "bottom";
}

export const Tooltip = (props: Props) => {
  return props.content ? (
    <RadixTooltip.Root delayDuration={props.delayDuration}>
      <RadixTooltip.Trigger as="span">
        <button type="button" disabled style={{ pointerEvents: "none" }}>
          {props.children}
        </button>
      </RadixTooltip.Trigger>
      <StyledContent side={props.side || "top"}>
        <Text size="s" color="white">
          {props.content}
        </Text>
        <StyledArrow width={16} height={8} />
      </StyledContent>
    </RadixTooltip.Root>
  ) : (
    <>{props.children}</>
  );
};

// import React from "react";
// import { useTooltip, TooltipPopup, TriggerParams } from "@reach/tooltip";
// import Portal from "@reach/portal";

// interface Props {
//   children: React.ReactElement<TriggerParams<HTMLElement>>;
//   content?: string;
// }

// export const Tooltip = (props: Props) => {
//   const [trigger, tooltip] = useTooltip();
//   const { isVisible, triggerRect } = tooltip;

//   if (!props.content) {
//     return props.children;
//   }

//   return (
//     <React.Fragment>
//       {React.cloneElement(props.children, trigger)}
//       {isVisible && (
//         <Portal>
//           <div
//             style={{
//               position: "absolute",
//               left: triggerRect
//                 ? triggerRect.left - 6 + triggerRect.width / 2
//                 : 0,
//               top: triggerRect ? triggerRect.top - 8 + window.scrollY : 0,
//               width: 0,
//               height: 0,
//               borderLeft: "10px solid transparent",
//               borderRight: "10px solid transparent",
//               borderBottom: "10px solid black",
//             }}
//           />
//         </Portal>
//       )}
//       <TooltipPopup
//         {...tooltip}
//         label={props.content}
//         aria-label={props.content}
//         style={{
//           background: "black",
//           color: "white",
//           border: "none",
//           borderRadius: "3px",
//           padding: "0.5em 1em",
//         }}
//         position={(triggerRect, tooltipRect) => {
//           if (!triggerRect || !tooltipRect) {
//             return {};
//           }

//           const triggerCenter = triggerRect.left + triggerRect.width / 2;
//           const left = triggerCenter - tooltipRect.width / 2;
//           const maxLeft = window.innerWidth - tooltipRect.width - 2;

//           return {
//             left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
//             top: triggerRect.top - tooltipRect.height - 8 + window.scrollY,
//           };
//         }}
//       />
//     </React.Fragment>
//   );
// };

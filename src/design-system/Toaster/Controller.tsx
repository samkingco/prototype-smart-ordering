import React from "react";

import { Toast, ToastVariant } from "./Toast";
import { Timer, TimerInterface } from "./Timer";

type TransitionState =
  | "entering"
  | "entered"
  | "exiting"
  | "exited"
  | "unmounted";

interface Props {
  message: string;
  onDismiss: () => void;
  transitionState: TransitionState;
  shouldPersist?: boolean;
  variant?: ToastVariant;
  autoDismissSeconds: number; // in seconds
}

export class ToastController extends React.Component<Props> {
  static defaultProps = {
    autoDismissSeconds: 5,
  };

  timer: TimerInterface | null = null;

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  startTimer = () => {
    const { shouldPersist, variant, autoDismissSeconds, onDismiss } =
      this.props;

    if (shouldPersist || variant === "loading") {
      return;
    }

    this.timer = new Timer(onDismiss, autoDismissSeconds * 1000);
  };

  clearTimer = () => {
    if (this.timer) {
      this.timer.clear();
    }
  };

  onMouseEnter = () => {
    if (this.timer) {
      this.timer.pause();
    }
  };

  onMouseLeave = () => {
    if (this.timer) {
      this.timer.resume();
    }
  };

  render() {
    const { variant, message, shouldPersist, transitionState, ...restProps } =
      this.props;

    const handleMouseEnter =
      shouldPersist || variant === "loading" ? () => {} : this.onMouseEnter;
    const handleMouseLeave =
      shouldPersist || variant === "loading" ? () => {} : this.onMouseLeave;

    return (
      <Toast
        variant={variant}
        message={message}
        shouldPersist={shouldPersist}
        transitionState={transitionState}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...restProps}
      />
    );
  }
}

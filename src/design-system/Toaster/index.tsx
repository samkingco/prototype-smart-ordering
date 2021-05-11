import React, { createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { TransitionGroup, Transition } from "react-transition-group";

import { ToastController } from "./Controller";
import { Toast, ToastVariant } from "./Toast";
import { Callback, Action } from "./types";
import { hasDOM, genUUID } from "./utils";
import styled from "styled-components";

interface ToastOptions {
  id?: string;
  shouldPersist?: boolean;
  variant?: ToastVariant;
  onDismiss?: Callback;
  actions?: Action[];
  autoDismissSeconds?: number;
}

interface Toast extends ToastOptions {
  id: string;
  message: string;
}

export interface ToastContextProps {
  notify: (message: string, options?: ToastOptions) => string;
  remove: (id: string) => void;
  clear: () => void;
}

const ToastContext = createContext<ToastContextProps>({
  notify: () => "",
  remove: () => {},
  clear: () => {},
});

interface ToastContainerProps {
  hasToasts: boolean;
}
const ToastContainer = styled.div<ToastContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  max-height: 100%;
  margin: ${(p) => p.theme.spacing.l} auto 0 auto;
  top: 0;
  right: 0;
  position: fixed;
  z-index: 1000;
  pointer-events: ${(p) => (p.hasToasts ? null : "none")};
  visibility: hidden;

  @media screen and (max-width: ${(p) => p.theme.breakpoints.s}) {
    margin-top: ${(p) => p.theme.spacing.m};
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`;

const NOOP = () => {};

interface ToastProviderProps {
  children: React.ReactNode;
}
interface ToastProviderState {
  toasts: Array<Toast>;
}
export class ToastProvider extends React.Component<
  ToastProviderProps,
  ToastProviderState
> {
  state: ToastProviderState = {
    toasts: [],
  };

  has = (id: string) => {
    if (this.state.toasts.length === 0) {
      return;
    }

    return this.state.toasts.filter((t) => t.id === id).length > 0;
  };

  onDismiss =
    (id: string, callback: Callback = NOOP) =>
    () => {
      callback(id);
      this.remove(id);
    };

  notify = (message: string, options: ToastOptions = {}): string => {
    const id = options.id || genUUID();

    if (this.has(id)) {
      return id;
    }

    this.setState((state) => {
      const toast = { id, message, ...options };
      const toasts = [...state.toasts, toast];

      return { toasts };
    });

    return id;
  };

  remove = (id: string, callback: Callback = NOOP) => {
    const cb = () => callback(id);

    if (!this.has(id)) {
      return;
    }

    this.setState((state) => {
      const toasts = state.toasts.filter((t) => t.id !== id);
      return { toasts };
    }, cb);
  };

  clear = () => {
    if (this.state.toasts.length === 0) {
      return;
    }

    this.state.toasts.forEach((t) => this.remove(t.id));
  };

  render() {
    const { children } = this.props;
    const { notify, remove, clear } = this;

    const toasts = Object.freeze(this.state.toasts);
    const hasToasts = toasts.length > 0;

    return (
      <ToastContext.Provider value={{ notify, remove, clear }}>
        {children}

        {hasDOM ? (
          createPortal(
            <ToastContainer hasToasts={hasToasts}>
              <TransitionGroup component={null}>
                {toasts.map(({ id, message, onDismiss, ...otherProps }) => (
                  <Transition
                    appear
                    key={id}
                    mountOnEnter
                    timeout={240}
                    unmountOnExit
                  >
                    {(transitionState: any) => (
                      <ToastController
                        key={id}
                        onDismiss={this.onDismiss(id, onDismiss)}
                        transitionState={transitionState}
                        message={message}
                        {...otherProps}
                      />
                    )}
                  </Transition>
                ))}
              </TransitionGroup>
            </ToastContainer>,
            document.body
          )
        ) : (
          <ToastContainer hasToasts={hasToasts} />
        )}
      </ToastContext.Provider>
    );
  }
}

export const useToaster = (): ToastContextProps => {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw Error("Not inside `ToastProvider`!");
  }

  return {
    notify: ctx.notify,
    remove: ctx.remove,
    clear: ctx.clear,
  };
};

export default useToaster;

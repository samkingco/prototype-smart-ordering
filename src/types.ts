import React from "react";
import { IconComponent } from "./design-system/Icon";

export enum StringBoolean {
  True = "true",
  False = "false",
}

type NotNull<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

/**
 * Takes a type and a given property on that type and excludes null from type of that property
 * e.g. where
 * ```
 * type Foo = { bar: string; bat: string | null }
 *
 * type NewFoo = MakeKeyNotNull<Foo, 'bat'> // -> { bar: string; bat: string; }
 * ```
 */
export type MakeKeyNotNull<T, K extends keyof T> = Omit<T, K> &
  NotNull<Pick<T, K>>;

export type NullOrUndefined = null | undefined;
export type NotNullOrUndefined<T> = Exclude<T, NullOrUndefined>;

/**
 * Helper to construct type predicates with narrowing
 * Construct with the type T and a predicate which returns true if a
 * type is of type T
 */
export const isType =
  <T>(pred: (arg: any) => boolean) =>
  (arg: any): arg is T =>
    pred(arg);

/**
 * Returns true if arg is null or undefined, and narrows the type accordingly
 * @param arg arg to check for null or undefined
 */
export const isNullOrUndefined = isType<NullOrUndefined>(
  (arg) => arg === null || arg === undefined
);

export const isNotNullOrUndefined = <T>(arg: T): arg is NotNullOrUndefined<T> =>
  !isNullOrUndefined(arg);

export const isReactNode = isType<React.ReactNode>(React.isValidElement);
export const isIconComponent = isType<IconComponent>(
  (arg) => typeof arg === "function"
);

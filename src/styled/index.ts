import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

import theme from "./theme";
export type Theme = typeof theme;

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<Theme>;

export { css, createGlobalStyle, keyframes, ThemeProvider, theme };
export default styled;

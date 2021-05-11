import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import theme from "./styled/theme";
import { Theme } from "./styled/styled";
import { ScrollToTopControlller } from "./components/ScrollToTopController";
import { NotImplemented } from "./screens/NotImplemented";
import { Medicine } from "./screens/Medicine";
import { Account } from "./screens/Account";
import { SmartOrdering } from "./screens/SmartOrdering";
import { NextSmartOrder } from "./screens/NextSmartOrder";
import { Start } from "./screens/smart-order-setup/Start";
import { ConfirmAddress } from "./screens/smart-order-setup/ConfirmAddress";
import { ConfirmPayment } from "./screens/smart-order-setup/ConfirmPayment";
import { ConfirmMedicine } from "./screens/smart-order-setup/ConfirmMedicine";
import { AllDone } from "./screens/smart-order-setup/AllDone";
import { Email } from "./screens/Email";
import { ToastProvider } from "./design-system/Toaster";
import { MedicineDetail } from "./screens/MedicineDetail";

const GlobalStyles = createGlobalStyle<Theme>`
  @font-face {
    font-family: 'Echo Icons';
    src: url('/fonts/Echo Icons.woff2') format('woff2'), url('/fonts/Echo Icons.woff') format('woff'), url('/fonts/Echo Icons.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    padding: 0;
    margin: 0;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: ${(p) => p.theme.color.gray10};
    font-family: ${theme.typography.bodyFamily};
    font-weight: 400;
    font-size: 16px;
    color: ${(p) => p.theme.color.gray90};
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
  }

  button, input[type="submit"], input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }

  /* Reset heading sizes by default */
  h1, h2, h3, h4, h5, h6 {
    font-size: 1rem;
  }

  /* Reset for fieldset browser styles: https://thatemil.com/blog/2015/01/03/reset-your-fieldset/ */
  fieldset {
    border: 0;
    padding: 0.01em 0 0 0;
    margin: 0;
    min-width: 0;
  }
  body:not(:-moz-handler-blocked) fieldset {
    display: table-cell;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyles />
          <ToastProvider>
            <Router>
              <ScrollToTopControlller />
              <Switch>
                <Route
                  path="/"
                  component={() => <Redirect to="/medicine" />}
                  exact={true}
                />
                <Route path="/medicine" component={Medicine} exact={true} />
                <Route
                  path="/medicine/next-auto-order"
                  component={NextSmartOrder}
                  exact={true}
                />
                <Route
                  path="/medicine/:medicineId"
                  component={MedicineDetail}
                  exact={true}
                />
                <Route path="/account" component={Account} exact={true} />
                <Route
                  path="/account/auto-ordering"
                  component={SmartOrdering}
                  exact={true}
                />
                <Route
                  path="/account/auto-ordering/setup"
                  component={Start}
                  exact={true}
                />
                <Route
                  path="/account/auto-ordering/confirm-address"
                  component={ConfirmAddress}
                  exact={true}
                />
                <Route
                  path="/account/auto-ordering/confirm-payment"
                  component={ConfirmPayment}
                  exact={true}
                />
                <Route
                  path="/account/auto-ordering/confirm-medicine"
                  component={ConfirmMedicine}
                  exact={true}
                />
                <Route
                  path="/account/auto-ordering/finished"
                  component={AllDone}
                  exact={true}
                />
                <Route path="/email" component={Email} exact={true} />
                <Route path="*" component={NotImplemented} exact={true} />
              </Switch>
            </Router>
          </ToastProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;

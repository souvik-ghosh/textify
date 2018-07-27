import React from "react";
import Main from "./Main";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#42A5F5",
      main: "#2196F3",
      dark: "#1E88E5",
      contrastText: "#000"
    },
    secondary: {
      light: "#FF7043",
      main: "#FF5722",
      dark: "#F4511E",
      contrastText: "#000"
    },
    danger: {
      light: "#F44336",
      main: "#E53935",
      dark: "#D32F2F",
      contrastText: "#000"
    },
  },
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiButton: {
      // Name of the rule
      root: {
        // Some CSS
        borderRadius: 3,
        border: 0,
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
      containedPrimary: {
        color: 'white',
      },
      containedSecondary: {
        color: 'white',
      },
      contained: {
        color: '#424242',
      }
    },
    MuiFormHelperText: {
      root: {
        color: '#f4443e',
      }
    },
    MuiChip: {
      root: {
        height: 'unset',
        marginLeft: '1px',
        marginRight: '1px',
        marginBottom: '1px',
      }
    }
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <div style={{ display: "flex", flex: 1, flexDirection: "column", height: "100%" }}>
      <Main />
    </div>
  </MuiThemeProvider>
);

export default App;

import React from "react";
import Header from "./Header";
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
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div>
        <Header />
      </div>
      <div className="main-div">
        <Main />
      </div>
    </div>
  </MuiThemeProvider>
);

export default App;

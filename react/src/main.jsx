import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

import App from "./App.jsx";
import getLPTheme from "./components/getLPTheme.jsx";
import ToggleColorMode from "./components/ToggleColorMode.jsx";

function Hello() {
  const [mode, setMode] = React.useState('dark');
  const LPtheme = React.useMemo(() => createTheme(getLPTheme(mode)), [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <App />
      <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: "999" }}>
        <ToggleColorMode style={{ backgroundColor: "transparent", border: "none", color: "white" }} mode={mode} toggleColorMode={toggleColorMode} />
      </div>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Hello />
  </React.StrictMode>
);

import React from "react";
import { ContextWrapper } from "./user-context";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "App.css";

const App = () => {
  return (
    <ContextWrapper>
      <Routes />
    </ContextWrapper>
  );
};

export default App;

import React from "react";
import { Header } from "./Header";
import { UIMessages } from "./UIMessages";
import { AppContextProvider } from "../context/contextMessage";
export class App extends React.Component {
  render() {
    return (
      <>
        <AppContextProvider>
          <Header title={String(process.env.REACT_APP_LOGO)} />
          <UIMessages />
        </AppContextProvider>
      </>
    );
  }
}

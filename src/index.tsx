import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles.css";
import "./stylesFCI.css";
import { App } from "./components/App";


// the local dict example is below.
//console.log(format(Date.now(),'ES'))
const app = document.getElementById("app");

ReactDOM.render(<App />, app);

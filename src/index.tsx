import * as React from "react";
import { render } from "react-dom";

import App from "./App";

// document.addEventListener(
//   "touchmove",
//   function(event) {
//     if (event.scale !== 1) {
//       event.preventDefault();
//     }
//   },
//   false
// );

// var lastTouchEnd = 0;
// document.addEventListener(
//   "touchend",
//   function(event) {
//     var now = new Date().getTime();
//     if (now - lastTouchEnd <= 300) {
//       event.preventDefault();
//     }
//     lastTouchEnd = now;
//   },
//   false
// );

const rootElement = document.getElementById("root");
render(<App />, rootElement);

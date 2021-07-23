import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import proj4 from "proj4";
import reportWebVitals from "./reportWebVitals";
import { register } from "ol/proj/proj4";

proj4.defs(
  "EPSG:3301",
  "+proj=lcc+lat_1=59.33333333333334+lat_2=58+lat_0=57.51755393055556+lon_0=24+x_0=500000+y_0=6375000+ellps=GRS80+towgs84=0,0,0,0,0,0,0+units=m+no_defs"
);
register(proj4);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

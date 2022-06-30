import React from "react";
import { render } from "react-dom";
import Routes from './routes';
import { BrowserRouter } from "react-router-dom";
import './global.module.less';

render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById("root")
);

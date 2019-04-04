import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from "react-router-dom";
import {App} from "./App";
import {createBrowserHistory } from "../node_modules/history";
const history = createBrowserHistory();

ReactDOM.render(<BrowserRouter><App history={history}/></BrowserRouter>, document.getElementById('root'));
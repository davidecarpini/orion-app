import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "react-toggle/style.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { QueryClientProvider } from "react-query";
import { StrictMode } from "react";
import { queryClient } from "./queryClient";

ReactDOM.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

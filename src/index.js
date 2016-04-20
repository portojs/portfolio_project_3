import React from "react";
import ReactDOM from "react-dom";

import QuoteWindow from "./components/quote-window";

import "./scss/app.scss";

class Container extends React.Component {
  render() {
    return (
      <QuoteWindow />
    );
  }
}

ReactDOM.render(
  <Container />,
  document.getElementById("container")
);

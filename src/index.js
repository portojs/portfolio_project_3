import React from "react";
import ReactDOM from "react-dom";

import BackGround from "./components/back-ground";
import QuoteWindow from "./components/quote-window";

import "./scss/app.scss";

class Container extends React.Component {
  render() {
    return (
      <div>
        <BackGround />
        <QuoteWindow />
      </div>
    );
  }
}

ReactDOM.render(
  <Container />,
  document.getElementById("container")
);

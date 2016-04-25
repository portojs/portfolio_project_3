import React, { Component } from "react";

import QuoteWindow from "./quote-window";

export default class BackGround extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: 'one'
    };
  }

  moveBackground() {
    console.log("click");
    $("#background").css({'background-color': 'red'});
  }

  render() {
    return (
      <div id="background">
        I am a background.
        <QuoteWindow
          onButtonClick={this.moveBackground}
          background={this.state.background}
          value={18}
        />
      </div>
    );
  }
}

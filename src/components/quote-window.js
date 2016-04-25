import React, {Component} from "react";

export default class QuoteWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onButtonClick() {
    console.log("first click");
    // console.log(background);
    console.log(this.props.value)
    // this.props.onButtonClick();
  }

  render() {
    return (
      <div id="window">
        <div id="quote-text">Whaaat?</div>
        <button onClick={this.onButtonClick} id="next-quote">Next Quote</button>
      </div>
    );
  }
}

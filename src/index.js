import React from "react";
import ReactDOM from "react-dom";

import "./scss/app.scss";

class Container extends React.Component {

  render() {

    var textCircle = $("#circle-text"),
        colors = ["#E64A19", "#FF5722", "#FFCCBC", "#795548",
      "#727272", "#D32F2F", "#F44336", "#FF4081", "#7B1FA2",
    "#9C27B0", "#9C27B0", "#E1BEE7"];

    function bam() {
      $("#circle-bg").addClass("enlarge");
    }
,'#FFCCBC',
    function babam() {
      $("#circle-bg").removeClass("enlarge");
    }

    function disappear() {
      var el = $("#circle-bg"),
          newElement = el.clone(true);

      el.addClass("circle-click");
      window.setTimeout(function() {
        el.remove();
        $("#wrapper").append(newElement);
      }, 600);
    }

    return (
      <div id="wrapper">

        <div id="circle-text" onMouseEnter={bam} onMouseLeave={babam} >
          <div id="inner">
            <div id="quote-text">Whaaat?</div>
            <button onClick={disappear} id="next-quote">Next Quote</button>
          </div>
        </div>

        <div id="circle-bg">
        </div>

      </div>
    );
  }
}

ReactDOM.render(
  <Container />,
  document.getElementById("container")
);

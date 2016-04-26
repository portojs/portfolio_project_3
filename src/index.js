import React from "react";
import ReactDOM from "react-dom";

import "./scss/app.scss";

class Container extends React.Component {

  render() {

    var colors = ["#E64A19", "#FF5722", "#FFCCBC", "#795548",
                  "#727272", "#D32F2F", "#F44336", "#FF4081",
                  "#7B1FA2", "#9C27B0", "#E1BEE7", "#7C4DFF",
                  "#303F9F", "#3F51B5", "#C5CAE9", "#448AFF",
                  "#0288D1", "#03A9F4", "#00BCD4", "#009688",
                  "#B2DFDB"];

    function bam() {
      $(".circle-bg").addClass("enlarge");
    }

    function babam() {
      $(".circle-bg").removeClass("enlarge");
    }

    function disappear() {
      var circleBg = $(".circle-bg"),
          newElement = circleBg.clone(true);

      circleBg.addClass("circle-click");
      window.setTimeout(function() {
        circleBg.remove();
        $("#wrapper").append(newElement);
        $("body").css({
          "background-color": "#E1BEE7"
        });
      }, 900);
    }

    window.onload = function() {
      $(".circle-bg").css(
        {"background-color": "#E1BEE7"}
      );
    }

    return (
      <div id="wrapper">

        <div id="circle-text" >
          <div id="inner">
            <div id="quote-text">Whaaat?</div>
            <button onClick={disappear} id="next-quote">Next Quote</button>
          </div>
        </div>

        <div className="circle-bg">
        </div>

      </div>
    );
  }
}

ReactDOM.render(
  <Container />,
  document.getElementById("container")
);

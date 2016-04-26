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
                  "#B2DFDB"],
        oldColor = "",
        timeOut;

    function randomBgColor() {
      var filteredColors = colors.filter(function(color) {
            return color !== $("body").css("background-color")
              && $(".circle-bg").css("background-color");
          }),
          randomNumber = Math.floor(Math.random() * (filteredColors.length));
      return filteredColors[randomNumber];
    }

    function bam() {
      $(".circle-bg").addClass("enlarge");
    }

    function babam() {
      $(".circle-bg").removeClass("enlarge");
    }

    function handleClick() {
      var circleBg = $(".circle-bg"),
          newElement = circleBg.clone(true),
          oldColor = circleBg.css("background-color");

      clearTimeout(timeOut);
      console.log("Body color: " + $("body").css("background-color") + ". Circle color: " + $(".circle-bg").css("background-color"));
      // bg-circle grows and covers the whole screen
      // circleBg.addClass("circle-click");
      circleBg.addClass("circle-click");
      // body bg-color = circle bg-color
      timeOut = setTimeout(function() {
        newElement.css({"background-color": randomBgColor()});
        circleBg.remove();
        $("#wrapper").append(newElement);
        $("body").css({
          "background-color": oldColor
        });
      }, 700);
      // set bg-circle color to a new random one
    }

    window.onload = function() {
      $("body").css({
        "background-color": randomBgColor()
      });
      $(".circle-bg").css({
        "background-color": randomBgColor()
      });
    }

    return (
      <div id="wrapper">

        <div id="circle-text" >
          <div id="inner">
            <div id="quote-text">Whaaat?</div>
            <button onClick={handleClick} id="next-quote">Next Quote</button>
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

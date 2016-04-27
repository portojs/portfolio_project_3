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
        slicedColor = "",
        timeOut;

    // helper function: convert rgb to hex
    // (from http://www.sitepoint.com/jquery-convert-rgb-hex-color/)
    // function rgb2hex(rgb) {
    //   console.log(rgb);
    //   rgb = rgb.match(/^rgb((d+),s*(d+),s*(d+))$/);
    //   return "#" +
    //     ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    //     ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    //     ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
    // }

    function randomBgColor() {
      var filteredColors, randomNumber;
      if (slicedColor) {
        filteredColors = colors.filter(function(color) {
          return color !== slicedColor;
        });
        randomNumber = Math.floor(Math.random() * (filteredColors.length));
        slicedColor = filteredColors[randomNumber];
      } else {
        randomNumber = Math.floor(Math.random() * (colors.length));
        slicedColor = colors[randomNumber];
      }
      console.log("Original colors: " + colors);
      console.log("Filtered colors: " + filteredColors);
      console.log("Sliced color: " + slicedColor);
      return slicedColor;
    }

    function handleClick() {
      var $circleBg = $(".circle-bg"),
          $button = $("#next-quote"),
          newElement = $circleBg.clone(true),
          oldColor = $circleBg.css("background-color");

      // console.log($(".circle-bg").css("background-color"));
      clearTimeout(timeOut);
      $button.attr("disabled", "disabled");
      newElement.css({"background-color": randomBgColor()});
      $circleBg.addClass("circle-click");

      timeOut = window.setTimeout(function() {
        $circleBg.remove();
        $("#wrapper").append(newElement);
        $("body").css({
          "background-color": oldColor
        });
        // console.log($("body").css("background-color"));
        $button.removeAttr("disabled");
      }, 700);
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

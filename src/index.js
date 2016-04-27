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
        // !!! does not work because hex-color is compared to rgba
            return color != $("body").css("background-color") && $(".circle-bg").css("background-color");
          }),
          randomNumber = Math.floor(Math.random() * (filteredColors.length));
          console.log(filteredColors);
      return filteredColors[randomNumber];
    }

    function bam() {
      $(".circle-bg").addClass("enlarge");
    }

    function babam() {
      $(".circle-bg").removeClass("enlarge");
    }

    function handleClick() {
      var $circleBg = $(".circle-bg"),
          $this = $("#next-quote"),
          newElement = $circleBg.clone(true),
          oldColor = $circleBg.css("background-color");

      clearTimeout(timeOut);
      $this.attr("disabled", "disabled");
      // console.log("Body color: " + $("body").css("background-color") + ". Circle color: " + $(".circle-bg").css("background-color"));
      newElement.css({"background-color": randomBgColor()});
      $circleBg.addClass("circle-click");

      timeOut = window.setTimeout(function() {
        $circleBg.remove();
        $("#wrapper").append(newElement);
        $("body").css({
          "background-color": oldColor
        });
        $this.removeAttr("disabled");
      }, 700);
    }

    function handleClick2() {
      var $circleBg = $(".circle-bg"),
          $this = $("#next-quote"),
          oldColor = $circleBg.css("background-color");

      clearTimeout(timeOut);
      $this.attr("disabled", "disabled");

      $circleBg.css({"circle-click": "all 1s"});
      $circleBg.addClass("circle-click");

      timeOut = setTimeout(function() {
        $("body").css({
          "background-color": oldColor
        });
        $this.removeAttr("disabled");
        $circleBg.css({"circle-click": ""});
        $circleBg.removeClass("circle-click");
        $circleBg.css({"background-color": randomBgColor()});
      }, 1700);
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

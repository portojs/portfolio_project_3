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

    function randomColor() {
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
      return slicedColor;
    }

    function animateBgColor() {
      var $circleBg = $(".circle-bg"),
          $button = $("#next-quote"),
          newElement = $circleBg.clone(true);

      oldColor = $circleBg.css("background-color");

      clearTimeout(timeOut);
      $button.attr("disabled", "disabled");
      newElement.css({"background-color": randomColor()});
      $circleBg.addClass("circle-click");
      $("i").css({
        "color": oldColor
      });

      timeOut = window.setTimeout(function() {
        $circleBg.remove();
        $("#wrapper").append(newElement);
        $("body").css({
          "background-color": oldColor
        });
        $button.removeAttr("disabled");
      }, 700);
    }

    function generateQuote() {
      $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(data) {
        $("#quote-text").css({"opacity": 0, "color": oldColor});
        $("#quote-author").css({"opacity": 0, "color": oldColor});
        window.setTimeout(function() {
          // animateBgColor();
          $("#quote-text").html(data.quoteText);
          data.quoteAuthor ? $("#quote-author").html("- " + data.quoteAuthor) : $("#quote-author").html("");
          $("#quote-text").css({"opacity": 1});
          $("#quote-author").css({"opacity": 1});
        }, 500);
      })
    }

    function handleClick() {
      animateBgColor();
      generateQuote();
    }

    window.onload = function() {
      var mainColor = randomColor();
      $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(data) {
          $("#quote-text").html(data.quoteText);
          data.quoteAuthor ? $("#quote-author").html("- " + data.quoteAuthor) : $("#quote-author").html("");
      }).done(function() {
        $("body").animate({
          backgroundColor: mainColor,
          color: randomColor()
        }, 1500, function() {
          console.log("great");
        });
        $(".circle-bg").css({
          "background-color": randomColor()
        });
        $("#quote-text").css({
          "opacity": 1
        });
        $("#quote-author").css({
          "opacity": 1
        });
      }).fail(function() {
        $("#quote-text").html("CONNECTION FAILURE");
        $("#quote-author").html("");
      });
    }

    return (
      <div id="wrapper">

        <div id="circle-text" >
          <div id="inner">
            <div id="quote-text">Whaaat?</div>
            <div id="quote-author"></div>
            <span onClick={handleClick} id="tweet"><i className="fa fa-twitter"></i></span>
            <span onClick={handleClick} id="next-quote"><i className="fa fa-play"></i></span>
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

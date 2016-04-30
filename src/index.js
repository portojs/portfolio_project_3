import React from "react";
import ReactDOM from "react-dom";

import "./scss/app.scss";

class Container extends React.Component {

  render() {

    var colors = ["#E64A19", "#FF5722", "#FFCCBC", "#795548", "#727272",
                  "#D32F2F", "#F44336", "#FF4081", "#7B1FA2", "#9C27B0",
                  "#E1BEE7", "#7C4DFF", "#303F9F", "#3F51B5", "#C5CAE9",
                  "#448AFF", "#0288D1", "#03A9F4", "#00BCD4", "#009688",
                  "#B2DFDB"],
        oldColor = "",
        slicedColor = "",
        onLoadTimeOut,
        blockButton;

    function randomColor() {
      var filteredColors,
          randomNumber;

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
          newElement = $circleBg.clone(true);

      oldColor = $circleBg.css("background-color");

      newElement.css({"background-color": randomColor()});
      $circleBg.addClass("circle-click");
      $("i").animate({
        color: oldColor
      }, 800);

      window.setTimeout(function() {
        $circleBg.remove();
        $("#wrapper").append(newElement);
        $("body").css({
          "background-color": oldColor
        });
      }, 700);
    }

    function generateQuote() {
      var $quoteText = $("#quote-text"),
          $quoteAuthor = $("#quote-author");

      $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(data) {
          $quoteText.html(data.quoteText);
          data.quoteAuthor ? $quoteAuthor.html("- " + data.quoteAuthor) : $quoteAuthor.html("");
      }).fail(function() {
        $quoteText.html("CONNECTION FAILURE");
        $quoteAuthor.html("");
      });
    }

    function handleClick() {
      var $quoteText = $("#quote-text"),
          $quoteAuthor = $("#quote-author");

      if (onLoadTimeOut || blockButton) {
        return null;
      } else {
        blockButton = true;
        $quoteText.animate({
          opacity: 0
        }, 800);
        $quoteAuthor.animate({
          opacity: 0
        }, 800, function() {
          animateBgColor();
          generateQuote();
          $quoteText.css({
            "color": oldColor
          });
          $quoteAuthor.css({
            "color": oldColor
          });
          $quoteText.animate({
            opacity: 1
          }, 800);
          $quoteAuthor.animate({
            opacity: 1
          }, 800, function() {
            blockButton = false;
          });
        });
      }
    }

    window.onload = function() {
      var mainColor = randomColor(),
          $quoteText = $("#quote-text"),
          $quoteAuthor = $("#quote-author");

      generateQuote();
      $("body").animate({
        backgroundColor: mainColor,
        color: mainColor
      });
      $(".circle-bg").animate({
        backgroundColor: randomColor()
      });

      // this timeout is needed to show text only after a new quote is loaded and all animations are finished
      onLoadTimeOut = window.setTimeout(
        function() {
          $("i").animate({
            opacity: 1
          }, 800);
          $quoteText.animate({
            opacity: 1
          }, 800);
          $quoteAuthor.animate({
            opacity: 1
          }, 800);
          onLoadTimeOut = 0;
        }, 800
      );
    }

    return (
      <div id="wrapper">

        <div id="circle-text" >
          <div id="quote">
            <div id="quote-text">Text</div>
            <div id="quote-author">Author</div>
          </div>
          <div id="buttons">
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

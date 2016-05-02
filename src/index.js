import React from "react";
import ReactDOM from "react-dom";

import "./scss/app.scss";

class Container extends React.Component {

  render() {

    var colors = ["#FBC02D", "#5D4037", "#E64A19", "#F57C00", "#FFA000",
                  "#455A64", "#FBC02D", "#AFB42B", "#689F38", "#388E3C",
                  "#00796B", "#0097A7", "#0288D1", "#1976D2", "#303F9F",
                  "#512DA8", "#7B1FA2", "#C2185B", "#D32F2F", "#616161"],
        oldColor = "",
        slicedColor = "",
        onLoadTimeOut,
        blockButton;

    function randomColor() {
      var filteredColors,
          randomNumber;

      // check if this is the first load
      if (slicedColor) {
        // filter color array to remove the current color
        filteredColors = colors.filter(function(color) {
          return color !== slicedColor;
        });
      } else {
        filteredColors = colors;
      }

      randomNumber = Math.floor(Math.random() * (filteredColors.length));
      slicedColor = filteredColors[randomNumber];

      return slicedColor;
    }

    function animateBgColor() {
      var $circleBg = $(".circle-bg"),
          newElement = $circleBg.clone(true);

      // save color of the old circle to use later as body color
      oldColor = $circleBg.css("background-color");
      // generate a new color for a new circle
      newElement.css({"background-color": randomColor()});
      // start the expanding circle animation
      $circleBg.addClass("circle-click");

      // change buttons color
      $("i").animate({
        color: oldColor
      }, 600, function() {
        // delete the old cirlce
        $circleBg.remove();
        // add a new circle underneath a quote circle
        $("#wrapper").append(newElement);
        // change body bg-color to that of the old circle
        $("body").css({
          "background-color": oldColor
        });
      });
    }

    function generateQuote() {
      var $quoteText = $("#quote-text"),
          $quoteAuthor = $("#quote-author");

      // get a new quote
      $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(data) {
          // insert the new quote into a corresponding placeholder
          $quoteText.html(data.quoteText);
          // insert the author if he exists, otherwise the placeholder will be empty
          data.quoteAuthor ? $quoteAuthor.html("- " + data.quoteAuthor) : $quoteAuthor.html("");
          // set a link for 'tweet' button
          $("#tweet").attr("href", "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent("'" + data.quoteText + "' '" + data.quoteAuthor));
      }).fail(function() {
        // show default message if there is an error
        $quoteText.html("CONNECTION FAILURE");
        $quoteAuthor.html("");
      });
    }

    function handleClick() {
      var $quoteText = $("#quote-text"),
          $quoteAuthor = $("#quote-author");

      // block 'next quote' button while there is still animation going on
      if (onLoadTimeOut || blockButton) {
        return null;
      } else {
        // block 'next quote' button until all animations are over
        blockButton = true;
        // hide current quote and its author
        $quoteText.animate({
          opacity: 0
        }, 800);
        $quoteAuthor.animate({
          opacity: 0
        }, 800, function() {
          // set the expanding circle animation
          animateBgColor();
          // get a new quote
          generateQuote();
          // set a new color for the quote and author
          $quoteText.css({
            "color": oldColor
          });
          $quoteAuthor.css({
            "color": oldColor
          });
          // show new quote and its quthor
          $quoteText.animate({
            opacity: 1
          }, 800);
          $quoteAuthor.animate({
            opacity: 1
          }, 800, function() {
            // unblock 'next quote' button
            blockButton = false;
          });
        });
      }
    }

    window.onload = function() {
      var mainColor = randomColor(),
          $quoteText = $("#quote-text"),
          $quoteAuthor = $("#quote-author");

      // get a new quote
      generateQuote();
      // animate color change for background and text elements (first load)
      $("body").animate({
        backgroundColor: mainColor,
        color: mainColor
      });
      $("i").animate({
        color: mainColor
      });
      // generate a new color for the hidden expanding circle
      $(".circle-bg").animate({
        backgroundColor: randomColor()
      });

      // show text elements only after a new quote is loaded and all animations are finished
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
          // unblock 'next quote' button
          onLoadTimeOut = 0;
        }, 800);
    }

    return (
      <div id="wrapper">

        <div id="circle-text" >
          <div id="quote">
            <div id="quote-text">Text</div>
            <div id="quote-author">Author</div>
          </div>
          <div id="buttons">
            <a id="tweet" target="_blank"><i className="fa fa-twitter"></i></a>
            <a onClick={handleClick} id="next-quote"><i className="fa fa-play"></i></a>
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

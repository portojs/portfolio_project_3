import React from "react";
import ReactDOM from "react-dom";

import "./scss/app.scss";

class Container extends React.Component {

  render() {

    var angle = 0,
        scaleX = 0,
        translate1 = 0,
        translate2 = 0,
        translate3 = 0,
        skewX = 0,
        translateFlag = true,
        textCircle = $("#circle-text");

    function moveBackground() {
      angle += 30;
      scaleX += 0.5;
      translate1 += Math.floor(Math.random() * (20 - 1)) + 1;
      translate2 += Math.floor(Math.random() * (20 - 1)) + 1;
      translate3 += Math.floor(Math.random() * (20 - 1)) + 1;
      skewX += 10;
      $(".g-form1").css({"-webkit-transform":
        "rotate(-47deg) translateX(" + translate1 + "px)"});
      $(".g-form2").css({"-webkit-transform":
        "rotate(-47deg) translateX(" + translate2 + "px)"});
      $(".g-form3").css({"-webkit-transform":
          "rotate(-47deg) translateY(" + translate3 + "px)"});
    }

    function bam() {
      $("#circle-bg").addClass("enlarge");
    }

    function babam() {
      $("#circle-bg").removeClass("enlarge");
    }

    // function reset() {
    //   $("#circle-bg").css({"opacity": 1, "transform": "scale(1)"});
    // }

    function disappear() {
      var el = $("#circle-bg"),
          newElement = el.clone(true);

      el.addClass("circle-click");
      window.setTimeout(function() {
        el.remove();
        $("#wrapper").append(newElement);
      }, 600);
      // el.before( el.clone(true) ).remove();

      // console.log(element.classList());
      // $("#circle-bg").css({"opacity": 0, "transform": "scale(2.0)"});
      // $('#circle-bg').animate({  textIndent: 0 }, {
      //     step: function(now,fx) {
      //       $(this).css('-webkit-transform','scale('+now+')');
      //     },
      //     duration:'slow'
      // },'linear', function() {
      //   console.log("bam");
      //   $('#circle-bg').css('-webkit-transform', 'scale(1)');
      // });
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

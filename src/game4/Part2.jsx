import React, { useState, useEffect, useRef } from "react";
import Indicator from "../UI/Indicator";

const Part2 = ({ helpOverlay, setHelpFingerPosition }) => {
  const [indicator, setIndicator] = useState({
    active: false,
    wrong: false,
  });
  const [verbElement, setVerbElement] = useState({
    left: window.innerWidth - 200,
    width: 150,
    borderWidth: 20,
  });

  const circleRef = useRef(null);

  const handleCircleMove = (initEvent) => {
    let prevPos = initEvent.clientX;
    let moveSide;

    let sentence = document.querySelector(".sentence");

    let initWidth = initEvent.target.offsetWidth;
    let initLeft = verbElement.left;
    let width;
    let left;

    let widthBreakMax = sentence.offsetWidth;
    let widthBreakMin = 150;

    let initEventLeft = initEvent.clientX;
    let initEventLeftWidth = initEvent.clientX;

    let right =
      initEvent.clientX >
      initEvent.target.getBoundingClientRect().right - initWidth / 2;

    let prevSide;

    const moveElemenet = (moveEvent) => {
      if (moveEvent.clientX > prevPos) moveSide = "right";
      else if (moveEvent.clientX < prevPos) moveSide = "left";

      prevPos = moveEvent.clientX;

      for (let i = 0; i < sentence.children.length; i++) {
        if (right) {
          if (
            moveEvent.clientX >
              sentence.children[i].getBoundingClientRect().left &&
            moveEvent.clientX <
              sentence.children[i].getBoundingClientRect().left +
                sentence.children[i].offsetWidth
          ) {
            sentence.children[i].style.backgroundColor = "#c7c7c7";
          } else if (
            initEvent.target.getBoundingClientRect().left +
              verbElement.width / 5 / 2 >
              sentence.children[i].getBoundingClientRect().left &&
            initEvent.target.getBoundingClientRect().left +
              verbElement.width / 5 / 2 <
              sentence.children[i].getBoundingClientRect().left +
                sentence.children[i].offsetWidth
          ) {
            sentence.children[i].style.backgroundColor = "#c7c7c7";
          } else {
            sentence.children[i].style.backgroundColor = "transparent";
          }
        } else {
          if (
            moveEvent.clientX >
              sentence.children[i].getBoundingClientRect().left &&
            moveEvent.clientX <
              sentence.children[i].getBoundingClientRect().left +
                sentence.children[i].offsetWidth
          ) {
            sentence.children[i].style.backgroundColor = "#c7c7c7";
          } else if (
            initEvent.target.getBoundingClientRect().right -
              verbElement.width / 5 / 2 >
              sentence.children[i].getBoundingClientRect().left &&
            initEvent.target.getBoundingClientRect().right -
              verbElement.width / 5 / 2 <
              sentence.children[i].getBoundingClientRect().left +
                sentence.children[i].offsetWidth
          ) {
            sentence.children[i].style.backgroundColor = "#c7c7c7";
          } else {
            sentence.children[i].style.backgroundColor = "transparent";
          }
        }
      }

      if (right) {
        width = moveEvent.clientX - initEventLeftWidth + initWidth;
        left = moveEvent.clientX - initEventLeft + initLeft;

        if (width < widthBreakMax && width >= widthBreakMin) {
          setVerbElement((prev) => {
            return { ...prev, width };
          });

          initLeft = initEvent.target.offsetLeft;

          initEventLeft = moveEvent.clientX;
        } else {
          if (moveSide !== prevSide) {
            initEventLeftWidth = moveEvent.clientX;
          }
          prevSide = moveSide;

          initWidth = initEvent.target.getBoundingClientRect().width;
          setVerbElement((prev) => {
            return { ...prev, left };
          });
        }
      } else {
        width = initWidth - (moveEvent.clientX - initEventLeft);

        if (width < widthBreakMax && width >= widthBreakMin) {
          setVerbElement((prev) => {
            return {
              ...prev,
              width,
              left: moveEvent.clientX - initEvent.clientX + initLeft,
            };
          });
        } else {
          initEventLeft = moveEvent.clientX;
          initWidth = initEvent.target.getBoundingClientRect().width;
          setVerbElement((prev) => {
            return {
              ...prev,
              left: moveEvent.clientX - initEvent.clientX + initLeft,
            };
          });
        }
      }
    };

    document.addEventListener("mousemove", moveElemenet);

    const endMoveElement = (endEvent) => {
      document.removeEventListener("mousemove", moveElemenet);
      document.removeEventListener("mouseup", endMoveElement);

      let correct = 0;

      for (let i = 0; i < sentence.children.length; i++) {
        if (sentence.children[i].style.backgroundColor !== "transparent") {
          sentence.children[i].style.backgroundColor = sentence.children[
            i
          ].getAttribute("verb")
            ? "#A0C814"
            : "#EB6400";

          if (sentence.children[i].getAttribute("verb")) {
            correct++;
          }
        }
      }

      if (correct < 2) {
        setIndicator({ active: true, wrong: true });
      } else {
        setIndicator({ active: true, wrong: false });
      }

      setTimeout(() => {
        setIndicator({ active: false, wrong: false });
      }, 1000);
    };

    document.addEventListener("mouseup", endMoveElement);
  };

  useEffect(() => {
    if (helpOverlay) {
      setHelpFingerPosition([
        circleRef.current.getBoundingClientRect().left,
        circleRef.current.getBoundingClientRect().top,
      ]);

      setTimeout(() => {
        setHelpFingerPosition("init");
        setHelpFingerPosition(false);
      }, 2000);
    }
  }, [helpOverlay]);

  return (
    <>
      <div className="part2">
        <div className="wrapper">
          <div className="sentence">
            <span>Ich</span>
            <span verb="true">have</span>
            <span>schon</span>
            <span>viele</span>
            <span>Spiele</span>
            <span verb="true">gewonnen.</span>
          </div>
        </div>
        <div
          className="rectangle"
          style={{
            left: verbElement.left,
            width: verbElement.width,
            height: verbElement.width / 1.8,
            borderBottomLeftRadius: verbElement.width / 1.8,
            borderBottomRightRadius: verbElement.width / 1.8,
            borderWidth: verbElement.width / 5,
          }}
          onMouseDown={handleCircleMove}
          ref={circleRef}
        ></div>
      </div>
      <Indicator active={indicator.active} wrong={indicator.wrong} />
    </>
  );
};

export default Part2;

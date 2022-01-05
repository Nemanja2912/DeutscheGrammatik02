import React, { useState } from "react";

const Part2 = () => {
  const [verbElement, setVerbElement] = useState({
    left: 550,
    width: 150,
    borderWidth: 20,
  });

  const handleCircleMove = (initEvent) => {
    let sentence = document.querySelector(".sentence");

    let initWidth = 150;
    let initLeft = verbElement.left;
    let width;
    let left;

    let widthBreakMax = sentence.offsetWidth;
    let widthBreakMin = 150;

    let initEventLeft = initEvent.clientX;

    console.log(initEventLeft);

    let right =
      initEvent.clientX >
      initEvent.target.getBoundingClientRect().right - initWidth / 2;

    const moveElemenet = (moveEvent) => {
      for (let i = 0; i < sentence.children.length; i++) {
        if (
          moveEvent.clientX >
            sentence.children[i].getBoundingClientRect().left &&
          moveEvent.clientX <
            sentence.children[i].getBoundingClientRect().left +
              sentence.children[i].offsetWidth
        ) {
          sentence.children[i].style.backgroundColor = "#c7c7c7";
        } else {
          sentence.children[i].style.backgroundColor = "transparent";
        }
      }

      if (right) {
        width = initWidth + moveEvent.clientX - initEventLeft;

        let additionalValue = width >= widthBreakMin ? widthBreakMax - 150 : 0;

        left =
          moveEvent.clientX - initEvent.clientX + initLeft - additionalValue;

        if (width < widthBreakMax && width >= widthBreakMin) {
          setVerbElement((prev) => {
            return { ...prev, width };
          });
        } else {
          initEventLeft = moveEvent.clientX;
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
    };

    document.addEventListener("mouseup", endMoveElement);
  };

  return (
    <div className="part2">
      <div className="wrapper">
        <div className="sentence">
          <span>Ich </span>
          <span>have </span>
          <span>schon </span>
          <span>viele </span>
          <span>Spiele </span>
          <span>gewonnen.</span>
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
      ></div>
    </div>
  );
};

export default Part2;

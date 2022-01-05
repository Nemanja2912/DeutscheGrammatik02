import React, { useState } from "react";

const Part2 = () => {
  const [verbElement, setVerbElement] = useState({
    left: 50,
    width: 200,
  });

  const handleCircleMove = (initElement) => {
    let prevPos = 0;

    let initWidth = verbElement.width;
    let width;

    const moveElemenet = (moveEvent) => {
      width = initWidth + moveEvent.clientX - initElement.clientX;

      console.log(initWidth + moveEvent.clientX - initElement.clientX);

      setVerbElement((prev) => {
        return { ...prev, width: width };
      });
    };

    document.addEventListener("mousemove", moveElemenet);
  };

  return (
    <div className="part2">
      <div className="sentence">
        <span>Ich </span>
        <span>have </span>
        <span>schon </span>
        <span>viele </span>
        <span>Spiele </span>
        <span>gewonnen.</span>
      </div>
      <div
        className="rectangle"
        style={{
          left: verbElement.left,
          width: verbElement.width,
        }}
        onMouseDown={handleCircleMove}
      ></div>
    </div>
  );
};

export default Part2;

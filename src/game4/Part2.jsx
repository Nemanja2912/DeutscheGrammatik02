import React, { useState } from "react";

const Part2 = () => {
  const [verbCircle, setVerbCircle] = useState({
    left: 50,
    scale: 1,
  });

  const handleCircleMove = () => {
    let scale = 1;
    let prevPos = 0;
    const scaleCircle = (scaleEvent) => {
      if (scaleEvent.clientX >= prevPos && scale <= 3) {
        scale += 0.01;
      } else if (scaleEvent.clientX < prevPos && scale > 1) {
        scale -= 0.01;
      }

      prevPos = scaleEvent.clientX;

      console.log(verbCircle.scale);

      setVerbCircle((prev) => {
        return { ...prev, scale: scale };
      });
    };

    document.addEventListener("mousemove", scaleCircle);
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
      <div className="cut"></div>
      <div
        className="verb-half-circle"
        style={{
          left: verbCircle.left,
          transform: `scale(${verbCircle.scale})`,
        }}
        onMouseDown={handleCircleMove}
      ></div>
    </div>
  );
};

export default Part2;

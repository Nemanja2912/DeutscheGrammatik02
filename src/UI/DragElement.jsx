import useMove from "./../hook/useMove";
import { useEffect, useState } from "react";
import Indicator from "./Indicator";

const DragElement = ({
  dropRef,
  returnState = false,
  customClass,
  children,
}) => {
  const [elementState, handleMove] = useMove(dropRef);
  const [indicator, setIndicator] = useState({ active: false, wrong: false });

  useEffect(() => {
    if (returnState) {
      returnState(elementState);
    }
  }, [elementState, returnState]);

  useEffect(() => {
    setIndicator(elementState.indicator);
  }, [elementState.indicator]);

  return (
    <>
      <Indicator active={indicator.active} wrong={indicator.wrong} />
      <div
        className={`dragElement ${elementState.isDone && customClass}`}
        style={{
          left: elementState.x,
          top: elementState.y,
          transition: `${elementState.transition}ms`,
          zIndex: elementState.zIndex,
          position: "relative",
        }}
        onMouseDown={handleMove}
      >
        {children}
      </div>
    </>
  );
};

export default DragElement;

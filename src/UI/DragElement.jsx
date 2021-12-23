import useMove from "./../hook/useMove";
import { useEffect, useState, useRef } from "react";
import Indicator from "./Indicator";

const DragElement = ({
  dropRef,
  returnState = false,
  customClass,
  children,
  moveToDrop = false,
  move = true,
  customDropPosition = false,
}) => {
  const [elementState, handleMove, dispatchMove] = useMove(
    dropRef,
    customDropPosition
  );
  const [indicator, setIndicator] = useState({ active: false, wrong: false });

  useEffect(() => {
    if (moveToDrop) {
      dispatchMove({
        type: "CUSTOM",
        payload: {
          transition: 1000,
          x:
            dropRef.current.getBoundingClientRect().left -
            elementRef.current.getBoundingClientRect().left,
          y:
            dropRef.current.getBoundingClientRect().top -
            elementRef.current.getBoundingClientRect().top,
          zIndex: 1,
          indicator: { active: true, wrong: false },
        },
      });

      setTimeout(() => {
        dispatchMove({
          type: "CUSTOM",
          payload: {
            isDone: true,
            indicator: { active: false },
          },
        });
      }, 1000);
    }
  }, [moveToDrop, dispatchMove, dropRef]);

  useEffect(() => {
    if (returnState) {
      returnState({
        ...elementState,
        absoluteX: elementRef.current.getBoundingClientRect().left,
        absoluteY: elementRef.current.getBoundingClientRect().top,
      });
    }
  }, [elementState, returnState]);

  useEffect(() => {
    if (move) setIndicator(elementState.indicator);
  }, [elementState.indicator]);

  const elementRef = useRef();

  return (
    <>
      <Indicator active={indicator.active} wrong={indicator.wrong} />
      <div
        ref={elementRef}
        className={`dragElement ${elementState.isDone && customClass}`}
        style={{
          left: move ? elementState.x : 0,
          top: move ? elementState.y : 0,
          transitionDuration: `${elementState.transition}ms`,
          zIndex: elementState.zIndex,
          position: "relative",
          transitionTimingFunction: "linear",
        }}
        onMouseDown={handleMove}
      >
        {children}
      </div>
    </>
  );
};

export default DragElement;

import React from "react";

import "../css/game2.css";
import DragElement from "../UI/DragElement";
import Ball from "./../UI/Ball";
import Container from "./Container";
import Group from "./Group";
import { useState, useEffect, useReducer, createRef, useRef } from "react";
import wordList from "./wordList/wordList";

let ballActiveList = [];
let ballActiveStatus = [];

for (let i = 0; i < wordList.length; i++) {
  ballActiveList[i] = [];
  ballActiveStatus[i] = [];
  for (let j = 0; j < wordList[i].length; j++) {
    ballActiveList[i][j] = false;
    ballActiveStatus[i][j] = true;
  }
}

const Game2 = () => {
  const [ballActive, setBallActive] = useState(ballActiveList);
  const [ballStatus, setBallStatus] = useState(ballActiveStatus);
  const [buttonShow, setButtonShow] = useState(false);
  const [verbCircle, setVerbCircle] = useState({
    left: "50%",
    top: 0,
    height: 0,
    width: 0,
    borderWidth: 25,
  });
  const [activeContainer, setActiveContainer] = useState(0);
  const containerRef = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const dropZoneRef = useRef(null);
  const ballRefs = React.useRef([]);

  ballRefs.current = wordList.map((container, i) => {
    return container.map((_, j) => ballRefs[j] ?? createRef());
  });

  useEffect(() => {
    setVerbCircle((prev) => {
      return {
        ...prev,
        top: dropZoneRef.current.getBoundingClientRect().bottom - 100,
      };
    });
  }, []);

  const handleCopyElement = (initEvent, contIndex, ballIndex) => {
    if (!ballStatus[contIndex][ballIndex]) return;
    let followingBall;

    let ball = initEvent.target.cloneNode(true);
    ball.style.opacity = "1";
    ball.style.position = "absolute";
    ball.style.cursor = "pointer";
    ball.style.zIndex = "1000000";
    ball.style.left =
      initEvent.clientX -
      initEvent.target.getBoundingClientRect().width / 2 +
      "px";
    ball.style.top =
      initEvent.clientY -
      initEvent.target.getBoundingClientRect().width / 2 +
      "px";

    ball.setAttribute("containerIndex", contIndex);
    ball.setAttribute("ballIndex", ballIndex);
    ball.classList.add("ballClone");

    if (contIndex === 1) {
      let followingIndex;
      if (ballIndex % 2 === 0) {
        followingIndex = ballIndex + 1;
      } else {
        followingIndex = ballIndex - 1;
      }

      followingBall =
        ballRefs.current[1][followingIndex].current.children[0].cloneNode(true);
      followingBall.style.opacity = "1";
      followingBall.style.position = "absolute";
      followingBall.style.cursor = "pointer";
      followingBall.style.zIndex = "1000000";

      if (ballIndex % 2 === 0) {
        followingBall.style.left = initEvent.clientX + 40 + "px";
        followingBall.style.top = initEvent.clientY - 40 + "px";
        followingBall.classList.add("ballClone", "lastChild", "verb2");
        ball.classList.add("verb1");
      } else {
        followingBall.style.left = initEvent.clientX - 120 + "px";
        followingBall.style.top = initEvent.clientY - 40 + "px";
        followingBall.classList.add("ballClone", "verb1");
        ball.classList.add("lastChild", "verb2");
      }

      followingBall.setAttribute("containerIndex", contIndex);
      followingBall.setAttribute("ballIndex", followingIndex);

      document.getElementById("clone-div").appendChild(followingBall);

      setBallActive((prev) => {
        let list = [...prev];
        list[contIndex][followingIndex] = true;

        return list;
      });
    }
    setBallActive((prev) => {
      let list = [...prev];
      list[contIndex][ballIndex] = true;

      return list;
    });

    const initX = initEvent.target.getBoundingClientRect().left;
    const initY = initEvent.target.getBoundingClientRect().top;

    if (activeContainer === 1 && ballIndex % 2 === 0) {
      document.getElementById("clone-div").insertBefore(ball, followingBall);
    } else if (activeContainer > 1) {
      document
        .getElementById("clone-div")
        .insertBefore(ball, document.querySelector(".lastChild"));
    } else {
      document.getElementById("clone-div").appendChild(ball);
    }

    const setBallPosition = () => {
      let ballList = Array.from(document.querySelectorAll(".ballClone"));

      for (let i = 0; i < ballList.length; i++) {
        ballList[i].style.transition = "200ms";

        ballList[i].style.left =
          dropZoneRef.current.getBoundingClientRect().left +
          dropZoneRef.current.getBoundingClientRect().width / 2 +
          80 * (i - ballList.length / 2) +
          "px";
        ballList[i].style.top =
          dropZoneRef.current.getBoundingClientRect().top +
          19.5 -
          (8 + 4 * Math.floor(Math.abs(i - (ballList.length - 1) / 2)) - 1) *
            Math.abs(i - (ballList.length - 1) / 2) +
          "px";

        setTimeout(() => {
          ballList[i].style.transition = "0ms";
        }, 200);
      }
    };

    const setVerbCirclePosition = (contIndex) => {
      if (contIndex < 1) {
        setVerbCircle((prev) => {
          return { ...prev, width: 0 };
        });
      } else {
        setVerbCircle({
          left: document.querySelector(".verb1").getBoundingClientRect().left,
          top:
            dropZoneRef.current.getBoundingClientRect().bottom -
            ((document.querySelector(".verb2").getBoundingClientRect().right -
              document.querySelector(".verb1").getBoundingClientRect().left -
              50) *
              0.25 +
              (20 + 5 * contIndex) * 2 +
              5 +
              contIndex * 11),
          width:
            document.querySelector(".verb2").getBoundingClientRect().right -
            document.querySelector(".verb1").getBoundingClientRect().left,
          borderWidth: 20 + 5 * contIndex,
        });
      }
    };

    const activeMovement = (e) => {
      let el = e ? e.target : ball;

      ball.style.zIndex = "1000000";

      setActiveContainer(+ball.getAttribute("containerIndex"));
      const moveElement = (moveEvent) => {
        el.style.left =
          moveEvent.clientX -
          moveEvent.target.getBoundingClientRect().width / 2 +
          "px";
        el.style.top =
          moveEvent.clientY -
          moveEvent.target.getBoundingClientRect().width / 2 +
          "px";

        if (contIndex === 1) {
          followingBall.style.zIndex = "1000000";
          if (
            Array.from(el.classList).findIndex((word) => word === "verb1") >= 0
          ) {
            document.querySelector(".verb2").style.left =
              moveEvent.clientX + 40 + "px";
            document.querySelector(".verb2").style.top =
              moveEvent.clientY - 40 + "px";
          } else {
            document.querySelector(".verb1").style.left =
              moveEvent.clientX - 120 + "px";
            document.querySelector(".verb1").style.top =
              moveEvent.clientY - 40 + "px";
          }
        }
      };

      document.addEventListener("mousemove", moveElement);

      const endMoveElement = (endEvent) => {
        document.removeEventListener("mousemove", moveElement);
        document.removeEventListener("mouseup", endMoveElement);

        if (
          endEvent.clientX >
            containerRef[contIndex].current.getBoundingClientRect().left &&
          endEvent.clientX <
            containerRef[contIndex].current.getBoundingClientRect().right &&
          endEvent.clientY >
            containerRef[contIndex].current.getBoundingClientRect().top &&
          endEvent.clientY <
            containerRef[contIndex].current.getBoundingClientRect().bottom
        ) {
          ball.style.transition = "200ms";
          ball.style.left = initX + "px";
          ball.style.top = initY + "px";

          let ballList = Array.from(document.querySelectorAll(".ballClone"));

          let activeBallList = [...ballStatus];

          for (let i = 0; i < ballStatus.length; i++) {
            for (let j = 0; j < ballStatus[i].length; j++) {
              activeBallList[i][j] = true;
            }
          }

          for (let i = 0; i < ballList.length; i++) {
            if (
              ballList[i] === undefined ||
              +ballList[i].getAttribute("containerindex") < contIndex
            )
              continue;

            let ballIndex = +ballList[i].getAttribute("ballIndex");
            let containerIndex = +ballList[i].getAttribute("containerindex");

            ballList[i].style.transition = "200ms";

            console.log(ballList[0]);

            if (
              +ballList[i].getAttribute("containerindex") === contIndex ||
              activeContainer === 1
            ) {
              ballList[i].style.left =
                ballRefs.current[containerIndex][
                  ballIndex
                ].current.getBoundingClientRect().left + "px";
              ballList[i].style.top =
                ballRefs.current[containerIndex][
                  ballIndex
                ].current.getBoundingClientRect().top + "px";
            } else {
              if (i === ballList.length - 1 && contIndex !== 0) continue;

              ballList[i].style.transform = `scale(0.55)`;

              ballList[i].style.left =
                ballRefs.current[containerIndex][
                  ballIndex
                ].current.getBoundingClientRect().left -
                18.4 +
                "px";
              ballList[i].style.top =
                ballRefs.current[containerIndex][
                  ballIndex
                ].current.getBoundingClientRect().top -
                18.4 +
                "px";
            }

            setTimeout(() => {
              setBallActive((prev) => {
                let list = [...prev];
                list[containerIndex][ballIndex] = false;

                return list;
              });
              ballList[i].remove();
              setBallPosition();
              setTimeout(() => {
                console.log(contIndex);
                setVerbCirclePosition(
                  document.querySelectorAll(".ballClone").length - 2
                );
              }, 200);
            }, 200);
          }

          setBallStatus(activeBallList);
        } else {
          setButtonShow(contIndex !== 1);

          let copyList = [...ballStatus];
          if (contIndex === 1) {
            switch (ballIndex) {
              case 0:
              case 1:
              case 6:
              case 7:
              case 12:
              case 13:
                copyList[1][0] = false;
                copyList[1][1] = false;
                copyList[1][6] = false;
                copyList[1][7] = false;
                copyList[1][12] = false;
                copyList[1][13] = false;
                break;
              case 2:
              case 3:
              case 8:
              case 9:
              case 14:
              case 15:
                copyList[1][2] = false;
                copyList[1][3] = false;
                copyList[1][8] = false;
                copyList[1][9] = false;
                copyList[1][14] = false;
                copyList[1][15] = false;
                break;
              case 4:
              case 5:
              case 10:
              case 11:
              case 16:
              case 17:
                copyList[1][4] = false;
                copyList[1][5] = false;
                copyList[1][10] = false;
                copyList[1][11] = false;
                copyList[1][16] = false;
                copyList[1][17] = false;
                break;
              default:
                copyList = [...copyList];
            }

            switch (ballIndex) {
              case 0:
              case 1:
              case 2:
              case 3:
              case 6:
              case 7:
              case 12:
              case 13:
                copyList[2][0] = false;
                copyList[2][1] = false;
                copyList[2][2] = false;
                copyList[2][3] = false;
                break;
              case 4:
              case 5:
                copyList[2][0] = false;
                copyList[2][2] = false;
                copyList[2][3] = false;
                break;
              case 8:
              case 9:
              case 14:
              case 15:
                copyList[2][1] = false;
                copyList[2][2] = false;
                copyList[2][3] = false;
                break;
              case 10:
              case 11:
                copyList[2][1] = false;
                copyList[2][3] = false;
                break;
              case 16:
              case 17:
                copyList[2][0] = false;
                copyList[2][1] = false;
                copyList[2][2] = false;
                break;

              default:
                copyList = [...copyList];
            }

            switch (ballIndex) {
              case 0:
              case 1:
              case 4:
              case 5:
                copyList[3][0] = false;
                copyList[3][2] = false;
                copyList[3][3] = false;
                break;
              case 2:
              case 3:
                copyList[3][0] = false;
                copyList[3][3] = false;
                break;
              case 6:
              case 7:
              case 16:
              case 17:
                copyList[3][0] = false;
                copyList[3][1] = false;
                copyList[3][2] = false;
                copyList[3][3] = false;
                break;
              case 8:
              case 9:
                copyList[3][1] = false;
                copyList[3][2] = false;
                break;
              case 10:
              case 11:
                copyList[3][2] = false;
                copyList[3][3] = false;
                break;
              case 12:
              case 13:
                copyList[3][0] = false;
                copyList[3][1] = false;
                copyList[3][3] = false;
                break;
              case 14:
              case 15:
                copyList[3][0] = false;
                copyList[3][1] = false;
                copyList[3][2] = false;
                break;
              default:
                copyList = [...copyList];
            }

            switch (ballIndex) {
              case 0:
              case 1:
                copyList[4][0] = false;
                copyList[4][1] = false;
                copyList[4][2] = false;
                copyList[4][3] = false;
                break;
              case 2:
              case 3:
              case 8:
              case 9:
              case 12:
              case 13:
              case 14:
              case 15:
                copyList[4][1] = false;
                break;
              case 6:
              case 7:
                copyList[4][1] = false;
                copyList[4][2] = false;
                break;
              default:
                copyList = [...copyList];
            }
          }

          setBallStatus(copyList);

          setBallPosition();

          if (contIndex > 0) {
            setTimeout(() => {
              setVerbCirclePosition(contIndex);
            }, 200);
          }

          let nextContainerIndex;
          let stop = false;
          for (let i = contIndex + 1; i < 5; i++) {
            if (stop) break;
            for (let j = 0; j < copyList[i].length; j++) {
              if (copyList[i][j]) {
                nextContainerIndex = i;
                stop = true;
                break;
              }
            }
          }
          setActiveContainer(nextContainerIndex);
          if (followingBall) followingBall.style.zIndex = "1000";
          ball.style.zIndex = "1000";
        }
      };

      document.addEventListener("mouseup", endMoveElement);
    };

    ball.addEventListener("mousedown", (e) => {
      activeMovement(e);
    });

    if (followingBall) {
      followingBall.addEventListener("mousedown", (e) => {
        activeMovement(e);
      });
    }

    activeMovement();
  };

  return (
    <div className="game2">
      {
        <Group>
          {wordList.map((container, containerIndex) => (
            <Container
              inLine={containerIndex === 1 ? 6 : 2}
              inRow={containerIndex === 1 ? 3 : 2}
              active={containerIndex === activeContainer}
              containerRef={containerRef[containerIndex]}
            >
              {container.map((word, wordIndex) => {
                return (
                  <div
                    className="element"
                    style={{
                      position: "relative",
                      left: word.x,
                      top: word.y,
                      zIndex: word.zIndex,
                      transition: `${word.transition}ms`,
                      cursor:
                        containerIndex === activeContainer &&
                        ballStatus[containerIndex][wordIndex]
                          ? "pointer"
                          : "default",
                      borderRadius: "50%",
                      opacity: ballActive[containerIndex][wordIndex]
                        ? 0
                        : ballStatus[containerIndex][wordIndex]
                        ? 1
                        : 0.5,
                    }}
                    ref={ballRefs.current[containerIndex][wordIndex]}
                    onMouseDown={(event) => {
                      if (containerIndex !== activeContainer) return;
                      handleCopyElement(event, containerIndex, wordIndex);
                    }}
                  >
                    <Ball color={containerIndex === 1 ? "#3FA0C8" : "#8D9599"}>
                      {word}
                    </Ball>
                  </div>
                );
              })}
            </Container>
          ))}
        </Group>
      }

      <div id="clone-div"></div>

      <div className="drop-zone" ref={dropZoneRef}>
        <div className="cut1"></div>
        <div className="cut2"></div>

        <svg
          width="685"
          height="130"
          viewBox="0 0 685 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M684.561 26.5884C583.244 93.8771 464.344 129.815 342.718 129.91C221.092 130.006 102.135 94.2556 0.712799 27.1263L17.9111 1.14221C114.226 64.891 227.193 98.8412 342.693 98.7504C458.194 98.6595 571.107 64.5315 667.322 0.631348L684.561 26.5884Z"
            fill="#C4C4C4"
          />
        </svg>

        <div className="circle"></div>
      </div>
      <div
        className="verb-half-circle"
        style={{
          left: verbCircle.left,
          width: verbCircle.width,
          height: verbCircle.width,
          top: verbCircle.top,
          borderWidth: verbCircle.borderWidth,
        }}
      ></div>
      {buttonShow && <p className="button">Weiter</p>}
    </div>
  );
};

export default Game2;

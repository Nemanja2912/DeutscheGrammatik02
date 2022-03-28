import React, { useState, useEffect } from "react";

import "../css/game3.css";
import Group1 from "./screen1/Group1";
import Group3 from "./screen1/Group3";
import Group2 from "./screen1/Group2";
import Screen2 from "./screen2/screen2";
import Screen3 from "./screen3/Screen3";
import StatusBar from "../UI/StatusBar";

const Game3 = ({ nextLesson }) => {
  const [showGroup, setShowGroup] = useState(true);
  const [infoText, setInfoText] = useState(
    "Sieh dir die Sätze noch einmal an."
  );
  const [step, setStep] = useState(0);
  const [infoOverlay, setInfoOverlay] = useState(true);
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [helpFingerPosition, setHelpFingerPosition] = useState("init");

  const [end, setEnd] = useState(false);

  useEffect(() => {
    if (!infoOverlay && step === 0) {
      setTimeout(() => {
        setStep(1);
        setShowGroup(false);

        setTimeout(() => {
          setInfoText(
            <p>
              Lies die Sätze noch einmal. <br />
              Achte auf die Teile der Satzklammer.
            </p>
          );
          setInfoOverlay(true);
          setStep(2);
        }, 3000);
      }, 1500);
    }

    if (!infoOverlay && step === 2) {
      setShowButton(true);
    }
  }, [infoOverlay, step]);

  const submitButton = () => {
    setStep(3);
    setInfoText(
      <p>
        Die Satzklammer hat zwei Teile.
        <br />
        Wo stehen diese Teile im Satz?
        <br />
        Ziehe die richtigen Wörter unten in die Regel.
      </p>
    );
    setInfoOverlay(true);
    setShowButton(false);
    setHelpFingerPosition(false);
  };

  return (
    <>
      <div className="game3">
        <div style={{ opacity: showGroup ? 1 : 0, transition: "3000ms" }}>
          <Group1 />
          <Group2 />
          <Group3 />
        </div>
        <Screen2
          step={step}
          showButton={showButton}
          submitButton={submitButton}
        />
        {step > 2 && (
          <Screen3
            helpOverlay={helpOverlay}
            setHelpFingerPosition={setHelpFingerPosition}
            setEnd={setEnd}
          />
        )}
      </div>
      <StatusBar
        infoText={infoText}
        infoOverlay={infoOverlay}
        setInfoOverlay={setInfoOverlay}
        setHelpOverlay={setHelpOverlay}
        helpFingerPosition={helpFingerPosition}
        preventHelp={end}
      />
      {end && (
        <div className="end-button game1-button" onClick={nextLesson}>
          Weiter
        </div>
      )}
    </>
  );
};

export default Game3;

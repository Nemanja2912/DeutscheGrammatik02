import React from "react";
import Close from "../assets/img/wrong.svg";

const Credits = ({ hide, setHide, setCredits, movePos }) => {
  return (
    <div
      className={`credits ${hide ? " " : "credits-opacity"}`}
      style={{
        transitionDelay: movePos === 3 && hide === false ? "750ms" : "0s",
      }}
    >
      <div
        className="close"
        onClick={() => {
          setHide(true);
          setCredits(false);
        }}
      >
        <img src={Close} alt="" />
      </div>
      <font color="#788287">
        <b>CREDITS</b>
      </font>
      <br />
      <b>Autoren:</b> Martina Musterfrau
      <br />
      <b>Konzeption und Redaktion:</b> Martin Mustermann
      <br />
      <b>Umsetzung:</b> Martin Mustermann <br />
      <font color="#788287">
        <b>BILDNACHWEISE</b>
      </font>
      <br />
      <b>Fotos:</b> Martin Mustermann (Verb markieren / Übung 1) <br />
    </div>
  );
};

export default Credits;

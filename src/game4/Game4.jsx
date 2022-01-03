import "../css/game4.css";

const Game4 = () => {
  const handleMoveSentence = (initEvent) => {
    const element = document.querySelector(".sentence1");
    const moveElement = (moveEvent) => {
      element.style.left = moveEvent.clientX - initEvent.clientX + "px";
      element.style.top = moveEvent.clientY - initEvent.clientY + "px";
    };

    document.addEventListener("mousemove", moveElement);
  };

  return (
    <div className="game4">
      <div className="text">
        <div>Ich bin der beste Fußball-Spieler in meiner Mannschaft.</div>
        <div onMouseDown={handleMoveSentence} class="sentence1">
          Ich habe schon viele Spiele gewonnen.
        </div>
        <div>Jeden Tag stehe ich früh auf. </div>
        <div>Dann fahre ich zum Stadion. </div>
        <div>Dort muss ich viel üben.</div>
        <div> Später möchte ich Fußball-Weltmeister werden. </div>
        <div>Dann bekomme ich einen goldenen Pokal. </div>
        <div>Oh, jemand ruft mich an.</div>
        <div>Vielleicht sind es meine Fans. </div>
        <div>Nein, da hat nur der Wecker vom Handy geklingelt. </div>
        <div>Ich habe wieder geträumt.</div>
      </div>
      <div className="drop"></div>
    </div>
  );
};

export default Game4;

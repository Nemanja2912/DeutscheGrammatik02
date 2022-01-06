import React, { useEffect, createRef, useRef, useState } from "react";
import "./css/general.css";
import Menu from "./menu/menu";
import Game1 from "./game1/Game1";
import Game2 from "./game2/Game2";
import Game3 from "./game3/Game3";
import Game4 from "./game4/Game4";

function App() {
  const [navMenuItem, setNavMenuItem] = useState(0);
  const [load, setLoad] = useState(false);
  const menuRef = useRef(null);

  const navButtonRef = [];

  for (let i = 0; i < 5; i++) {
    navButtonRef[i] = createRef();
  }

  setTimeout(() => {
    setLoad(true);
  }, 1000);

  useEffect(() => {
    document
      .querySelector('meta[name="viewport"]')
      .setAttribute("content", "width=1200", "initial-scale=1");

    document.firstElementChild.style.zoom = 1;
  }, []);

  return (
    <div className="App">
      <Menu
        navMenuItem={navMenuItem}
        setNavMenuItem={setNavMenuItem}
        navButtonRef={navButtonRef}
        menuRef={menuRef}
      />

      {navMenuItem === 0 && <Game1 />}
      {navMenuItem === 1 && <Game2 />}
      {navMenuItem === 2 && <Game3 />}
      {navMenuItem === 3 && <Game4 />}
    </div>
  );
}

export default App;

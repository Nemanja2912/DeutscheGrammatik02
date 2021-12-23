import React, { useEffect, createRef } from "react";
import "./css/general.css";
// import Menu from "./menu/menu";
import Game1 from "./game1/Game1";
import Game2 from "./game2/Game2";

function App() {
  // const [navMenuItem, setNavMenuItem] = useState(0);
  // const [load, setLoad] = useState(false);
  // const menuRef = useRef(null);

  const navButtonRef = [];

  for (let i = 0; i < 5; i++) {
    navButtonRef[i] = createRef();
  }

  setTimeout(() => {
    // setLoad(true);
  }, 1000);

  useEffect(() => {
    document
      .querySelector('meta[name="viewport"]')
      .setAttribute("content", "width=1000", "initial-scale=1");

    document.firstElementChild.style.zoom = 1;
  }, []);

  return (
    <div className="App">
      {/* <Menu
        navMenuItem={navMenuItem}
        setNavMenuItem={setNavMenuItem}
        navButtonRef={navButtonRef}
        menuRef={menuRef}
      /> */}

      {/* {navMenuItem === 0 && <Game1 />} */}

      <Game2 />
    </div>
  );
}

export default App;

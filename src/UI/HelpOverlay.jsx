import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

const HelpOverlay = ({ pos = false, closeOverlay }) => {
  const helpOverlayStyle = {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 10000,
    transition: "0.5s",
  };

  const svgStyle = {
    height: "50px",
    position: "absolute",
    transition: "1s",
    transitionTimingFunction: "linear",
    zIndex: "1000000000000000001",
    width: "max-content",
    // opacity: "0",
    pointerEvents: "none",
  };

  const [customSvgStyle, setCustomSvgStyle] = useState({
    top: 90,
    left: window.innerWidth - 80,
  });

  useEffect(() => {
    if (pos === "init") {
      closeOverlay();
      setCustomSvgStyle({ top: 90, left: window.innerWidth - 80 });
    }
    if (pos[0] !== undefined) {
      setCustomSvgStyle((prev) => {
        return {
          ...prev,
          left: pos[0],
          top: pos[1],
        };
      });
    }
  }, [pos, closeOverlay]);

  return ReactDOM.createPortal(
    <div className="help-overlay" style={helpOverlayStyle}>
      <div className="finger">
        <svg
          width="384"
          height="512"
          viewBox="0 0 384 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ ...svgStyle, ...customSvgStyle }}
        >
          <g clipPath="url(#clip0_148:10)">
            <path
              d="M135.652 0C159.277 0 179.478 20.65 179.478 44.8V144.651C196.526 128.311 229.244 126.305 250.422 150.95C273.251 136.662 303.439 148.803 312.737 167.4C361.878 158.426 384 189.346 384 240C384 242.746 383.797 253.276 383.805 256C383.973 317.971 352.74 332.894 345.49 379.731C343.683 391.404 333.599 400 321.786 400H150.261L150.26 399.998C131.894 399.987 114.371 389.391 106.415 371.534C93.421 342.648 57.377 276.122 29.092 264C10.897 256.203 0.00800419 242.616 4.18524e-06 224C-0.0139958 189.778 35.098 166.248 66.908 179.881C75.267 183.464 83.578 188.193 91.826 194.034V44.8C91.826 21.35 112.369 0 135.652 0ZM136 416H328C341.255 416 352 426.745 352 440V488C352 501.255 341.255 512 328 512H136C122.745 512 112 501.255 112 488V440C112 426.745 122.745 416 136 416ZM304 444C292.954 444 284 452.954 284 464C284 475.046 292.954 484 304 484C315.046 484 324 475.046 324 464C324 452.954 315.046 444 304 444Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_148:10">
              <rect width="384" height="512" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>,
    document.querySelector("#help")
  );
};

export default HelpOverlay;

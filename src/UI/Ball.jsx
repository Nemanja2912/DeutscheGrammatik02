const Ball = ({ children, color = "#a0c813" }) => {
  const ballStyle = {
    margin: "0",
    position: "relative",
    zIndex: "1",
    borderRadius: "50%",
    height: "80px",
    width: "80px",
    background: `radial-gradient(circle at 25px 25px, ${color}, #5f5f5f)`,
    fontSize: "16px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    transitionTimingFunction: "linear",
    padding: 5,
    // transform: "scale(0)",
  };

  return (
    <div className="ball" style={ballStyle}>
      {children}
    </div>
  );
};

export default Ball;

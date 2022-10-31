const Group = ({ children }) => {
  const groupStyle = { display: "flex", height: "280px" };
  return (
    <div className="group" style={groupStyle}>
      {children}
    </div>
  );
};

export default Group;

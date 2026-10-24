import React from "react";

const color = {
  0: "red",
  1: "yellow",
  2: "green",
};

const Light = ({ item, activeIndex }) => {
  const isActive = item === activeIndex;

  return (
    <div
      className="circle"
      style={{
        backgroundColor: isActive ? color[item] : "gray",
      }}
    >
    </div>
  );
};

export default Light;
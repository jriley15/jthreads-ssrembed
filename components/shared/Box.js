import React from "react";

export default function Box({ justify, alignItems, direction, children }) {
  return (
    <div
      style={{
        justifyContent: justify,
        alignItems: alignItems,
        flexDirection: direction,
        display: "flex",
      }}
    >
      {children}
    </div>
  );
}

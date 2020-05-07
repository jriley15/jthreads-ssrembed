import React from "react";

export default function Box({
  justify,
  alignItems,
  direction,
  children,
  marginTop,
}) {
  return (
    <div
      style={{
        justifyContent: justify,
        alignItems: alignItems,
        flexDirection: direction,
        display: "flex",
        marginTop: `${marginTop}rem`,
      }}
    >
      {children}
    </div>
  );
}

import React from "react";

export default function Box({
  justify,
  alignItems,
  direction,
  children,
  mt,
  mb,
}) {
  return (
    <div
      style={{
        justifyContent: justify,
        alignItems: alignItems,
        flexDirection: direction,
        display: "flex",
        marginTop: `${mt}rem`,
        marginBottom: `${mb}rem`,
      }}
    >
      {children}
    </div>
  );
}

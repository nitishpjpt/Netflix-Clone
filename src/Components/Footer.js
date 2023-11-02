import React from 'react'
import { FcLike } from "react-icons/fc";

function Footer() {
  return (
    <h2
      style={{
        backgroundColor: "black",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "10vh",
      }}
    >
      Made With <FcLike /> Nitish Prajapti
    </h2>
  )
}

export default Footer
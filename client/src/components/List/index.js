import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div >
      <ul className="list-group" style={{margin: "auto",
  width: "60%",
  border: "3px ",
  padding: "10px"}}>{children}</ul>
    </div>
  );
}

export function ListItem({ children }) {
  return <li className="list-group-item"  style={{paddingBottom:"2rem"}}>{children}</li>;
}

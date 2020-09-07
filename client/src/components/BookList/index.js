import React from "react";
// import "./style.css";

// This file exports both the List and ListItem components
function BookList({ children }) {
  return (
    <div className="container4">
      <ul style={{margin: "auto",
  width: "60%",
  border: "3px ",
  padding: "10px"}}>{children}</ul>
    </div>
  );
}
export default BookList;


import React from "react";
import "./style.css";
function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info  ">
      <a className="navbar-brand" href="/">
       Google search book 
      </a>
      <a className="navbar-brand " href="/books/saved">
      save data
      </a>
    </nav>
  );
}

export default Nav;

import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";

class NavBar extends Component {
  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">Sorting Visualiser</h1>
        <div className="menu-icon"></div>
        <ul className="nav-menu">
          <li className="variables">
            Size &nbsp; | &nbsp;
            <input
              type="number"
              id="num-items"
              name="num-items"
              onChange={this.props.changeItems}
              value={this.props.items}
              min={5}
              max={50}
            />
          </li>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <button
                  className={`buttonA ${item.cName}`}
                  onClick={this.props.handleSort}
                >
                  {item.title}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default NavBar;

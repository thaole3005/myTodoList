import React, { Component } from "react";
import {NavLink} from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            TodoList
          </a>
          
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/home" activeClassName="bg-white text-dark">
                  Home <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/todolistRCC" activeClassName="bg-white text-dark">
                    TodoListRCC
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/todolistRFC" activeClassName="bg-white text-dark">
                    TodoListRFC
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/todoListThunk" activeClassName="bg-white text-dark">
                TodoListThunk
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/todoListSaga" activeClassName="bg-white text-dark">
                TodoListSaga
                </NavLink>
              </li>
            
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;











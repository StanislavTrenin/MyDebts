import React from 'react';
import {NavLink} from 'react-router-dom'

function NavBar() {
    return (
        <nav className="navbar navbar-dark bg-primary fixed-top">
            <NavLink className="navbar-brand" to="/">
                DebtsApp
            </NavLink>
            <div>
                <NavLink className="navbar-brand" to="/lend">
                    Lend
                </NavLink>
                <NavLink className="navbar-brand" to="/borrow">
                    Borrow
                </NavLink>
                <NavLink className="navbar-brand" to="/statistic">
                    Statistic
                </NavLink>
                <NavLink className="navbar-brand" to="/add_person">
                    Add Person
                </NavLink>
                <button className="btn btn-dark" onClick={() => {
                }}>Sign Out
                </button>
            </div>
        </nav>
    );
}

export default NavBar;
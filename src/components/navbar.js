import React from 'react';
import { NavLink, Link } from 'react-router-dom';

class NavBar extends React.Component {

    render() {
        return (
            <>
                <div className="app">
                    <header className="header">
                        <div className="grid">
                            <nav className="header__navbar">
                                <ul className="header__navbar-list">
                                    <li className="header__navbar-item">
                                        {/* <a href="/" className="header__navbar-item-link">WBVAN</a> */}
                                        <NavLink to="/" className="header__navbar-item-link" exact={true} >WBVAN</NavLink>
                                    </li>
                                </ul>
                                <ul className="header__navbar-list">
                                    <li className="header__navbar-item">
                                        {/* <a href="/register" className="header__navbar-item-link">News</a> */}
                                        <NavLink to="/write" className="header__navbar-item-link">Write</NavLink>
                                    </li>
                                    <li className="header__navbar-item">
                                        {/* <a href="/login" className="header__navbar-item-link">Write</a> */}
                                        <NavLink to="/login" className="header__navbar-item-link">Change Account</NavLink>
                                    </li>
        
                                    <li className="header__navbar-item" id="login-register">
                                        {/* <a href="/login" className="header__navbar-item-link header__navbar-item-link--strong">
                                            {this.props.username === '' ? 'Login/Register' : this.props.username}
                                        </a> */}
                                        <NavLink to= {this.props.username === '' ? "/login" : "/profile"} className="header__navbar-item-link header__navbar-item-link--strong">
                                            {this.props.username === '' ? 'Login/Register' : this.props.username}
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </header>
                </div>
            </>
        )
    }
}

export default NavBar;
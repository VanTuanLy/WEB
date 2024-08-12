import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';

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
                                <ul className="header__navbar-list navbar-mobile">
                                    <li className="header__navbar-item">
                                        {/* <a href="/register" className="header__navbar-item-link">News</a> */}
                                        <NavLink to="/write" className="header__navbar-item-link">Write</NavLink>
                                    </li>
                                    <li className="header__navbar-item">
                                        {/* <a href="/login" className="header__navbar-item-link">Write</a> */}
                                        <NavLink to="/group" className="header__navbar-item-link">Group</NavLink>
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
                                <label htmlFor='nav-mobile-input' className='header__navbar-item icon-mobile'>
                                    <FontAwesomeIcon icon={faListUl} className='nav-icon'/>
                                </label>
                                
                            </nav>
                            
                        </div>
                        <input type='checkbox' id="nav-mobile-input"/>
                        <nav className='nav__mobile'>
                            <ul className="header__navbar-mobile--list">
                                <li className="header__navbar-mobile--item" id="login-register">
                                    {/* <a href="/login" className="header__navbar-item-link header__navbar-item-link--strong">
                                        {this.props.username === '' ? 'Login/Register' : this.props.username}
                                    </a> */}
                                    <NavLink to= {this.props.username === '' ? "/login" : "/profile"} className="header__navbar-item-link header__navbar-item-link--strong">
                                        {this.props.username === '' ? 'Login/Register' : this.props.username}
                                    </NavLink>
                                </li>
                                <li className="header__navbar-mobile--item">
                                    {/* <a href="/register" className="header__navbar-item-link">News</a> */}
                                    <NavLink to="/write" className="header__navbar-item-link">Write</NavLink>
                                </li>
                                <li className="header__navbar-mobile--item">
                                    {/* <a href="/login" className="header__navbar-item-link">Write</a> */}
                                    <NavLink to="/group" className="header__navbar-item-link">Group</NavLink>
                                </li>
                                <li className="header__navbar-mobile--item">
                                    {/* <a href="/login" className="header__navbar-item-link">Write</a> */}
                                    <NavLink to="/login" className="header__navbar-item-link">Change Account</NavLink>
                                </li>
    
                            </ul>
                        </nav>
                    </header>
                </div>
            </>
        )
    }
}

export default NavBar;
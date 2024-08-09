import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import withNavigate from './withNavigate';

class Login extends React.Component {

    state = {
        username: '',
        password: ''
    }

    handleChange = () => {
        this.props.handleChangeLogin()
    }

    handleSubmit = async (event) => {

        let username = this.state.username;
        let password = this.state.password;
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/webblogvan/src/php/login.php', {
                username,
                password
            });
        let user = response.data.username;
            this.props.getUser(user);
            if(user !== undefined){
                alert('Login successful');
                this.props.navigate('/', { state: { username: user } });
            }
            else{
                alert('Login failed');
            }
        } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
        }
        try {
            const response = await axios.post('http://localhost:8080/webblogvan/src/php/getuser.php', {
                username,
                password
            },{ withCredentials: true});
        } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
        }
    };

    handleChangeUsername = (event) => {
        event.preventDefault();
        this.setState(
            {
                username: event.target.value
            }
        )
    }

    handleChangePassword = (event) => {
        event.preventDefault();
        this.setState(
            {
                password: event.target.value
            }
        )
    }

    render() {
        return (
            <>
                <div className="modal">
                    <div className="modal__overlay"></div>
                        <div className="modal__body">
                            <div className="auth-form">
                                <form onSubmit={(e) => this.handleSubmit(e)} className="auth-form__container">
                                    <div className="auth-form__logo">
                                        {/* <a href="/" className="auth-form__logo">WBVAN</a> */}
                                        <NavLink to="/" className="auth-form__logo" exact={true} >WBVAN</NavLink>
                                    </div>
                                    <div className="auth-form__header">
                                        <h3 className="auth-form__heading">Login</h3>
                                        <span className="auth-form__switch-btn">
                                            {/* <a href="/register" className="auth-form__switch-btn--register">Register</a> */}
                                            <NavLink to="/register" className="auth-form__switch-btn--register">Register</NavLink>
                                        </span>

                                    </div>
                                    <div className="auth-form__form">
                                        <div className="auth-form__group">
                                            <label htmlFor="username">Username:</label>
                                            <input type="text"  value={this.state.username} onChange={(e) => this.handleChangeUsername(e)} className="auth-form__input" placeholder="Username or email" required/>
                                        </div>
                                        <div className="auth-form__group">
                                            <label htmlFor="passwords">Password:</label>
                                            <input type="password" value={this.state.password} onChange={(e) => this.handleChangePassword(e)} className="auth-form__input" placeholder="Password" required/>
                                        </div>
                                    </div>
                                    <div className="auth-form__controls">
                                        <button type="submit" className="btn btn--with-controls btn__login">Login</button>
                                    </div>
                                </form>
                                <div className="auth-form__socials">
                                    <p className="auth-form__socials-text">Login with</p>
                                    <div className="auth-form__socials-link">
                                        <a href="" className="btn btn--with-icon">
                                            <i className="fa-brands fa-facebook-f"></i>
                                            acebook
                                        </a>
                                    
                                    <a href="" className="btn btn--with-icon">
                                        <i className="fa-brands fa-google"></i>
                                        oogle
                                    </a>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                </div>
            </>
        )
    }
}

export default withNavigate(Login);
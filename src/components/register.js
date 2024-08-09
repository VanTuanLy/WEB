import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Register extends React.Component {

    state = {
        username: '',
        password: '',
        email: '',
        confirmpass: ''
    }

    handleChange = () => {
        this.props.handleChangeLogin()
    }

    handleSubmit = async (event) => {
        let username = this.state.username;
        let password = this.state.password;
        let email = this.state.email;
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/webblogvan/src/php/register.php', {
                username,
                password,
                email
            });
            alert(response.data.message);
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

    handleChangeEmail = (event) => {
        event.preventDefault();
        this.setState(
            {
                email: event.target.value
            }
        )
    }

    handleChangeConfirmPass = (event) => {
        event.preventDefault();
        this.setState(
            {
                confirmpass: event.target.value
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
                                    <div className="auth-form__header">
                                        <h3 className="auth-form__heading">Register</h3>
                                        <span className="auth-form__switch-btn">
                                            {/* <a href="/login" className="auth-form__switch-btn--register">Login</a> */}
                                            <NavLink to="/login" className="auth-form__switch-btn--register">Login</NavLink>
                                        </span>

                                    </div>
                                    <div className="auth-form__form">
                                        <div className="auth-form__group auth-form__group-mail">
                                            <label htmlFor="email"></label>
                                            <input type="text" value={this.state.email} onChange={(e) => this.handleChangeEmail(e)} className="auth-form__input auth-form__input-mail" placeholder="Your email" required/>
                                        </div>
                                        <div className="auth-form__group auth-form__group-name">
                                            <label htmlFor="username"></label>
                                            <input type="text" value={this.state.username} onChange={(e) => this.handleChangeUsername(e)} className="auth-form__input auth-form__input-name" placeholder="Username" required/>
                                        </div>
                                        <div className="auth-form__group">
                                            <label htmlFor="passwords"></label>
                                            <input type="password" value={this.state.password} onChange={(e) => this.handleChangePassword(e)} className="auth-form__input" placeholder="Password" required/>
                                        </div>
                                        <div className="auth-form__group">
                                            <input type="password" value={this.state.confirmpass} onChange={(e) => this.handleChangeConfirmPass(e)} className="auth-form__input" placeholder="Confirm your password" required/>
                                        </div>
                                    </div>
                                    <div className="auth-form__aside">
                                        <p className="auth-form__policy-text">
                                            <input type="checkbox" id="policy" className="auth-form__policy-checkbox" required/>
                                            <label htmlFor="policy" className="auth-form__policy-checkbox--agree">I agree</label>
                                            <a href="" className="auth-form__policy-link">Terms of service ...</a>
                                        </p>
                                    </div>
                                    <div className="auth-form__controls">
                                        <button type="submit" className="btn btn--with-controls">Register</button>
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

export default Register;
import React from 'react';
import axios from 'axios';
import "./index.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { TimelineMax } from "gsap";

const initialStateLogin = {
    username: '',
    password: '',
    remember: false,
    validationError: ''
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = initialStateLogin
    }

    handleChange(e) {
        let newstate = this.state;
        newstate[e.target.name] = e.target.value;
        this.setState(newstate);
    }

    inputValidation() {
        const userReg = new RegExp('[a-zA-Z0-9_]{1,16}');
        const userLenValid = this.state.username.length < 16 || this.state.username.length > 3;
        const userRegValid = userReg.test(this.state.username);
        if (!(userLenValid && userRegValid)) {
            return "Invalid Username.";
        }
        return "";
    }

    onSubmit(e) {
        e.preventDefault();
        let validationError = this.inputValidation();
        if (validationError === "") {
            const loginInput = {
                username: this.state.username,
                password: this.state.password,
                remember: this.state.remember
            };
    
            axios.post('http://localhost:8080/login', loginInput)
                .then((res) => {
                    const token = res.headers['authorization'].split(' ')[1]
                    localStorage.setItem('CXRF-token', token)
                    this.props.auth()
                }).catch((error) => {
                    if (error.response){
                        validationError = error.response.data.message;
                    } else {
                        validationError = "Unknown error!";
                    }
                    this.setState({'validationError': validationError});
                })
        }
        this.setState({validationError});
        
    }

    render() {
        return (
            <div>
                <h1>Login to your account</h1>
                {this.state.validationError && <div className="">{this.state.validationError}</div>}
                <form onSubmit={form => this.onSubmit(form)} className="form_inputs">
                    <div className="inputs">
                        <input type="text" name="username" placeholder="Username or Email" value={this.state.username} onChange={e => this.handleChange(e)} required></input>
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={e => this.handleChange(e)} required></input>
                        <a href="/login">Forgot password?</a>
                    </div>
                    <div className="inputs_remember">
                        <input type="checkbox" name="remember" value={this.state.remember}></input>
                        <p>Remember me</p>
                    </div>
                    <div className="inputs_button">
                        <button>Login</button>
                    </div>
                    <div className="inputs_register">
                        <p>Don't have an account? <a href="/register">Click here.</a></p>
                    </div>
                </form>
            </div>
        );
    }
}

const initialStateRegister = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    validationError: '',
}

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialStateRegister;
    }

    handleChange(e) {
        let newstate = this.state;
        newstate[e.target.name] = e.target.value;
        this.setState(newstate);
    }

    inputValidation() {
        const userReg = new RegExp('[a-zA-Z0-9_]{1,16}');
        const userLenValid = this.state.username.length < 16 && this.state.username.length > 3;
        const userRegValid = userReg.test(this.state.username);
        if (!(userLenValid && userRegValid)) {
            return "Invalid Username.";
        }

        const nameReg = new RegExp("[A-Z][a-zA-Z]*");
        const nameLenValid = (this.state.firstName.length < 51 && this.state.firstName.length > 1) && (this.state.lastName.length < 51 && this.state.lastName.length > 1);
        const nameRegValid = nameReg.test(this.state.firstName) && nameReg.test(this.state.lastName);
        if (!(nameLenValid && nameRegValid)) {
            return "Invalid first or last name.";
        }

        const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailLenValid = this.state.email.length < 254  && this.state.email.length > 3;
        const emailRegValid = emailReg.test(this.state.email);
        if (!(emailLenValid && emailRegValid)) {
            return "Invalid email.";
        }

        const passwordRegOne = /[a-z]/i;
        const passwordRegTwo = /[0-9]/;
        if (this.state.password.length < 8) {
            return "Your password must be at least 8 characters";
        } else if (!(passwordRegOne.test(this.state.password))) {
            return "Your password must contain at least one letter.";
        } else if (!(passwordRegTwo.test(this.state.password))) {
            return "Your password must contain at least one digit.";
        }else if (this.state.password !== this.state.passwordConfirm) {
            return "Password doesn't match."
        }
        

        return "";
    }

    onSubmit(e) {
        e.preventDefault();
        let validationError = this.inputValidation();
        if (validationError === "") {
            const userObject = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                passwordConfirm: this.state.passwordConfirm,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                dateOfBirth: this.state.dateOfBirth,
            };
    
            const headers = {
                'Content-Type': 'application/json',
              }
              
            axios.post('http://localhost:8080/register', userObject, {'headers': headers})
                .then((res) => {
                    this.props.history.push('/login');
                }).catch((error) => {
                    let errorMessage = "Unkonwn error, try again later."
                    if (error.response) {
                        errorMessage = error.response.data.message;
                    }
                    this.setState({validationError: errorMessage});
                }
            );
        }
        this.setState({validationError});
        
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                {this.state.validationError && <div className="ValidationError">{this.state.validationError}</div>}
                <form onSubmit={form => this.onSubmit(form)} className="form_inputs">           
                    <div className="inputs_flex">
                        <div className="inputs">
                            <input name="username" placeholder="Username" type="text" value={this.state.username} onChange={e => this.handleChange(e)} required></input>
                            <input name="email" placeholder="Email" type="email" value={this.state.email} onChange={e => this.handleChange(e)} required></input>
                            <input name="password" placeholder="Password" type="password" value={this.state.password} onChange={e => this.handleChange(e)} required></input>
                            <input name="passwordConfirm" placeholder="Confirm Password" type="password" value={this.state.passwordConfirm} onChange={e => this.handleChange(e)} required></input>
                        </div>
                        <div className="inputs">
                            <input name="firstName" placeholder="First Name" type="text" value={this.state.firstName} onChange={e => this.handleChange(e)} required></input>
                            <input name="lastName" placeholder="Last Name" type="text" value={this.state.lastName} onChange={e => this.handleChange(e)} required></input>
                            <input name="phoneNumber" placeholder="Phone Number" type="tel" value={this.state.phoneNumber} onChange={e => this.handleChange(e)} required></input>
                            <input name="dateOfBirth" placeholder="Date Of Birth" type="date" value={this.state.dateOfBirth} onChange={e => this.handleChange(e)} required></input>
                            <label className="dob_label">NB: Date of birth!</label>
                        </div>
                    </div>
                    <div className="inputs_remember">
                        <input type="checkbox" required></input>
                        <p>I agree to the terms and conditions.</p>
                    </div>
                    <div className="inputs_button">
                        <button>Register</button>
                    </div>
                    <div className="inputs_register">
                        <p>Already have an account? <a href="/login">Click here</a></p>
                    </div>
                </form>
            </div>
        );
    }
}

class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.container = null
        this.form = null
        this.formContent = null
        this.myTween = new TimelineMax({paused: false});
    }

    componentDidMount() {
        this.myTween.from(this.container, {height: 0}).from(this.form, {opacity: 0, duration: 1})
    }

    async componentClose() {
        await this.myTween.to(this.form, {opacity: 0}).to(this.container, {height: 0, duration: 1})
        this.props.hidePopup()
    }

    render () {
    return (
        <div className="container" ref={div => this.container = div}>
            <div className="container_form" ref={div => this.form = div}>
                <div className="form_header">
                    <FontAwesomeIcon icon={faTimesCircle} className="header_close" onClick={() => this.componentClose()} />
                </div>
                <div className="form_content" ref={div => this.formContent = div}>
                    {this.props.login && <LoginForm />}
                    {this.props.register && <RegisterForm />}
                </div>
            </div>
        </div>
    )}
}

export default Auth

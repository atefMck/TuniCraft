import './Auth.css';
import './Landing.css';
import React from 'react';
import axios from 'axios';

const initialState = {
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
        this.state = initialState;
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
            <div className="Container BoxShadow">
                <div className="Landing RegisterForm Form">
                    <h1>Register</h1>
                    <p>User your ingame name as username to register.</p>
                    {this.state.validationError && <div className="ValidationError">{this.state.validationError}</div>}
                    <form onSubmit={form => this.onSubmit(form)}>
                        <div className="FlexRow RegisterInfo">               
                            <div>
                                <label>Username:</label>
                                <input name="username" type="text" value={this.state.username} onChange={e => this.handleChange(e)} required></input>
                                <label>Email:</label>
                                <input name="email" type="email" value={this.state.email} onChange={e => this.handleChange(e)} required></input>
                                <label>Password:</label>
                                <input name="password" type="password" value={this.state.password} onChange={e => this.handleChange(e)} required></input>
                                <label>Confirm Password:</label>
                                <input name="passwordConfirm" type="password" value={this.state.passwordConfirm} onChange={e => this.handleChange(e)} required></input>
                            </div>
                            <div>
                                <label>Firstname:</label>
                                <input name="firstName" type="text" value={this.state.firstName} onChange={e => this.handleChange(e)} required></input>
                                <label>Lastname:</label>
                                <input name="lastName" type="text" value={this.state.lastName} onChange={e => this.handleChange(e)} required></input>
                                <label>Phone Number:</label>
                                <input name="phoneNumber" type="tel" value={this.state.phoneNumber} onChange={e => this.handleChange(e)} required></input>
                                <label>Date Of Birth:</label>
                                <input name="dateOfBirth" type="date" value={this.state.dateOfBirth} onChange={e => this.handleChange(e)} required></input>
                            </div>
                        </div> 
                        <div className="Remember">
                                <input type="checkbox" required></input>
                                <p>I agree to the terms and conditions.</p>
                            </div>
                        <div className="FlexRow Action">
                            <button>Register</button>
                        </div>
                    </form>
                    <a href="/login">Already have an account?</a>
                </div>
            </div>
        );
    }
}

export default RegisterForm;

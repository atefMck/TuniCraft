import React from 'react';
import { withRouter } from 'react-router-dom'
import './index.css';

const userInitial = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
}

const initialStateLogin = {
    username: '',
    password: '',
    remember: false,
    validationError: '',
    emailReset: ''
}

class LoginForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.authAxios = props.authAxios
        this.state = initialStateLogin
        this.showPopup = props.showPopup
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

    passwordReset(e) {
        e.preventDefault();
        const email = this.state.emailReset
        this.authAxios.post('/api/security/reset-password', {email})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
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
            
            this.authAxios.post('http://localhost:8080/login', loginInput)
            .then((res) => {
                const token = res.headers['authorization'].split(' ')[1]
                localStorage.setItem('CXRF-token', token)
                this.setState(userInitial)
                this.props.history.push('/dashboard')
            }).catch((err) => {
                if (err.response){
                    validationError = err.response.data.message;
                } else {
                    validationError = "Unknown error!";
                }
                this.setState({'validationError': validationError});
            })
        } else this.setState({validationError});
    }
    
    render() {
        let content = (<div>
            <h1>Login to your account</h1>
            {this.state.validationError && <div className="validation_error"><p>{this.state.validationError}</p></div>}
            <form onSubmit={form => this.onSubmit(form)} className="form_inputs">
                <div className="inputs">
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={e => this.handleChange(e)} required></input>
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
                    <p>Don't have an account? <span style={{color: "var(--red-medium)", cursor: "pointer"}} onClick={() => {this.showPopup("register")}}>Click here.</span></p>
                </div>
            </form>
        </div>)

        let forgot = (<div className="register_success">
            <h1>Password reset</h1>
            <form onSubmit={form => this.passwordReset(form)} className="form_inputs">
                <p>If you have forgotten your password, you can use this form to reset your password. You will receive an email with instructions.</p>
                <input type="text" name="emailReset" placeholder="Email" value={this.state.emailReset} onChange={e => this.handleChange(e)} required></input>
                <button>Send</button>
            </form>
        </div>)

        return content;
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
    success: null,
}

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.authAxios = props.authAxios
        this.state = initialStateRegister;
        this.showPopup = props.showPopup
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
                email: this.state.email.toLowerCase(),
                password: this.state.password,
                passwordConfirm: this.state.passwordConfirm,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                dateOfBirth: this.state.dateOfBirth,
            }
            
            const headers = {
                'Content-Type': 'application/json',
            }
            
            this.authAxios.post('http://localhost:8080/register', userObject, {'headers': headers})
            .then((res) => {
                this.setState({success: this.success(res.data.user)})
                this.setState(userInitial)
            }).catch((error) => {
                let errorMessage = "Unkonwn error, try again later."
                if (error.response) {
                    errorMessage = error.response.data.message;
                }
                this.setState({validationError: errorMessage});
            });
        }
        this.setState({validationError});
    }
    
    success(user) {
        return (
        <div className="register_success">
            <h1>Welcome to the community, <span style={{color: "var(--red-medium)"}}>{user.userName}</span>!</h1>
            <p>We wish you a good stay among us, be sure to read our terms of services</p>
            <p>A verification email has been sent to <span style={{color: "var(--red-medium)"}}>{user.email}</span>, 
            follow the steps to get verified and enjoy access for all of our services.</p>
            <p>What are you waiting for go ahead and start your journey!</p>
            <button onClick={() => {this.showPopup("login")}}>Login</button>
        </div>
        )
    }

    render() {
        const validation = (this.state.validationError && <div className="validation_error"><p>{this.state.validationError}</p></div>)
        let content = (
            <div>
                <h1>Register</h1>
                {validation}
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
                        <p>Already have an account? <span style={{color: "var(--red-medium)", cursor: "pointer"}} onClick={() => {this.showPopup("login")}}>Click here.</span></p>
                    </div>
                </form>
            </div>
        )
        const success = this.state.success
        if (success !== null) content = success 

        return content;
    }
}

LoginForm = withRouter(LoginForm)
RegisterForm = withRouter(RegisterForm)

export {
    LoginForm,
    RegisterForm,
}
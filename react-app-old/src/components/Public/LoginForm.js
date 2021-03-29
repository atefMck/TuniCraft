import './Auth.css';
import './Landing.css';
import React from 'react';
import axios from 'axios';

const initialState = {
    username: '',
    password: '',
    remember: false,
    validationError: ''
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = initialState
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
            <div className="Container BoxShadow">
                <div className="Landing LoginForm Form">
                    <h1>Login</h1>
                    <p>User your ingame name to login.</p>
                    {this.state.validationError && <div className="ValidationError">{this.state.validationError}</div>}
                    <form onSubmit={form => this.onSubmit(form)}>
                        <label>Username:</label>
                        <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} required></input>
                        <label>Password:</label>
                        <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} required></input>
                        <a href="/login">Forgot password?</a>
                        <div className="Remember">
                            <input type="checkbox" name="remember" value={this.state.remember}></input>
                            <p>Remember me</p>
                        </div>
                        <div className="FlexRow Action">
                            <button>Login</button>
                        </div>
                    </form>
                    <a href="/register">Don't have an account? Click here.</a>
                </div>
            </div>
        );
    }
}

export default LoginForm;

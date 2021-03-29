import './App.css';
import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import LoginForm from './Public/LoginForm';
import RegisterForm from './Public/RegisterForm';
import Landing from './Public/Landing';
import Dashboard from './Dashboard/Dashboard';
import authAxios from './Utils'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.auth = this.auth.bind(this)
        this.state = {
            auth: false
        }
        this.isAuthenticated()
    }

    isAuthenticated() {
        authAxios.get("http://localhost:8080/isauth")
            .then((res, req) => {
                let auth = res.data.isAuthenticated
                this.setState({auth})
            })
            .catch((err) => {
                let auth = err.response.data.isAuthenticated
                this.setState({auth})
            })

    }

    auth() {
        this.setState({auth: true})
    }

    render() {
        return (
            
            <BrowserRouter>
                <div className="MainContainer">
                <div className="Container boxShadow">
                    <Switch>
                        {!this.state.auth &&
                        <Route>
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/register" component={RegisterForm} />
                            <Route exact path="/login" component={() => <LoginForm auth={this.auth} />} />
                            {/* <Route exact path="*" component={Landing}><Redirect to="/" /></Route> */}
                        </Route>
                        }
                        {this.state.auth &&
                        <Route>
                            <Route exact path="/dashboard" component={Dashboard} />
                            <Route exact path="*" component={Dashboard}><Redirect to="/dashboard" /></Route>
                        </Route>
                        }
                    </Switch>
                    </div>
                </div>
            </BrowserRouter>
            
        );
    }
}

export default App;

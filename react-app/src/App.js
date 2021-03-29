import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from 'routes/Landing'
import Dashboard from 'routes/Dashboard'
import Forum from 'routes/Forum/Forum'
import authAxios from 'helper/authorization'

import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.auth = this.auth.bind(this)
        this.state = {
            auth: false
        }
        // this.isAuthenticated()
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
                    <Switch>
                        <Route exact path="/dashboard">
                            <Dashboard />
                        </Route>
                        <Route exact path="/">
                            <Landing auth={this.state.auth}/>
                        </Route>
                        <Route exact path="/forum">
                            <Forum />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

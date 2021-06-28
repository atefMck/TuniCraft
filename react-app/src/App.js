import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from 'routes/Landing'
import Dashboard from 'routes/Dashboard'
import Verification from 'components/Utility'

import './App.css'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                    <Switch>
                        <Route path="/verify-account/:userId/:token" component={Verification} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route exact path="/" component={Landing} />
                        <Route path="*"><p style={{color: "red"}}>Not found</p></Route>
                    </Switch>
            </BrowserRouter>
        );
    }
}

export default App;

import React from 'react';
import './Dashboard.css';
import Stats from './Stats/Stats';
import Settings from './Settings/Settings';
import Forum from './Forum/Forum';
import ButtonList from './ButtonList';
import authAxios from '../Utils'

class Dashboard extends React.Component {
  constructor() {
    super();
    this.getData()
    this.state = {
      name: "Dashboard",
      panels: {
        Stats: {component: Stats, state: true},
        Settings: {component: Settings, state: false},
        Store: {component: Stats, state: false},
        Forum: {component: Forum, state: false},
        Leaderboard: {component: Stats, state: false},
        Contact: {component: Stats, state: false},
      },
      user: {
        username: "Default"
      }
    }
  }

  async getData() {
    await authAxios.get("http://localhost:8080/api/user")
      .then(data => {
        const user = {
          username: data.data.userName
        }
        this.setState({user})
      })
  }

  handlePanel(panel_name) {
    let newpanelstate = this.state.panels;
    for (let key in newpanelstate) {
      if (key === panel_name) {
        newpanelstate[key].state = true;
      } else {
        newpanelstate[key].state = false;
      }
    }
    this.setState({panels: newpanelstate});
  }

  getPanel() {
    for (let comp in this.state.panels) {
      if (this.state.panels[comp].state === true) {
        let Component = this.state.panels[comp].component;
        return <Component user={this.state.user}/>;
      }
    }
    return "";
  }

  render() {
    return (
      <div className="Dashboard">
        <div className="Container BoxShadow DashboardContent">
          {this.getPanel()}
        </div>
        <ButtonList name="Stats" panels={this.state.panels} onClick={this.handlePanel.bind(this)}/>
      </div>
    );
  } 
}

export default Dashboard;

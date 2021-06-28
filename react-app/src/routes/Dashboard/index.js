import React from 'react';
import axios from 'axios';
import { Route, Link, Switch, withRouter, Redirect } from 'react-router-dom'

import './index.css'

import Home from './Home'
import Forum from './Forum'
import Settings from './Settings'
import ForumThreads from './Forum/ForumThreads'
import ForumPost from './Forum/ForumPost'
import ForumEditor from './Forum/ForumEditor'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faExclamationCircle,
    faAdjust,
    faQuestionCircle,
    faUserCircle,
    faBars,
    faUserPlus,
    faChevronDown,
    faHome,
    faCog,
    faGlobeAfrica,
    faExternalLinkAlt,
    faGem,
    faParagraph,
    faCartPlus,
    faShareAlt
} from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faDiscord, faTwitter} from '@fortawesome/free-brands-svg-icons'

import Logo from 'assets/logo.png'
import Panorama from 'assets/header-panorama.jpg'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.authAxios = axios.create({
            baseURL: "http://localhost:8080",
            browserBaseURL: "http://localhost:8080",
            headers: {
                authorization: `Bearer ${localStorage.getItem("CXRF-token")}`
            }
        })
        this.logout = this.logout.bind(this)
        this.path = props.match.path
        this.url = props.match.url
        this.state = { 
            user: null
        }
    }

    componentDidMount() {
        this.authAxios.get("/api/user")
        .then(res => {
            this.setState({user: res.data});
        }).catch(() => this.props.history.push("/"))
    }

    logout() {
        localStorage.removeItem("CXRF-token")
        this.props.history.push("/")
    }

    render() {
        return (
            <div className="dashboard">
                <header>
                    <img src={Panorama} alt="" />
                    <span></span>
                    <div>
                        <img src={Logo} alt="" className="logo_small"/>
                        <ul>
                            <li key={"help_icon"}><FontAwesomeIcon icon={faQuestionCircle} /></li>
                            <li key={"night_mode_icon"}><FontAwesomeIcon icon={faAdjust} /></li>
                            <li key={"report_bug_icon"}><FontAwesomeIcon icon={faExclamationCircle} /></li>
                        </ul>
                        <div>
                            <FontAwesomeIcon icon={faUserCircle} className="user_icon"/>
                            <p>{this.state.user?.userName}<br></br><span>Player</span></p>
                            
                        </div>
                        <p onClick={() => this.logout()}>Logout</p>
                    </div>
                </header>
                <main>
                    <nav>
                        <header className="nav_header">
                            <p>Navigation</p>
                            <FontAwesomeIcon icon={faBars} />
                        </header>
                        <ul>
                            <li key={"link_to_home"}>
                                <Link exact="true" to={`${this.url}/home`} className="side_nav_link">
                                    <FontAwesomeIcon icon={faHome} /><p>Home</p>
                                </Link>
                            </li>
                            <li key={"link_to_forum"}>
                                <Link exact="true" to={`${this.url}/forum`} className="side_nav_link">
                                    <FontAwesomeIcon icon={faParagraph} /><p>Forum</p>            
                                </Link>
                            </li>
                            <li key={"link_to_map"}>
                                <Link exact="true" to={`${this.url}/map`} className="side_nav_link">
                                    <FontAwesomeIcon icon={faGlobeAfrica} /><p>Map</p>    
                                </Link>
                            </li>
                            <li key={"link_to_characters"}>
                                <Link exact="true" to={`${this.url}/characters`} className="side_nav_link">
                                    <FontAwesomeIcon icon={faUserPlus} /><p>Characters</p>    
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </Link>
                            </li>
                            <li key={"link_to_settings"}>
                                <Link exact="true" to={`${this.url}/settings`} className="side_nav_link">
                                    <FontAwesomeIcon icon={faCog} /><p>Settings</p>    
                                </Link>
                            </li>
                        </ul>
                        <header>
                            <p>Social Media Links</p>
                            <FontAwesomeIcon icon={faShareAlt} />
                        </header>
                        <ul>
                            <li key={"link_to_Instagram"}>
                                <FontAwesomeIcon icon={faInstagram} /><a className="side_nav_link" href="https://www.instagram.com/tunicraft_server/"><p>Instagram</p></a>
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </li>
                            <li key={"link_to_Facebook"}>
                                <FontAwesomeIcon icon={faFacebookF} /><a className="side_nav_link" href="https://www.facebook.com/TuniCraft-109206478021123"><p>Facebook</p></a>
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </li>
                            <li key={"link_to_Discord"}>
                                <FontAwesomeIcon icon={faDiscord} /><a className="side_nav_link" href="https://discord.gg/5cBdVt2dZm"><p>Discord</p></a>
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </li>
                            <li key={"link_to_Twitter"}>
                                <FontAwesomeIcon icon={faTwitter} /><a className="side_nav_link" href="https://twitter.com/Tunicraft1"><p>Twitter</p></a>
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </li>
                        </ul>
                        <header>
                            <p>Store</p>
                            <FontAwesomeIcon icon={faCartPlus} />
                        </header>
                    </nav>
                    <main>
                        <header>
                            <p>User Control Panel</p>
                            <div>
                                <FontAwesomeIcon className="icon" icon={faGem}/>
                                <p>45 Coins</p>
                            </div>
                        </header>
                        <Switch>
                            <Route exact path={`${this.path}/forum/:subCategoryName/post_thread`}><ForumEditor authAxios={this.authAxios} user={this.state.user} /></Route>
                            <Route path={`${this.path}/forum/:subCategoryName/:threadTitle`}><ForumPost authAxios={this.authAxios} user={this.state.user} /></Route>
                            <Route exact path={`${this.path}/forum/:subCategoryName`}><ForumThreads authAxios={this.authAxios} user={this.state.user} /></Route>
                            <Route exact path={`${this.path}/forum`}><Forum authAxios={this.authAxios} user={this.state.user} /></Route>
                            <Route path={`${this.path}/home`} ><Home authAxios={this.authAxios} user={this.state.user} /></Route>
                            <Route path={`${this.path}/settings`}><Settings authAxios={this.authAxios} user={this.state.user} /></Route>
                            <Route exact path={`${this.path}`}><Redirect to="/dashboard/home" /></Route>
                        </Switch>
                    </main>
                </main>
            </div>
        );
    }
}

export default withRouter(Dashboard);

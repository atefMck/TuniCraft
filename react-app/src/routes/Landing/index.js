import React from 'react'
import Auth from './Auth'
import './index.css'
import { feature, post, postrev, icons } from 'helper/placeholders'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faDownload, faUserCircle, faUserEdit, faCrown, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faDiscord, faTwitter} from '@fortawesome/free-brands-svg-icons'
import { Events, animateScroll as scroll, scrollSpy } from 'react-scroll'

import Logo from 'assets/logo.png'
import BgVideo from 'assets/bg-video.mp4'
import BgFixed from 'assets/bg-fixed.jpg'

const initialState = {
    icons: icons,
    features: [feature, feature, feature, feature] ,
    posts: [post, postrev, post],
    popup: {
        pop: false,
        login: false,
        register: false
    },
    iconsHide: true,
}

class Landing extends React.Component {
    constructor(props) {
        super(props)
        this.state = initialState
        this.hidePopup = this.hidePopup.bind(this);
    }

    componentDidMount() {
        Events.scrollEvent.register('begin');
        Events.scrollEvent.register('end');
        scrollSpy.update();
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    scrollTo(y) {
        scroll.scrollTo(y);
    }

    showPopup(popup) {
        const newPopup = this.state.popup
        newPopup.pop = true
        if (popup === "login") {
            newPopup.login = true
            newPopup.register = false
        } else if (popup === "register") {
            newPopup.register = true
            newPopup.login = false
        }
        this.setState({popup: newPopup})
    }

    hidePopup() {
        const newPopup = this.state.popup
        newPopup.pop = false
        newPopup.login = false
        newPopup.register = false
        this.setState({popup: newPopup})
    }

    render() {
        return (
            <div className="main_container">
                {this.state.popup.pop && <Auth login={this.state.popup.login} register={this.state.popup.register} hidePopup={this.hidePopup}/>}
                <img src={BgFixed} alt="" className="bg_fixed"/>

                {/* Section Intro */}
                <section className="section_intro">
                    <video
                        autoPlay
                        muted
                        loop
                    >
                        <source src={BgVideo} type="video/mp4"></source>
                    </video>
                    <nav>
                        <img src={Logo} alt="" className="logo_small"/>
                        <ul>
                            <li key="1">
                                <p>Home</p>
                            </li>
                            <li key="2" onClick={() => this.scrollTo(947)}>
                                <p>Play</p>
                            </li>
                            <li key="3" onClick={() => this.scrollTo(1920)}>
                                <p>News</p>
                            </li>
                            <li key="4">
                                <p>Forum</p>
                            </li>
                            <li key="5">
                                <span>25 Players Online</span>
                            </li>
                            <li className="list_button" onClick={() => this.showPopup("login")}>
                                <p>Login</p>
                            </li>
                            <li className="list_button" onClick={() => this.showPopup("register")}>
                                <p>Register</p>
                            </li>
                            {this.props.auth &&
                            <li className="list_button">
                                <p>Control Panel</p>
                            </li>
                            } 
                            
                        </ul>
                    </nav>
                    <div>
                        <h2>The best developed Tunisian minecraft server</h2>
                        <h1>TUNI<span>CRAFT</span></h1>
                        <h3>From gamers to gamers</h3>
                    </div>
                </section>

                {/* Section Icons */}
                <section className="section section_icons">
                    <h1 className="section_header">Hall of fame</h1>
                    <ul>
                        {this.state.icons}
                    </ul>
                </section>

                {/* Section Play */}
                <section className="section section_play">
                    <h1 className="section_header">How to join</h1>
                    <ul>
                        <li>
                            <h1>Download a Launcher</h1>
                            <FontAwesomeIcon icon={faDownload} className="demo_icon"/><br/>
                            <p>
                                <a href="https://www.minecraft.net/en-us/download/">Minecraft (Premium)</a><br/>
                                <a href="https://tlauncher.org/en/">TLauncher (Cracked)</a>
                            </p>
                        </li>
                        {/* <FontAwesomeIcon icon={faArrowRight} className="arrow_right"/> */}
                        <li>
                            <h1>Register an account</h1>
                            <FontAwesomeIcon icon={faUserCircle} className="demo_icon"/>
                            <p>Make an account on our website using this link</p>
                        </li>
                        {/* <FontAwesomeIcon icon={faArrowRight} className="arrow_right"/> */}
                        <li>
                            <h1>Create a character</h1>
                            <FontAwesomeIcon icon={faUserEdit} className="demo_icon"/>
                            <p>Create a new character in your dashboard</p>
                        </li>
                        {/* <FontAwesomeIcon icon={faArrowRight} className="arrow_right"/> */}
                        <li>
                            <h1>Join the fun</h1>
                            <FontAwesomeIcon icon={faCrown} className="demo_icon"/>
                            <p>Start building your empire using this IP: <span>play.tunicraft.me</span></p>
                        </li>
                    </ul>
                </section>

                {/* Section Info */}
                <section className="section section_info">
                    <div>
                        <header>
                            <h1>Check out our most recent <br></br><div>features</div></h1>
                            <div>
                                <FontAwesomeIcon icon={faArrowLeft} className="controls_icon"/>
                                <FontAwesomeIcon icon={faArrowRight} className="controls_icon"/>
                            </div>
                        </header>
                        <ul>
                            {this.state.features}
                        </ul>
                    </div>
                    <div>
                        <header className="header_right">
                            <h1>What's poppin in the server<div>Latest News</div></h1>
                        </header>
                        <ul>
                            {this.state.posts}
                        </ul>
                    </div>
                </section>

                {/* Section Footer */}
                <footer className="section footer">
                    <ul>
                        <li><FontAwesomeIcon icon={faFacebookF}/></li>
                        <li><FontAwesomeIcon icon={faInstagram}/></li>
                        <li><FontAwesomeIcon icon={faDiscord}/></li>
                        <li><FontAwesomeIcon icon={faTwitter}/></li>
                    </ul>
                    <h1>Useful links:</h1>
                    <button>Terms of servises</button>
                    <button>Rules and Guides</button>
                    <p>&#169; Copyright 2021 Tunicraft. All rights reserved.</p>
                </footer>
            </div>
        );
    }
}

export default Landing;

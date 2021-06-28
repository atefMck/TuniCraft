import React from 'react'
import axios from 'axios'

import './index.css'
import { Popup } from 'components'
import { feature, postH, postHrev, icons } from 'helper/placeholders'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faDownload, faUserCircle, faUserEdit, faCrown, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faDiscord, faTwitter} from '@fortawesome/free-brands-svg-icons'
import { Events, animateScroll as scroll, scrollSpy } from 'react-scroll'

import Logo from 'assets/logo.png'
import BgVideo from 'assets/bg-video.mp4'
import BgFixed from 'assets/bg-fixed.jpg'

const initialState = {
    icons: icons,
    feature: feature,
    postH: postH,
    postHrev: postHrev,
    activePopup: null,
    iconsHide: true,
}
        
class Landing extends React.Component {
    constructor(props) {
        super(props)
        this.authAxios = axios.create({
            baseURL: "http://localhost:8080",
            browserBaseURL: "http://localhost:8080",
            headers: {
                authorization: `Bearer ${localStorage.getItem("CXRF-token")}`
            }
        })
        this.closePopup = this.closePopup.bind(this)
        this.showPopup = this.showPopup.bind(this)
        this.state = initialState
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
        this.setState({activePopup: <Popup authAxios={this.authAxios} popupContent={popup} closePopup={this.closePopup} showPopup={this.showPopup} />})
    }

    closePopup() {
        this.setState({activePopup: null})
    }
    
    render() {
        return (
            <div className="main_container landing">
                { this.state.activePopup }
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
                            <li key={"1"}>
                                <p>Home</p>
                            </li>
                                <li key={"2"} onClick={() => this.scrollTo(947)}>
                                <p>Play</p>
                            </li>
                                <li key={"3"} onClick={() => this.scrollTo(1920)}>
                                <p>News</p>
                            </li>
                                <li key={"4"}>
                                <p>Forum</p>
                            </li>
                            <li key={"5"}>
                                <span>25 Players Online</span>
                            </li>
                            <li key={"login_button"} className="list_button" onClick={() => this.showPopup("login")}>
                                <p>Login</p>
                            </li>
                            <li key={"register_button"} className="list_button" onClick={() => this.showPopup("register")}>
                                <p>Register</p>
                            </li>
                            {this.props.auth &&
                                <li key={"control_panel_button"} className="list_button">
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
                        <li key={"download_join"}>
                            <h1>Download a Launcher</h1>
                            <FontAwesomeIcon icon={faDownload} className="demo_icon"/><br/>
                            <p>
                                <a href="https://www.minecraft.net/en-us/download/">Minecraft (Premium)</a><br/>
                                <a href="https://tlauncher.org/en/">TLauncher (Cracked)</a>
                            </p>
                        </li>
                {/* <FontAwesomeIcon icon={faArrowRight} className="arrow_right"/> */}
                        <li key={"register_join"}>
                            <h1>Register an account</h1>
                            <FontAwesomeIcon icon={faUserCircle} className="demo_icon"/>
                            <p>Make an account on our website using this link</p>
                        </li>
                {/* <FontAwesomeIcon icon={faArrowRight} className="arrow_right"/> */}
                        <li key={"create_char_join"}>
                            <h1>Create a character</h1>
                            <FontAwesomeIcon icon={faUserEdit} className="demo_icon"/>
                            <p>Create a new character in your dashboard</p>
                        </li>
                {/* <FontAwesomeIcon icon={faArrowRight} className="arrow_right"/> */}
                        <li key={"final_join"}>
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
                            {this.state.feature}
                        </ul>
                    </div>
                    <div>
                        <header className="header_right">
                            <h1>What's poppin in the server<div>Latest News</div></h1>
                        </header>
                        <ul>
                            {this.state.postH}
                            {this.state.postHrev}
                        </ul>
                    </div>
                </section>
                
                {/* Section Footer */}
                <footer className="section footer">
                    <ul>
                        <li key={"footer_facebook"}><FontAwesomeIcon icon={faFacebookF}/></li>
                        <li key={"footer_instagram"}><FontAwesomeIcon icon={faInstagram}/></li>
                        <li key={"footer_discord"}><FontAwesomeIcon icon={faDiscord}/></li>
                        <li key={"footer_twitter"}><FontAwesomeIcon icon={faTwitter}/></li>
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
            
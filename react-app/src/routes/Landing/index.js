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
    posts: [postrev, post, postrev],
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
                <div className="bg_fixed">
                    <img src={BgFixed} alt="" />
                </div>
                <section className="section_intro">
                    <div className="video_film">
                    </div>
                    <video
                        autoPlay
                        muted
                        loop
                    >
                        <source src={BgVideo} type="video/mp4"></source>
                    </video>
                    <nav className="menu_main">
                        <div className="menu_logo">
                            <img src={Logo} alt="" />
                        </div>
                        <ul className="menu_list">
                            <li key="1">Home</li>
                            <li key="2" onClick={() => this.scrollTo(947)}>Play</li>
                            <li key="3" onClick={() => this.scrollTo(1920)}>News</li>
                            <li key="4">Forum</li>
                            <li key="5"><span>25 Players Online</span></li>
                        </ul>
                        {!this.props.auth && 
                        <div className="menu_auth">
                            <div className="menu_profile" onClick={() => this.showPopup("login")}>
                                Login
                            </div>
                            <div className="menu_profile menu_register" onClick={() => this.showPopup("register")}>
                                Register
                            </div>
                        </div>
                        }
                        {this.props.auth &&
                        <div className="menu_auth">
                            <div className="menu_profile menu_panel">
                                Control Panel
                            </div>
                        </div>
                        } 
                    </nav>
                    <div className="intro_content">
                        <h1>The best developed Tunisian minecraft server</h1>
                        <div>
                            <p>TUNI<span>CRAFT</span></p>
                        </div>
                        <h2>
                            From gamers to gamers
                        </h2>
                    </div>
                </section>
                <section className="section_icons">
                    <h1>Hall of fame</h1>
                    <ul>
                        {this.state.icons}
                    </ul>
                </section>
                <section className="section_play">
                    <h1 className="section_play_title">How to join</h1>
                    <div className="section_play_cards">
                        <div className="howto_card">
                            <h1>Download a Launcher</h1>
                            <div>
                                <FontAwesomeIcon icon={faDownload} className="howto_icon"/>
                            </div>
                            <div className="download_links">
                                <a href="https://www.minecraft.net/en-us/download/">Minecraft (Premium)</a><br/>
                                <a href="https://tlauncher.org/en/">TLauncher (Cracked)</a>
                            </div>
                        </div>
                        <FontAwesomeIcon icon={faArrowRight} className="arrow_icon"/>
                        <div className="howto_card">
                            <h1>Register an account</h1>
                            <div>
                                <FontAwesomeIcon icon={faUserCircle} className="howto_icon"/>
                            </div>
                            <p>Make an account on our website using this link</p>
                        </div>
                        <FontAwesomeIcon icon={faArrowRight} className="arrow_icon"/>
                        <div className="howto_card">
                            <h1>Create a character</h1>
                            <div>
                                <FontAwesomeIcon icon={faUserEdit} className="howto_icon"/>
                            </div>
                            <p>Create a new character in your dashboard</p>
                        </div>
                        <FontAwesomeIcon icon={faArrowRight} className="arrow_icon"/>
                        <div className="howto_card">
                            <h1>Join the fun</h1>
                            <div>
                                <FontAwesomeIcon icon={faCrown} className="howto_icon"/>
                            </div>
                            <p>Start building your empire using this IP: <span>play.tunicraft.me</span></p>
                        </div>
                    </div>
                </section>
                <section className="section_info">
                    <div className="info_features">
                        <header>
                            <h1>Check out our most recent </h1>
                            <div className="features_header">
                                <div className="features_textbox">features</div>
                                <div className="features_controls">
                                    <div><FontAwesomeIcon icon={faArrowLeft} className="arrow_icon"/></div>
                                    <div><FontAwesomeIcon icon={faArrowRight} className="arrow_icon"/></div>
                                </div>
                            </div>
                        </header>
                        <div className="features_cards_container">
                            {this.state.features}
                        </div>
                    </div>
                    <div className="info_news">
                        <header>
                            <h1>What's poppin in the server</h1>
                            <div className="news_title">Latest News</div>
                        </header>
                        {this.state.posts}

                    </div>
                </section>
                <section className="section_footer">
                    <div className="footer_socials">
                        <FontAwesomeIcon icon={faFacebookF}/>
                        <FontAwesomeIcon icon={faInstagram}/>
                        <FontAwesomeIcon icon={faDiscord}/>
                        <FontAwesomeIcon icon={faTwitter}/>
                    </div>
                    <div className="footer_links">
                        <h1>Useful links:</h1>
                        <div>
                            <p>Terms of servises</p>
                            <p>Rules and Guides</p>
                        </div>
                    </div>
                    <div className="footer_copyright">
                        <p>&#169; Copyright 2021 Tunicraft. All rights reserved.</p>
                    </div>
                </section>
            </div>
        );
    }
}

export default Landing;

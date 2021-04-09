import React from 'react';
import './index.css'
import Home from './Home'

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
    render() {
        return (
            <div className="dashboard">
                <header>
                    <img src={Panorama} alt="" />
                    <span></span>
                    <div>
                        <img src={Logo} alt="" className="logo_small"/>
                        <ul>
                            <li><FontAwesomeIcon icon={faQuestionCircle} /></li>
                            <li><FontAwesomeIcon icon={faAdjust} /></li>
                            <li><FontAwesomeIcon icon={faExclamationCircle} /></li>
                        </ul>
                        <div>
                            <FontAwesomeIcon icon={faUserCircle} className="user_icon"/>
                            <p>xevious007<br></br><span>Player</span></p>
                            
                        </div>
                        <p>Logout</p>
                    </div>
                </header>
                <main>
                    <nav>
                        <header className="nav_header">
                            <p>Navigation</p>
                            <FontAwesomeIcon icon={faBars} />
                        </header>
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faHome} /><p>Home</p>        
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faParagraph} /><p>Forum</p>            
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faGlobeAfrica} /><p>Map</p>    
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faUserPlus} /><p>Characters</p>    
                                <FontAwesomeIcon icon={faChevronDown} />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCog} /><p>Settings</p>    
                                <FontAwesomeIcon icon={faChevronDown} />
                            </li>
                        </ul>
                        <header>
                            <p>Social Media Links</p>
                            <FontAwesomeIcon icon={faShareAlt} />
                        </header>
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faInstagram} /><p>Instagram</p>
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faFacebookF} /><p>Facebook</p>
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDiscord} /><p>Discord</p>
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faTwitter} /><p>Twitter</p>
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
                                <FontAwesomeIcon icon={faGem}/>
                                <p>45 Coins</p>
                            </div>
                        </header>
                        <Home />
                    </main>
                </main>
            </div>
        );
    }
}

export default Dashboard;

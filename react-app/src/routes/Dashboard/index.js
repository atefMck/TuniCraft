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
    // faChartBar,
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
                <div className="dashboard_container">
                    <header className="dashboard_header">
                        <img src={Panorama} alt="" className="header_background"/>
                        <div className="header_background"></div>
                        <div className="header_padding">
                            <div className="header_logo">
                                <img src={Logo} alt="" />
                            </div>
                            <div className="header_profile">
                                <div className="profile_buttons">
                                    <div><FontAwesomeIcon icon={faQuestionCircle} /></div>
                                    <div><FontAwesomeIcon icon={faAdjust} /></div>
                                    <div><FontAwesomeIcon icon={faExclamationCircle} /></div>
                                </div>
                                <div className="profile_user">
                                    <div><FontAwesomeIcon icon={faUserCircle} className="user_icon"/></div>
                                    <div>
                                        <p><span>xevious007</span></p>
                                        <p>Player</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="dashboard_content">
                        <div className="content_nav">
                            <header className="nav_header">
                                <div>Navigation</div>
                                <div className="header_icon">
                                    <FontAwesomeIcon icon={faBars} />
                                </div>
                            </header>
                            <div className="nav_menu">
                                <ul>
                                    <li>
                                        <div className="menu_icon"><FontAwesomeIcon icon={faHome} /><p>Home</p></div>               
                                    </li>
                                    {/* <li>
                                        <div className="menu_icon"><FontAwesomeIcon icon={faChartBar} /><p>Statistics</p></div>     
                                    </li> */}
                                    <li>
                                        <div className="menu_icon"><FontAwesomeIcon icon={faParagraph} /><p>Forum</p></div>             
                                    </li>
                                    <li>
                                        <div className="menu_icon"><FontAwesomeIcon icon={faUserPlus} /><p>Characters</p></div>     
                                        <div className="menu_chevron"><FontAwesomeIcon icon={faChevronDown} /></div>
                                    </li>
                                    <li>
                                        <div className="menu_icon"><FontAwesomeIcon icon={faCog} /><p>Settings</p></div>     
                                        <div className="menu_chevron"><FontAwesomeIcon icon={faChevronDown} /></div>
                                    </li>
                                    <li>
                                        <div className="menu_icon"><FontAwesomeIcon icon={faGlobeAfrica} /><p>Map</p></div>     
                                        <div className="menu_chevron"><FontAwesomeIcon icon={faChevronDown} /></div>
                                    </li>
                                </ul>
                            </div>
                            <header className="nav_header">
                                <div>Social Media Links</div>
                                <div className="header_icon">
                                    <FontAwesomeIcon icon={faShareAlt} />
                                </div>
                            </header>
                            <div className="nav_menu">
                                <ul>
                                    <li>
                                        <div className="menu_icon"><FontAwesomeIcon icon={faInstagram} /><p>Instagram</p></div>     
                                        <div className="menu_chevron"><FontAwesomeIcon icon={faExternalLinkAlt} /></div>
                                    </li>
                                    <li>
                                        <div className="menu_icon"><FontAwesomeIcon icon={faFacebookF} /><p>Facebook</p></div>     
                                        <div className="menu_chevron"><FontAwesomeIcon icon={faExternalLinkAlt} /></div>
                                    </li>
                                    <li>
                                        <div className="menu_icon"><FontAwesomeIcon icon={faDiscord} /><p>Discord</p></div>     
                                        <div className="menu_chevron"><FontAwesomeIcon icon={faExternalLinkAlt} /></div>
                                    </li>
                                    <li>
                                        <div className="menu_icon"><FontAwesomeIcon icon={faTwitter} /><p>Twitter</p></div>     
                                        <div className="menu_chevron"><FontAwesomeIcon icon={faExternalLinkAlt} /></div>
                                    </li>
                                </ul>
                            </div>
                            <header className="nav_header menu_store">
                                <div>Store</div>
                                <div className="header_icon store_icon">
                                    <FontAwesomeIcon icon={faCartPlus} />
                                </div>
                            </header>
                        </div>
                        <div className="content_window">
                            <header className="window_header">
                                <div>User Control Panel</div>
                                <div className="window_resources">
                                    <FontAwesomeIcon icon={faGem} className="resources_icon"/>
                                    <p>45 Coins</p>
                                </div>
                            </header>
                            <div className="window_content">
                                <Home />
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Dashboard;

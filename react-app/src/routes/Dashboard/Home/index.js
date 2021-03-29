import React from 'react';
import './index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faUser,
    faUsers,
    faDollarSign,
    faTrophy,
} from '@fortawesome/free-solid-svg-icons'

import { post } from 'helper/placeholders'

class Home extends React.Component {
    render() {
        return (
                <div className="content_container">
                    <div className="home_stats">
                        <div className="stats_card">
                            <FontAwesomeIcon icon={faUser} className="card_icon"/>
                            <div>
                                <p>Registred Accounts</p>
                                <h1>243</h1>
                            </div>
                        </div>
                        <div className="stats_card">
                            <FontAwesomeIcon icon={faUsers} className="card_icon"/>
                            <div>
                                <p>Total Characters</p>
                                <h1>456</h1>
                            </div>
                        </div>
                        <div className="stats_card">
                            <FontAwesomeIcon icon={faDollarSign} className="card_icon"/>
                            <div>
                                <p>Players Money</p>
                                <h1>8,243,342 DT</h1>
                            </div>
                        </div>
                        <div className="stats_card">
                            <FontAwesomeIcon icon={faTrophy} className="card_icon"/>
                            <div>
                                <p>Minigames</p>
                                <h1>243</h1>
                            </div>
                        </div>
                    </div>
                    <div className="home_windows">
                        <div className="windows_video">
                            <iframe src="https://www.youtube.com/embed/MmB9b5njVbA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div className="windows_news">
                            {post}
                        </div>
                        <div className="windows_news">
                            {post}
                        </div>
                        <div className="windows_news">
                            {post}
                        </div>
                        <div className="windows_news">
                            {post}
                        </div>
                        <div className="windows_news">
                            {post}
                        </div>
                    </div>
                </div>
        );
    }
}

export default Home;
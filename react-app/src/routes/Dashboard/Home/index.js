import React from 'react';
import './index.css';
import { StoreCard } from 'components'
import { postV } from 'helper/placeholders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faServer, faComments, faIdCard } from '@fortawesome/free-solid-svg-icons'

class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <header>
                    <ul>
                        <li key={"game_server_status"}>
                            <FontAwesomeIcon icon={faServer} className="icon"/>
                            <h2>Game Server:</h2>
                            <p>Online</p>
                        </li>
                        <li key={"discord_server_status"}>
                            <FontAwesomeIcon icon={faDiscord} className="icon"/>
                            <h2>Discord:</h2>
                            <p>Online</p>
                        </li>
                        <li key={"forums_server_status"}>
                            <FontAwesomeIcon icon={faComments} className="icon"/>
                            <h2>Forums:</h2>
                            <p>Online</p>
                        </li>
                        <li key={"dashboard_server_status"}>
                            <FontAwesomeIcon icon={faIdCard} className="icon"/>
                            <h2>Dashboard:</h2>
                            <p>Online</p>
                        </li>
                    </ul>
                </header>
                <ul className="shop">
                    <StoreCard storeCardId={"11"} name="Cute Companion" code="COMP-2130" price="7" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar iaculis erat viverra iaculis."></StoreCard>
                    <StoreCard storeCardId={"22"} name="Cute Companion" code="COMP-2130" price="7" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar iaculis erat viverra iaculis."></StoreCard>
                    <StoreCard storeCardId={"33"} name="Cute Companion" code="COMP-2130" price="7" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar iaculis erat viverra iaculis."></StoreCard>
                    <StoreCard storeCardId={"44"} name="Cute Companion" code="COMP-2130" price="7" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar iaculis erat viverra iaculis."></StoreCard>
                    <StoreCard storeCardId={"55"} name="Cute Companion" code="COMP-2130" price="7" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar iaculis erat viverra iaculis."></StoreCard>
                    <StoreCard storeCardId={"66"} name="Cute Companion" code="COMP-2130" price="7" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar iaculis erat viverra iaculis."></StoreCard>                
                </ul>
                <ul className="news">
                    { postV }
                </ul>
            </div>
        );
    }
}

export default Home;
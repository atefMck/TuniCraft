import './Stats.css';
import React from 'react';
import PlayerDisplay from './PlayerDisplay';
import PlayerStats from './PlayerStats';
import coin from '../../../img/coin.png';
import dinar from '../../../img/dinar.png';

class Stats extends React.Component {
    render() {
        return (
            <div className="Stats">
                <header>
                    <div className="Profile FlexRow">
                        <h2>Welcome, {this.props.user.username}.</h2>
                    </div>
                    <div className="Riches FlexRow">
                        <div className="DisplayBox BoxShadow FlexRow">
                            <img src={dinar} className="Dinar Icon" alt="dinar"/>
                            <p>150 Dinars</p>
                        </div>
                        <div className="DisplayBox BoxShadow FlexRow">
                            <img src={coin} className="Coin Icon" alt="coin"/>
                            <p>22 Coins</p>
                        </div>
                    </div>
                </header>
                <div className="FlexRow StatsContent">
                    <PlayerDisplay />
                    <PlayerStats />
                </div>
            </div>
        );
    }
}

export default Stats;

import React from 'react';
import avatar from '../../../img/lDuma.png'

class PlayerDisplay extends React.Component {
    render() {
        return (
            <div className="PlayerDisplay">
                <div className="PlayerName">
                    <p>lDuma | 31 lvl</p>
                </div>
                <div className="PlayerAvatar">
                    <img src={avatar} alt="playeravatar"></img>
                </div>
                <div className="PlayerRank">
                    <h1>Netherite</h1>
                </div>
            </div>
        );
    }
}

export default PlayerDisplay;

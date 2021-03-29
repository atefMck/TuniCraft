import React from 'react';

class PlayerStats extends React.Component {
    render() {
        return (
            <div className="PlayerStats">
                <div>
                    <h2>Skills:</h2>
                    <div className="DisplayBox">
                        <div className="FlexRow">
                            <p>Taming: </p><p>1765</p>
                        </div>
                        <div className="FlexRow">
                            <p>Unarmed: </p><p>1298</p>
                        </div>
                        <div className="FlexRow">
                            <p>Archery: </p><p>987</p>
                        </div>
                        <div className="FlexRow">
                            <p>Sword: </p><p>765</p>
                        </div>
                        <div className="FlexRow">
                            <p>Axes: </p><p>390</p>
                        </div>
                        <div className="FlexRow">
                            <p>Fishing: </p><p>154</p>
                        </div>
                        <div className="FlexRow">
                            <p>Acrobatics: </p><p>90</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Minigames:</h2>
                    <div className="DisplayBox">
                        <div className="FlexRow">
                            <p>Bed Wars: </p><p>1765</p>
                        </div>
                        <div className="FlexRow">
                            <p>Building: </p><p>1298</p>
                        </div>
                        <div className="FlexRow">
                            <p>Hunger Games: </p><p>987</p>
                        </div>
                        <div className="FlexRow">
                            <p>Parkour: </p><p>765</p>
                        </div>
                        <div className="FlexRow">
                            <p>Spleef: </p><p>390</p>
                        </div>
                        <div className="FlexRow">
                            <p>TNT Wars: </p><p>154</p>
                        </div>
                        <div className="FlexRow">
                            <p>Ultra Hardcore: </p><p>90</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlayerStats;

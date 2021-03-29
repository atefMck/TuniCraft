import './Settings.css';
import React from 'react';
import SettingForum from './SettingForum';
import SettingSkin from './SettingSkin';
import SettingSecurity from './SettingSecurity';

class Settings extends React.Component {
    render() {
        return (
            <div className="SettingsContainer">
                <header>
                    <h2>Account settings: </h2>
                    <button>Save</button>
                </header>
                <div className="Settings">
                    <SettingSkin />
                    <SettingForum />
                    <SettingSecurity />
                </div>
            </div>
        );
    }
}

export default Settings;

import './Settings.css';
import React from 'react';
import avatar from './lduma.png'

class SettingForum extends React.Component {
    render() {
        return (
            <div className="SettingForum">
                <h3>Forum Settings</h3>
                <div className="AvatarChange">
                    <p>Update forum avatar:</p>
                    <div className="AvatarShowcase">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="UploadInput">
                        <label htmlFor="file-upload" className="FileUpload">
                            Click to upload
                        </label>
                        <input id="file-upload" type="file"/>
                    </div>
                </div>
                <div className="InfoChange">
                    <label>Birthday:</label>
                    <input type="date" />
                    <label>Display Name:</label>
                    <input type="text" />
                </div>
            </div>
        );
    }
}

export default SettingForum;

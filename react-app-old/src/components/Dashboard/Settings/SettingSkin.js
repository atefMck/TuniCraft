import './Settings.css';
import React from 'react';
import avatar from './ldumaskin.png'

class SettingSkin extends React.Component {
    render() {
        return (
            <div className="SettingSkin">
                <h3>Skin Change:</h3>
                <div className="SkinChange">
                    <div className="SkinShowcase">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="UploadInput">
                        <label htmlFor="file-upload" className="FileUpload">
                            Click to upload
                        </label>
                        <input id="file-upload" type="file"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingSkin;

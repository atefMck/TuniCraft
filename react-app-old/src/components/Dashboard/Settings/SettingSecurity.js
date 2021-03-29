import './Settings.css';
import React from 'react';

class SettingSecurity extends React.Component {
    render() {
        return (
            <div className="SettingSecurity">
                <h3>Security Settings</h3>
                <p>Change your password:</p>
                <div className="InfoChange">
                    <label>Old Password:</label>
                    <input type="password" />
                    <label>New Password:</label>
                    <input type="password" />
                    <label>Confirm Password:</label>
                    <input type="password" />
                </div>
                <p>Change your email:</p>
                <div className="InfoChange">
                    <label>New email:</label>
                    <input type="email" />
                    <label>Confirm email:</label>
                    <input type="email" />
                </div>
            </div>
        );
    }
}

export default SettingSecurity;

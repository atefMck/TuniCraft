import React from 'react';
import './index.css';
import { MemberProfile } from 'components/Member';
import {AccountSettings, SecuritySettings, PrivacySettings} from './Forms';

class Settings extends React.Component {
    render() {
        return (
            <div className="settings">
                <MemberProfile user={this.props.user} />
                <ul>
                    <li key={"account_setting_panel"}>
                        <AccountSettings />
                    </li>
                    <li key={"privacy_setting_panel"}>
                        <PrivacySettings />
                    </li>
                    <li key={"security_setting_panel"}>
                        <SecuritySettings />
                    </li>
                </ul>
            </div>
        );
    }
}

export default Settings;
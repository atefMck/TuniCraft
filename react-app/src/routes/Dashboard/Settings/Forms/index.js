import './index.css'
import React from 'react';

class AccountSettings extends React.Component {
  render () {
  return (
    <form className="form_settings">
        <h1>Account settings:</h1>
        <div>
            <p>Change Username:</p>
            <input type="text"></input>
            <button type="submit">Save</button>
        </div>
        <div>
            <p>Change Email:</p>
            <input type="email"></input>
            <button type="submit">Save</button>
        </div>
        <div>
            <p>Change Bio:</p>
            <input type="email"></input>
            <button type="submit">Save</button>
        </div>
        <div>
            <p>Change Phone Number:</p>
            <input type="phone"></input>
            <button type="submit">Save</button>
        </div>
        <div>
            <p>Change Date of birth:</p>
            <input type="date"></input>
            <button type="submit">Save</button>
        </div>
        <span></span>
        <div>
            <p>Change Avatar:</p>
            <input type="file"></input>
            <button type="submit">Save</button>
        </div>
        <div>
            <p>Change Banner:</p>
            <input type="file"></input>
            <button type="submit">Save</button>
        </div>
    </form>
  )}
}

class SecuritySettings extends React.Component {
  render () {
  return (
    <form className="form_settings security_settings">
      <h1>Security settings:</h1>
      <h2>Change password:</h2>
      <div>
          <p>Your existing password:</p>
          <input type="password"></input>
      </div>
      <div>
          <p>New password:</p>
          <input type="password"></input>
      </div>
      <div>
          <p>Confirm new password:</p>
          <input type="password"></input>
      </div>
      <button type="submit">Save</button>
    </form>
  )}
}

class PrivacySettings extends React.Component {
  render () {
  return (
    <form className="form_settings privacy_settings">
      <h1>Privacy settings:</h1>
      <div>
        <p>Privacy options:</p>
        <input type="checkbox"></input>
        <label>Show your online status</label>
      </div>
      <div>
        <p>Email options</p>
        <input type="checkbox"></input>
        <label>Receive news and update emails</label>
      </div>
      <button type="submit">Save</button>
      <span></span>
      <div>
        <p>Allow users to:</p>
        <aside>
          <div>
            <label>View your details on your profile page:</label>
            <select name="profile_privacy" id="profile_privacy">
              <option value="all">All Visitors</option>
              <option value="members">Members Only</option>
              <option value="friends">Friends Only</option>
              <option value="none">Nobody</option>
            </select>
          </div>
          <div>
            <label>Post messages on your profile page:</label>
            <select name="message_privacy" id="message_privacy">
              <option value="all">All Visitors</option>
              <option value="members">Members Only</option>
              <option value="friends">Friends Only</option>
              <option value="none">Nobody</option>
            </select>
          </div>
          <div>
            <label>Receive your news feed:</label>
            <select name="news_privacy" id="news_privacy">
              <option value="all">All Visitors</option>
              <option value="members">Members Only</option>
              <option value="friends">Friends Only</option>
              <option value="none">Nobody</option>
            </select>
          </div>
          <div>
            <label>Start conversations with:</label>
            <select name="conversation_privacy" id="conversation_privacy">
              <option value="all">All Visitors</option>
              <option value="members">Members Only</option>
              <option value="friends">Friends Only</option>
              <option value="none">Nobody</option>
            </select>
          </div>
          <div>
            <label>View your identities:</label>
            <select name="identity_privacy" id="identity_privacy">
              <option value="all">All Visitors</option>
              <option value="members">Members Only</option>
              <option value="friends">Friends Only</option>
              <option value="none">Nobody</option>
            </select>
          </div>
        </aside>
      </div>
      <button type="submit">Save</button>
    </form>
  )}
}

export { AccountSettings, SecuritySettings, PrivacySettings }

    
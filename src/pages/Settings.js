import React, { Component } from 'react';
import Header from '../components/Header';

class Settings extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="settings-title">Settings</h1>
      </div>
    );
  }
}

export default Settings;

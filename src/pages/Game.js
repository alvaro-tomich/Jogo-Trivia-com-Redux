import React, { Component } from 'react';

export default class Game extends Component {
  render() {
    return (
      <div>{ (JSON.stringify((localStorage.getItem('token')))) }</div>
    );
  }
}

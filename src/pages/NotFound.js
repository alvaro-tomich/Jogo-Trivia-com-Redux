import React, { Component } from 'react';
import '../style/notFound.css';

export default class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <h1 className="error">ERROR 404: Meme Not Found</h1>
      </div>
    );
  }
}

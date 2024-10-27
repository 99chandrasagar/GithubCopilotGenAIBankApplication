import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import './Welcome.css'; // Import the CSS file

export default class Welcome extends Component {
  render() {
    return (
      <Jumbotron className="custom-jumbotron">
        <h1>Welcome to Banking</h1>
        <p>
          ABC Net Banking Application
        </p>
      </Jumbotron>
    );
  }
}
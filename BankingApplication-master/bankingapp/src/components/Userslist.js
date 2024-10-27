import React, { Component } from 'react';
import { Card, Table } from 'react-bootstrap';
import axios from 'axios';
import './Userslist.css';

export default class Userslist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8080/users", {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      },
      withCredentials: true,
      crossorigin: true
    })
    .then(response => response.data)
    .then((data) => {
      console.log('Fetched users:', data);
      this.setState({ users: data });
    });
  }

  render() {
    return (
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Body>
          <Table className="custom-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.users.length === 0 ?
                (<tr align="center">
                  <td colSpan="2">No Users Present.</td>
                </tr>) : (
                this.state.users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                  </tr>
                ))
              ) 
              }
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}
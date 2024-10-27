import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // Import the CSS file

export default class NavigationBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
        <Link to={""} className="navbar-brand custom-navbar-brand">
          <img
            alt=""
            src="https://static.vecteezy.com/system/resources/previews/013/948/616/non_2x/bank-icon-logo-design-vector.jpg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Banking Application
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to={"Login"} className="nav-link nav-item-spacing">Login</Link>
            <Link to={"Register"} className="nav-link nav-item-spacing">Register</Link>
            <Link to={"Adduser"} className="nav-link nav-item-spacing">Add User</Link>
            <Link to={"Addaccount"} className="nav-link nav-item-spacing">Add Account</Link>
            <Link to={"Deposit"} className="nav-link nav-item-spacing">Deposit</Link>
            <Link to={"Withdraw"} className="nav-link nav-item-spacing">Withdraw</Link>
            <Link to={"GetLoan"} className="nav-link nav-item-spacing">Get Loan</Link>
            <Link to={"Userslist"} className="nav-link nav-item-spacing">Show Users</Link>
            <Link to={"Accountslist"} className="nav-link nav-item-spacing">Show Accounts</Link>
            <Link to={"Loanslist"} className="nav-link nav-item-spacing">Show Loans</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
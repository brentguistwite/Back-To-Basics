import React from 'react';
import { connect, } from 'react-redux';
import { Link, } from 'react-router-dom';
import './header-bar.css';
import { clearAuth, } from '../actions/auth';
import { clearAuthToken, } from '../local-storage';

export class HeaderBar extends React.Component {
  logOut () {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render () {
    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <a href="#" onClick={() => this.logOut()}>LOG OUT</a>
      );
    }
    else{
      logOutButton = (
        <Link to="/register">SIGN UP</Link>
      );
    }
    return (
      <div className="header-bar">
        <a href="#about">ABOUT</a>
        <a href="#faq">FAQ</a>
        <h1>Front-end learning app</h1>
        <a href="#contact">CONTACT</a>
        {logOutButton}
      </div>
    );
  }
}

const mapStateToProps = state => ({loggedIn: state.auth.currentUser !== null,});

export default connect(mapStateToProps)(HeaderBar);

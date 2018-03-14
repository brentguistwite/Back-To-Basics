import React from 'react';
import { connect, } from 'react-redux';
import Parser from 'html-react-parser';

import requiresLogin from './requires-login';
import { fetchProtectedData, } from '../actions/protected-data';
import './dashboard.css';

export class Dashboard extends React.Component {
  componentDidMount () {
    this.props.dispatch(fetchProtectedData());
  }


  render () {
    if (!this.props.protectedData[0].question_id)
      return (
        <div className="dashboard">
          <div className="dashboard-protected-data">
          </div>
        </div>
      );
    else {
      console.log(this.props.protectedData[8].question_id.content);
      return (
        <div className="dashboard">
          <div className="dashboard-protected-data">
            {this.props.protectedData[8].question_id.content}
          </div>
          <div className="answer-section">
            <textarea />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { currentUser, } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

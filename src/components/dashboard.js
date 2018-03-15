import React from 'react';
import { connect, } from 'react-redux';

import requiresLogin from './requires-login';
import { fetchProtectedData, sendAnswerForValidation } from '../actions/protected-data';
import './dashboard.css';

export class Dashboard extends React.Component {
  componentDidMount () {
    this.props.dispatch(fetchProtectedData());
  }

  handleSubmit (event) {
    event.preventDefault();
    const answer = this.input.value || '';
    this.props.dispatch(sendAnswerForValidation(answer));
  }


  render () {
    const button = (<button>Submit</button >);
    let feedback;
    if (!this.props.protectedData)
      return (
        <div className="dashboard">
          <div className="dashboard-protected-data">
          </div>
        </div>
      );
    else {
      console.log(this.props.protectedData);
      return (
        <div className="dashboard">
          <div className="dashboard-protected-data">
            {this.props.protectedData.question}
          </div>
          <div className="answer-section">
            <form onSubmit={ e => this.handleSubmit(e) } >
              <input ref={(input) => { this.input = input; }}/>
              <br/>
              {button}
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { currentUser, } = state.auth;
  return {
    feedback: state.protectedData.feedback,
    buttonState: state.protectedData.buttonState,
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

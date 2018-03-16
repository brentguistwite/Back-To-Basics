import React from 'react';
import { connect, } from 'react-redux';

import requiresLogin from './requires-login';
import { fetchProtectedData, sendAnswerForValidation, } from '../actions/protected-data';
import './dashboard.css';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  handleSubmit(event) {
    event.preventDefault();
    const answer = this.input.value;
    if (this.props.buttonState === 'Submit') {
      this.props.dispatch(sendAnswerForValidation(answer));
    } else {
      this.props.dispatch(fetchProtectedData());
    }
    this.input.value = '';
    this.input.focus();
  }

  // BREAK THIS SPAGHETTI INTO SEPARATE COMPONENTS
  render() {
    let button;
    if (this.props.buttonState === 'Submit') {
      button = (<button>Submit</button >);
    } else {
      button = (<button>Next</button>);
    }

    let feedback;
    if (this.props.feedback === true) {
      feedback = 'Correct!';
    } else if (this.props.feedback === false) {
      feedback = `Incorrect, the answer is "${this.props.protectedData.answer}"`;
    }
    console.log(feedback);
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
          <div className="feedback">
            {feedback}
          </div>
          <div className="answer-section">
            <form onSubmit={(e) => { this.handleSubmit(e); }} >
              <input ref={(input) => { this.input = input; }} />
              <br />
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

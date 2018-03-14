import React from 'react';
import { connect, } from 'react-redux';

import requiresLogin from './requires-login';
import { fetchProtectedData, } from '../actions/protected-data';
import './dashboard.css';

export class Dashboard extends React.Component {
  componentDidMount () {
    this.props.dispatch(fetchProtectedData());
  }

  handleSubmit (event) {
    event.preventDefault();
    const answer = this.input.value;
    if (this.checkAnswer(answer)) {
      console.log('Correct!');
    }
  }

  checkAnswer (value) {
    return (value.toLowerCase().trim() === this.props.protectedData.question_id.answer);
  }


  render () {
    let button = (<button>Submit</button >);
    let feedback;
    console.log(this.props.protectedData);
    if (!this.props.protectedData.question_id)
      return (
        <div className="dashboard">
          <div className="dashboard-protected-data">
          </div>
        </div>
      );
    else {
      console.log(this.props.protectedData.question_id.content);
      return (
        <div className="dashboard">
          <div className="dashboard-protected-data">
            {this.props.protectedData.question_id.content}
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
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

/*
data(question/answer info)
button
feedback
*/
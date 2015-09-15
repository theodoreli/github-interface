import React from 'react';
import './Issue.scss!';

export default class Issue extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    console.log(this.props)
    var issue = this.props.location.query;
    return (
      <div className="issue-wrapper">
        <div className="title">
          {issue.title}
          <span className="issue-number"> #{issue.number}</span>
        </div>
        <div className="sub-title">
          <span className={"status " + issue.state }>
            {issue.state} 
          </span>
          <span>
            <span className="issue-user-login">{issue.user.login} </span>
            opened this issue · comments  
          </span>

          <div className="comments-wrapper">
          </div>
        </div>
      </div>
    )
  }
}

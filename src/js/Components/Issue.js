import React from 'react';
import reqwest from 'reqwest';
import './Issue.scss!';

export default class Issue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    reqwest({url: `https://api.github.com/repos/npm/npm/issues/${this.props.location.query.number}/comments`})
      .then( (res) => {
        console.log(res);
        this.setState({comments: res});
      });
  }


  render() {
    console.log(this.props)
    console.log(this.state.comments)
    var issue = this.props.location.query;
    var formattedBody = function(body) {
      return body.replace(new RegExp(String.fromCharCode(13), 'g'), <br/>)
    };
    console.log(formattedBody(issue.body))

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
            opened this issue · {this.state.comments.length} comments  
          </span>

          <div className="comments-wrapper">
            <img src={issue.user.avatar_url} />
            <div className="issue-meat">
              <div className="issue-meat-meta">
                <span style={{fontWeight: 400}}>{issue.user.login}</span> commented
              </div>
              <div className="issue-meat-body">
                {issue.body}
              </div>
            </div>

          </div> {/* end: comments-wrapper */ }
        </div>
      </div>
    )
  }
}

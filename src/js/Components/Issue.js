import React from 'react';
import Label from './Label';
import reqwest from 'reqwest';
import './Issue.scss!';
import marked from 'marked';

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
    var issue = this.props.location.query;
    const markDown = src => {
        return marked(src, {sanitize: true})
    };
    const userLinking = src => {
        // http://stackoverflow.com/questions/1234712/javascript-replace-with-reference-to-matched-group
        // http://es5.github.io/#x15.5.4.11 // $& is the matched substring, but we wont use it here unfortunately. nonetheless, cool trick.
        return src.replace(/\s@\w+/g, (a,b) => {
          let trimmed = a.slice(1);
          return '<a href="//github.com/' + trimmed + '" target="_new">' + a + '</a>'
        })
    };
    const formattedBody = function(src) {
        return userLinking( markDown(src) );
    };

    var commentBuilder = function(issue) {
      return (
        <div>
          <img src={issue.user.avatar_url} />
          <div className="issue-meat">
            <div className="issue-meat-meta">
              <span style={{fontWeight: 400}}>{issue.user.login}</span> commented
            </div>
            <div className="issue-meat-body" dangerouslySetInnerHTML={{__html: formattedBody(issue.body)}}>
            </div>
          </div>
        </div>
      )
    };

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
            <Label labels={issue.labels} />
          </span>

          <div className="comments-wrapper">
            { [issue].concat(this.state.comments).map(commentBuilder) }
          </div>
        </div>
      </div>
    )
  }
}

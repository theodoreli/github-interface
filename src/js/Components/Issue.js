import React from 'react';
import reqwest from 'reqwest';
import marked from 'marked';

import Label from './Label';
import './Issue.scss!';

export default class Issue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      issue: [],
      loaded: false
    };
  }

  componentDidMount() {
    let issueNum = this.props.params.number;
    let vals = (async function() {
      return await Promise.all([
        reqwest({
          url: `https://api.github.com/repos/npm/npm/issues/${issueNum}`
        }),
        reqwest({
          url: `https://api.github.com/repos/npm/npm/issues/${issueNum}/comments`
        })
      ]); // return
    })();

    this.setState({
      issue: vals[0],
      comments: vals[1],
      loaded: true // until this is flipped to true, we dont render the good stuff yet
    });
  }


  render() {
    let issue = this.state.issue;
    const markDown = src => {
      return marked(src, {sanitize: true})
    };
    const userLinking = src => {
      // http://stackoverflow.com/questions/1234712/javascript-replace-with-reference-to-matched-group
      // http://es5.github.io/#x15.5.4.11 // $& is the matched substring, but we wont use it here unfortunately. nonetheless, cool trick.
      return src.replace(/@\w+/g, (a,b) => {
        let trimmed = a.slice(1);
        return '<a href="//github.com/' + trimmed + '" target="_new">' + a + '</a>'
      })
    };
    const formattedBody = src => {
      return userLinking(markDown(src));
    };

    /*
     * Mapping function for each element of comments section.
     */
    const commentsMapper = issue => {
      return (
        <div key={issue.id}>
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

    /*
    * Helper function. Only shows when ajax has completed.
    */
    const main = issue => {
      return (
        <div>
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
              {[issue].concat(this.state.comments).map(commentsMapper)}
            </div>
          </div>
        </div>
      )
    }

    //==//==
    //==//==
    //==//==
    // THIS IS REACT CLASSES's render()'s RETURN. THE OUTTER GRAND DADDY
    return (
      <div className="issue-wrapper">
        {this.state.loaded ? main(this.state.issue) : <div>loading...</div>}
      </div>
    )
  }
}

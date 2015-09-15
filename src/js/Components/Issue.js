import React from 'react';
//import './Header.scss!';

export default class Issue extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="issue-wrapper">
        <img src="src/img/octocat.png" />
        npm issues
      </div>
    )
  }
}

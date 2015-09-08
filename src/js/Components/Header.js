import React from 'react';
import './Header.scss!';

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="header-wrapper">
        <img src="src/img/octocat.png" />
        npm issues
      </div>
    )
  }
}

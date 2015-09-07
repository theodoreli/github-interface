import React from 'react';
import { Router, Route, Link } from 'react-router';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }
  _incCount() {
    this.setState({count: this.state.count + 1});
  }
  render() {
    return (
      <div onClick={this._incCount.bind(this)} >
        Clicks hi reload {this.state.count}
      </div>
    );
  }
}

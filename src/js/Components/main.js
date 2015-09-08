import React from 'react';
import { Router, Route, Link } from 'react-router';
import Actions from '../Actions/Actions';
import Store from '../Stores/stores';
import Pagination from './Pagination';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  componentDidMount() {
    console.log('did mount');
  }

  _incCount() {
    this.setState({count: this.state.count + 1});
  }
        
  render() {
    return (
      <div>
        <Pagination />
        <div onClick={this._incCount.bind(this)} >
          Clicks hi reload {this.state.count}
        </div>
      </div>
    );
  }
}

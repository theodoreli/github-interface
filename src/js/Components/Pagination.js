import React from 'react';
import { Router, Route, Link } from 'react-router';
import Actions from '../Actions/Actions';
import Store from '../Stores/stores';
import './Pagination.scss!';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props)
  }

  _pageToGo(num) {
    console.log('_pageToGo clicked');
    console.log(num)
    Actions.getPage({toGetPage: num});
  }

  render() {
    var number = function(item) {
      console.log(item);
      return (
        <div key={item.id} className="pag-item" onClick={this._pageToGo.bind(this, item)}>
          {item}
        </div>
      )
    }.bind(this);

    return (
      <div className="pag-wrapper">
        <div className="pag">
          {Array.from(Array(10).keys()).slice(1).map(number)}
        </div>
      </div>
    )
  }
}

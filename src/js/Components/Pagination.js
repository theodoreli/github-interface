import React from 'react';
import { Router, Route, Link } from 'react-router';

import Actions from '../Actions/Actions';
import Store from '../Stores/stores';
import './Pagination.scss!';


export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLink: Store.getState().pageLink,
      currentPage: Store.getState().toGetPage
    };

    // We need the following as there is no auto binding for 'this' in React
    // for non "built-in" React methods.
    // https://medium.com/@goatslacker/react-0-13-x-and-autobinding-b4906189425d
    this._onStoreChange = this._onStoreChange.bind(this);
  }


  componentDidMount() {
    Store.listen(this._onStoreChange)
  }


  componentWillUnmount() {
    Store.unlisten(this._onStoreChange)
  }


  _pageToGo(num) {
    Actions.getPage({toGetPage: num});
  }


  _onStoreChange() {
    this.setState({
      pageLink: Store.getState().pageLink,
      currentPage: Store.getState().toGetPage
    });
  }


  render() {
    const number = item => {
      let underline = (item === this.state.currentPage) ? {textDecoration: 'underline'}: {};
      return (
        <div style={underline} key={item.id} className="pag-item" onClick={this._pageToGo.bind(this, item)}>
          {item}
        </div>
      )
    };

    let pagCount = this.state.pageLink.last - this.state.pageLink.first + 1;

    return (
      <div className="pag-wrapper">
        <div className="pag">
          {Array.from(Array(pagCount).keys())
              .slice(1).map(number)}
        </div>
      </div>
    )
  }
}

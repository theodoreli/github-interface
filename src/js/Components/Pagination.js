import React from 'react';
import { Router, Route, Link } from 'react-router';
import Actions from '../Actions/Actions';
import Store from '../Stores/stores';
import './Pagination.scss!';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageLink: Store.getState().pageLink
    };

    // we need the below as there is no auto beinding for 'this' in React for non React methods
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
    console.log('_pageToGo clicked');
    console.log(num)
    Actions.getPage({toGetPage: num});
  }

  _onStoreChange() {
    console.log('pagination - onStoreChange');
    this.setState({
      pageLink: Store.getState().pageLink
    });
    console.log(this.state.pageLink);
  }

  render() {
    // pagination rules: always show first and last. also always show five left and five right of current number. the rest can be filled with ellipsis
    const number = function(item) {
      console.log(item);
      return (
        <div key={item.id} className="pag-item" onClick={this._pageToGo.bind(this, item)}>
          {item}
        </div>
      )
    }.bind(this);

    let pagCount = this.state.pageLink.last - this.state.pageLink.first + 1;

    return (
      <div className="pag-wrapper">
        <div className="pag">
          {Array.from(Array(pagCount).keys()).slice(1).map(number)}
        </div>
      </div>
    )
  }
}

import React from 'react';
import { Router, Route, Link } from 'react-router';
import Actions from '../Actions/Actions';
import Store from '../Stores/stores';
import './Table.scss!';

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    console.log(Store.getState())
    this.state = {
      currentPage: 1,
      issues: Store.getState().pageContents
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

  _onStoreChange() {
    console.log('_onStoreChange()');
    this.setState({
      currentPage : Store.getState().toGetPage,
      issues: Store.getState().pageContents
    }); // not working currently.

    // then use this as a key from stores to look for issue data;
  }

  _getStoreState() {
    console.log(Store.getState());
  }

  render() {
    console.log(this.state);
    var dataArray = this.state.issues[this.state.currentPage] || [];

    /*
    var tweetify = function(src, length) {
      if (typeof src !== 'string') {return}
      let segment = src.slice(0,length)
      if (segment.slice(-1) === ' ') {
        return segment 
      }
      console.log(length);

      return tweetify(src, length + 1)
    };
   */
    
    var tweetify = function(src, length) {
      if (src.length <= length) { return src }

      for (let i=0; i < src.length; i++) {
        console.log(src[length + i])
        if (src[length + i] === ' ') {
          return src.slice(0, length + i)
        } 
      }
    }
        

    var createRow = function(data) {
      return (
        <div className="data-row">
          <div className="avatar-wrapper">
            <img src={data.user.avatar_url} />  
          </div>
          <div className="meat">
            <div className="title">{ data.title }</div>
            <div className="tweet">{ tweetify(data.body, 140) }</div>
            <div className="meta">#{ data.number } opened by {data.user.login}</div> 
          </div>
        </div>
      )
    };

    return (
      <div onClick={this._getStoreState.bind(this)}>
        {dataArray.map(createRow)}
      </div>
    )
  }
}

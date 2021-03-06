import React from 'react';
import { Router, Route, Link } from 'react-router';
import removeMarkdown from 'remove-markdown';

import Label from './Label';
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

    // Getting the first page is the default behavior.
    Actions.getPage({toGetPage: 1});
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
  }


  render() {
    let dataArray = this.state.issues[this.state.currentPage] || [];
    const stripDown = src => {return removeMarkdown(src)};

    // recursive function. snips closest to length specified as long as last char is a empty string or return carriage
    const tweetify = (src, length) => {
      if (src.length <= length) { return src }

      for (let i=0; i < src.length; i++) {
        // look for spaces or return carriages (that we get from Markdown)
        if (src[length + i] === ' ' || src[length + i] === String.fromCharCode(13)) {
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
            <div className="table-issue-title">
              <Link to={'/issue/' + data.number} > { data.title } </Link>
            </div>
            <div className="meta">
              @{data.user.login} issue #{ data.number }
              <Label labels={data.labels}/>
            </div>
            <div className="tweet">
              { tweetify( stripDown(data.body) , 140) }
            </div>
          </div>
        </div>
      )
    };

    return (
      <div className="tweet-table">
        {dataArray.map(createRow)}
      </div>
    )
  }
}


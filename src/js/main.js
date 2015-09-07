import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { default as HashHistory} from 'react-router/lib/HashHistory';

//export let __hotReload = true; // doesnt work as of now

export class Main extends React.Component {
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


// https://www.npmjs.com/package/react-router
// https://github.com/rackt/react-router/pull/1323

ReactDom.render((
  <Router history={new HashHistory} >
    <Route path="/" component={Main}>
      {/* Add the route, nested where we want the UI to nest */}
    </Route>
  </Router>
), document.getElementById('main'));

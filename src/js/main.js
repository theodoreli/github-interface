import React from 'react';
import { Router, Route, Link } from 'react-router';
import { default as HashHistory} from 'react-router/lib/HashHistory';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {count: props.initialCount};
  }
  render() {
    return (
      <div>
        Clicks
      </div>
    );
  }
}


// https://www.npmjs.com/package/react-router
// https://github.com/rackt/react-router/pull/1323

React.render((
  <Router history={new HashHistory} >
    <Route path="/" component={Main}>
      {/* Add the route, nested where we want the UI to nest */}
    </Route>
  </Router>
), document.getElementById('main'));

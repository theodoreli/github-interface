import React from 'react';
//import ReactDom from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
//import { default as HashHistory} from 'react-router/lib/HashHistory'; // needed in 1.0.0-beta3
import Header from 'src/js/Components/Header';
import Main from 'src/js/Components/main';
import Issue from 'src/js/Components/Issue';

//export let __hotReload = true; // doesnt work as of now

// https://www.npmjs.com/package/react-router
// https://github.com/rackt/react-router/pull/1323
// ^^ For 1.0.0-beta3 we need to set the history. RC1 looks like it doesnt

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

React.render((
  <Router >
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="main" component={Main} />
      <Route path="issue/:number" component={Issue} />
    </Route>
  </Router>
), document.getElementById('entry'));

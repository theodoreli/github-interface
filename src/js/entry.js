import React from 'react';
//import ReactDom from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { default as HashHistory} from 'react-router/lib/HashHistory';
import Main from 'src/js/Components/main';

//export let __hotReload = true; // doesnt work as of now

// https://www.npmjs.com/package/react-router
// https://github.com/rackt/react-router/pull/1323

React.render((
  <Router history={new HashHistory} >
    <Route path="/" component={Main}>
      {/* Add the route, nested where we want the UI to nest */}
    </Route>
  </Router>
), document.getElementById('entry'));

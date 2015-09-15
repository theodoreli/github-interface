import React from 'react';
import { Router, Route, Link } from 'react-router';
import Actions from '../Actions/Actions';
import Store from '../Stores/stores';
import Pagination from './Pagination';
import Header from './Header';
import Table from './Table';
import './Main.scss!';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

        
  render() {
    return (
      <div>
        <Table />
        <Pagination />
      </div>
    );
  }
}

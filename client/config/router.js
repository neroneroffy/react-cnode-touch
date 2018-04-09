import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TopList from '../views/topic-list/index';
import TopDetail from '../views/topic-detail/index';

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="first" />,
  <Route path="/list" component={TopList} exact key="list" />,
  <Route path="/detail" component={TopDetail} key="detail" />,
]

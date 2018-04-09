import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { AppState } from '../../store/app-state';

@inject('appState') @observer
class TopList extends Component {
  static propTypes = {
    appState: PropTypes.instanceOf(AppState).isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {}
    this.changeName = this.changeName.bind(this)
  }

  changeName(e) {
    this.props.appState.changeName(e.target.value)
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <span>{this.props.appState.msg}</span>
      </div>
    )
  }
}

export default TopList

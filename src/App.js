import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired
  };

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes } = this.props;

    return (
      <div style={{ height: '100%' }}>
        <Router history={browserHistory} routes={routes} />
      </div>
    )
  }
}

export default AppContainer

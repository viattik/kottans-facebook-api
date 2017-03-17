import React, { PropTypes as toBe } from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export default class Header extends React.Component {
  static propTypes = {};

  render () {
    const { me } = this.props;
    return (
      <div>
        <h1>Facebook Sample App</h1>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li>
                <IndexLink to='/' activeClassName='route--active'>
                  Home
                </IndexLink>
              </li>
              <li>
                <Link to='/friends' activeClassName='active'>
                  Friends
                </Link>
              </li>
            </ul>
            <div className="navbar-header navbar-right">
              <div className="navbar-brand">
                <img
                  src={`https://graph.facebook.com/${me.id}/picture`}
                />
                <span>{ me.name }</span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

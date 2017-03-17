import React, { PropTypes as toBe } from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export default class Header extends React.Component {
  static propTypes = {};

  render () {
    return (
      <div>
        <h1>Facebook Sample App</h1>
        <IndexLink to='/' activeClassName='route--active'>
          Home
        </IndexLink>
        &nbsp;•&nbsp;
        <Link to='/friends' activeClassName='active'>
          Friends
        </Link>
      </div>
    )
  }
}

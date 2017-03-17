import React, { PropTypes as toBe } from 'react'
import Header from 'components/Header/Header'
import './CoreLayout.scss'
import 'styles/core.scss'
import fb from 'utils/fb';

export class CoreLayout extends React.Component {
  static propTypes = {
    children : toBe.element.isRequired
  };

  constructor() {
    super();
    this.state = {
      loggedIn: false,
      isLoading: true,
      update: 0,
    };
    fb.setUpdateFn(this.triggerUpdate);
    fb.updateLoginStatus(() => {
      this.setState({ isLoading: false });
    });
  }

  login = () => {
    fb.login();
  };

  triggerUpdate = () => {
    this.setState({ update: +new Date });
  };

  renderLoggedIn() {
    const { children } = this.props;
    return (
      <div>
        <Header me={fb.me} />
        <div className='core-layout__viewport'>
          {children}
        </div>
      </div>
    );
  }

  renderNotLoggedIn() {
    return (
      <div>
        <h1>Facebook Sample App</h1>
        <button className="login-button" onClick={this.login}>
          Login with Facebook
        </button>
      </div>
    );
  }

  render () {
    const { isLoading } = this.state;
    const loggedIn = fb.isLoggedIn();
    return (
      <div className='container text-center'>
        { isLoading && 'Loading...' }
        { !isLoading && (loggedIn ? this.renderLoggedIn() : this.renderNotLoggedIn()) }
      </div>
    );
  }
}

export default CoreLayout

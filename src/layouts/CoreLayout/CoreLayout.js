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
    };
    fb.updateLoginStatus(() => {
      this.setState({ loggedIn: fb.isLoggedIn(), isLoading: false });
    });
  }

  login = () => {
    fb.login(() => {
      this.setState({ loggedIn: fb.isLoggedIn() });
    });
  };

  renderLoggedIn() {
    const { children } = this.props;
    return (
      <div>
        <Header />
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
    const { loggedIn, isLoading } = this.state;
    return (
      <div className='container text-center'>
        { isLoading && 'Loading...' }
        { !isLoading && (loggedIn ? this.renderLoggedIn() : this.renderNotLoggedIn()) }
      </div>
    );
  }
}

export default CoreLayout

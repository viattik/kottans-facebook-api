import React, { PropTypes as toBe } from 'react'
import './share.scss'

export default class Share extends React.Component {

  share = () => {
    const { fb } = this.props;
    fb.share();
  };

  send = () => {
    const { fb } = this.props;
    fb.send();
  };

  render () {
    return (
      <div>
        <h3>Share</h3>
        <button className="btn btn-primary" onClick={this.share}>Share Kottans</button>
        <br />
        <br />
        <button className="btn btn-primary" onClick={this.send}>Send a message with calendar</button>
      </div>
    )
  }
}




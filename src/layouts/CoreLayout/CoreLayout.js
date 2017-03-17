import React, { PropTypes as toBe } from 'react'
import Header from 'components/Header/Header'
import './CoreLayout.scss'
import 'styles/core.scss'

export class CoreLayout extends React.Component {
  static propTypes = {
    children : toBe.element.isRequired
  };

  render () {
    const { children } = this.props;
    return (
      <div className='container text-center'>
        <Header />
        <div className='core-layout__viewport'>
          {children}
        </div>
      </div>
    )
  }
}

export default CoreLayout

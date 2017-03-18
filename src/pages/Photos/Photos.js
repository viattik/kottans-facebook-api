import React, { PropTypes as toBe } from 'react'
import { PERMISSIONS } from 'constants/facebook';
import './photos.scss'

export default class Photos extends React.Component {
  constructor() {
    super();
    this.state = {
      friendsFetched: false,
    }
  }

  componentDidMount() {
    this.fetchPhotos();
  }

  componentWillReceiveProps() {
    this.fetchPhotos();
  }

  fetchPhotos() {
    const { fb } = this.props;
    const { photosFetched } = this.state;
    if (this.hasPhotosPermission() && !photosFetched) {
      fb.fetchPhotos();
      this.setState({ photosFetched: true });
    }
  }
  fetchNextPhotos = () => {
    const { fb } = this.props;
    fb.fetchNextPhotos();
  };

  login = () => {
    const { fb } = this.props;
    fb.login([PERMISSIONS.USER_PHOTOS]);
  };

  hasPhotosPermission() {
    const { fb } = this.props;
    return fb.hasPermission(PERMISSIONS.USER_PHOTOS);
  }

  renderPhoto(photo) {
    return (
      <li key={photo.id}>
        <a href={photo.link} target="_blank">
          <img src={photo.picture}/>
        </a>
      </li>
    )
  }
  renderPhotos() {
    const { fb: { photos } } = this.props;
    return (
      <div>
        <ul className="photos">
          { photos.map(this.renderPhoto) }
        </ul>
        <button className="btn" onClick={this.fetchNextPhotos}>Load more</button>
      </div>
    );
  }
  renderPermissionRequest() {
    return (
      <div>
        To see the list of photos you have to
        &nbsp;
        <button className="btn login-button" onClick={this.login}>
          grant access to your photos.
        </button>
      </div>
    );
  }
  render () {
    return (
      <div>
        <h3>Photos</h3>
        { this.hasPhotosPermission() ? this.renderPhotos() : this.renderPermissionRequest() }
      </div>
    )
  }
}




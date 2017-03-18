import {
  LOGIN_STATUSES,
  GRANTED_PERMISSION,
  DECLINED_PERMISSION,
} from 'constants/facebook';

class Facebook {
  appId = null;
  authResponse = null;
  me = {};
  permissions = {};
  updateFn = () => {};
  photos = [];
  nextPhotos = null;

  init({ appId }, cb) {
    this.appId = appId;
    this.registerAsyncInit(cb);
    this.insertScript();
  }
  registerAsyncInit(cb) {
    window.fbAsyncInit = () => {
      FB.init({
        appId: this.appId,
        cookie: true,
        xfbml: true,
        version: 'v2.8'
      });
      FB.AppEvents.logPageView();
      cb();
    }
  }
  insertScript() {
    let js, fjs = document.getElementsByTagName('script')[0];
    if (document.getElementById('facebook-jssdk')) {
      return;
    }
    js = document.createElement('script');
    js['facebook-jssdk'] = 'facebook-jssdk';
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }
  setUpdateFn(fn) {
    this.updateFn = fn;
  }

  isLoggedIn() {
    return !!this.authResponse;
  }
  updateLoginStatus(cb) {
    FB.getLoginStatus((response) => {
      console.log('Current login status is', response);
      this.processLoginResponse(response);
      cb();
    });
  }
  login(permissions = []) {
    const isReRequesting = permissions
      .some((item) => this.permissions[item] === DECLINED_PERMISSION);
    FB.login((response) => {
      console.log('User respond:', response);
      this.processLoginResponse(response);
    }, {
      scope: permissions.join(','),
      ...(isReRequesting ? { auth_type: 'rerequest' } : {})
    });
  }
  processLoginResponse(response) {
    if (response.status === LOGIN_STATUSES.CONNECTED) {
      this.authResponse = response.authResponse;
      this.updateMe();
      this.updatePermissions();
    }
    this.updateFn();
  }

  updateMe() {
    FB.api('/me', (response) => {
      this.me = response;
      this.updateFn();
    })
  }
  hasPermission(permission) {
    return this.permissions[permission] === GRANTED_PERMISSION;
  }
  updatePermissions() {
    FB.api('/me/permissions', (response) => {
      this.permissions = response.data.reduce((acc, item) => ({
        ...acc,
        [item.permission]: item.status,
      }), {});
      this.updateFn();
    })
  }

  fetchPhotos() {
    FB.api('me/photos?fields=picture,link', (response) => {
      this.photos = response.data;
      this.nextPhotos = response.paging.next;
      this.updateFn();
    });
  }
  fetchNextPhotos() {
    FB.api(this.nextPhotos, (response) => {
      this.photos = [
        ...this.photos,
        ...response.data,
      ];
      this.nextPhotos = response.paging.next;
      this.updateFn();
    })
  }
}

export default new Facebook;

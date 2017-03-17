const LOGIN_STATUSES = {
  CONNECTED: 'connected',
  NOT_AUTHORIZED: 'not_authorized',
  UNKNOWN: 'unknown',
};

class Facebook {
  appId = null;
  authResponse = null;

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

  isLoggedIn() {
    return !!this.authResponse;
  }
  updateLoginStatus(cb) {
    FB.getLoginStatus((response) => {
      console.log('Current login status is', response);
      if (response.status === LOGIN_STATUSES.CONNECTED) {
        this.authResponse = response.authResponse;
      }
      cb();
    });
  }
  login(cb) {
    FB.login((response) => {
      console.log('User respond:', response);
      if (response.status === LOGIN_STATUSES.CONNECTED) {
        this.authResponse = response.authResponse;
      }
      cb();
    });
  }

}

export default new Facebook;

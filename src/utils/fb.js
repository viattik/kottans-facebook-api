class Facebook {
  appId = null;

  init({ appId }) {
    this.appId = appId;
    this.registerAsyncInit();
    this.insertScript();
  }

  registerAsyncInit() {
    window.fbAsyncInit = () => {
      FB.init({
        appId: this.appId,
        cookie: true,
        xfbml: true,
        version: 'v2.8'
      });
      FB.AppEvents.logPageView();
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
}

export default new Facebook;

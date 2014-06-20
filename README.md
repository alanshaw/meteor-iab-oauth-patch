# iab-oauth-patch

Meteor's OAuth flow currently only works with popups. PhoneGap does not handle this very well. Using the InAppBrowser plugin we can load the OAuth popup into this child browser.

The patch listens for the pagestop event and analyzes the uri to determine what action to take (if any). This includes manually closing the InAppBrowser to satisfy Meteor's checks.

Adapted from [meteor-phonegap-oauth](https://github.com/AdamBrodzinski/meteor-phonegap-oauth) to work with Meteor 0.8.1.3.

## Usage

Install package:

```sh
mrt add https://github.com/alanshaw/meteor-iab-oauth-patch
```

**After** cordova has loaded the InAppBrowser plugin, patch `window.open` by calling:  

```js
window.iabOAuthPatchWindowOpen()
```
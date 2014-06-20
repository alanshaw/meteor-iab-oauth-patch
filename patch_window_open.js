var patched = false

window.iabOAuthPatchWindowOpen = function () {
	if (patched) return console.log("IAB OAuth patch already applied")

	patched = true

	// Keep a reference to the in app browser's window.open.
	var openWin = window.open

	window.open = function (url) {
		var win = openWin.apply(window, arguments)

		win.addEventListener("loadstop", checkIfOauthIsDone)
		win.addEventListener("exit", close)

		// check if uri contains an error or code param, then manually close popup
		function checkIfOauthIsDone (event) {
			// if this is the oauth prompt url, we are not done
			if (url === event.url) return

			if (!event.url || !event.url.match(/close|error|code=/)) return

			if (event.url.indexOf("credentialToken") > -1) {
				// Get the credentialToken and credentialSecret from the InAppBrowser"s url hash.
				var hashes = event.url.slice(event.url.indexOf("#") + 1).split("&")
				var credentialToken = hashes[0].split("=")[1]

				if (event.url.indexOf("credentialSecret") > -1) {
					var credentialSecret = hashes[1].split("=")[1]
					OAuth._handleCredentialSecret(credentialToken, credentialSecret)
				}

				Accounts.oauth.tryLoginAfterPopupClosed(credentialToken)
			}

			close()
		}

		function close() {
			win.removeEventListener("loadstop", checkIfOauthIsDone)
			win.removeEventListener("exit", close)
			win.close()
		}

		return win
	}
}

Package.describe({
	summary: "A fix for Meteor OAuth with InAppBrowser"
})

Package.on_use(function (api) {
	api.use(["logging", "oauth"], "server")
	api.use(["oauth", "accounts-oauth"], "client")
	api.add_files("patch_window_open.js", "client")
	api.add_files("patch_render_oauth_response.js", "server")
})
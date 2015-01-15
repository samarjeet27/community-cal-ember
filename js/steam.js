$.ajaxSetup({
	async:false,
});

function Steam(App) {
	App.Steam = Ember.Object.extend({
		get: function(req, callback) {
			var request = Ember.$.getJSON('http://dev-back1.techgrind.asia/scripts/rest.pike?request='+req);
			request.then(callback)
		},
	});
}

Steam.create=function(App){
	var s = new Steam(App);
	return App.Steam.create();
}
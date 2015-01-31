$.ajaxSetup({
	async: false,
});

if( BLUGCalendarApp == null ){
	var BLUGCalendarApp = Ember.Application.create();
}

BLUGCalendarApp.steam = Ember.Object.create({
	get: function(req, callback) {
		var req = Ember.$.getJSON('http://dev-back1.techgrind.asia/scripts/rest.pike?request='+req);
		// callback function
		req.then(callback);
	}
});

$.ajaxSetup({
	async: true,
})
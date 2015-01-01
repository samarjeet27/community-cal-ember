function Steam(App) {
	App.Steam = Ember.Object.extend({
		get: function(req, callback, error) {
			var uri = 'http://dev-back1.techgrind.asia/scripts/rest.pike?request=' + req;
			var xhr = $.ajax({
				url: uri,
				dataType: 'json',
				data: '',
				contentType: 'application/json; charset=utf-8',
				type: 'GET',
				async: false,
				success: function(data) {
					callback(data['event-list']);
				}
			});

			if (xhr.status != 200) { // error
				if (typeof(error) == 'undefined')
					error = console.log;
				error({
					errorCode: xhr.status,
					errorMessage: xhr.statusText
				});
			}
		}
	});
}

Steam.create=function(App){
	var s = new Steam(App); 
	return App.Steam.create();
}
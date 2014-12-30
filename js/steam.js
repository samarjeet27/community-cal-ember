function steam() {
	var restApi = 'http://dev-back1.techgrind.asia/scripts/rest.pike?request=';
	return {
		get:function(request, callback){
			var req = new XMLHttpRequest();
			req.open('GET', restApi+request, false);
			req.send();
			callback(JSON.parse(req.responseText));
		}
	}
}
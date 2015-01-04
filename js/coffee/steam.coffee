Steam = (App) ->
  App.Steam = Ember.Object.extend(get: (req, callback) ->
    request = Ember.$.getJSON("http://dev-back1.techgrind.asia/scripts/rest.pike?request=" + req)
    request.then callback
    return
  )
  return
$.ajaxSetup async: false
Steam.create = (App) ->
  s = new Steam(App)
  App.Steam.create()
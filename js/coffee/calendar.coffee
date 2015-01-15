# create ember-app instance
BLUGCalendarApp = Ember.Application.create()

# events
_events = []

# Formatting helpers
(->
  helpers = [
    {
      name: "date"
      date: (unix) ->
        date = new Date(unix * 1000)
        date.toDateString()
    }
    {
      name: "day"
      day: (unix) ->
        date = new Date(unix * 1000)
        date.getDate()
    }
    {
      name: "month"
      month: (unix) ->
        date = new Date(unix * 1000)
        [
          "Jan"
          "Feb"
          "Mar"
          "Apr"
          "May"
          "Jun"
          "Jul"
          "Aug"
          "Sep"
          "Oct"
          "Nov"
          "Dec"
        ][date.getMonth()]
    }
    {
      name: "year"
      year: (unix) ->
        date = new Date(unix * 1000)
        date.getFullYear()
    }
    {
      name: "time"
      time: (unix) ->
        date = new Date(unix * 1000)
        date.getTime()
    }
    {
      name: "log"
      log: (x) ->
        console.log x
        return
    }
  ]
  i = 0

  while i < helpers.length
    helper = helpers[i]
    Ember.Handlebars.helper helper.name, helper[helper.name]
    i++
  
  # used handlebars as it works differently
  Handlebars.registerHelper "link", (id) ->
    id = Handlebars.Utils.escapeExpression(id)
    template = "#/communitycal/"
    
    # don't need the ending tag (safe escape)
    result = "<a href=\"" + template + id + "\">"
    new Handlebars.SafeString(result)

  return
)()

# initialise tabs
BLUGCalendarApp.CommunityCalendarComponent = Ember.Component.extend(didInsertElement: ->
  Ember.run.next ->
    $("#tab-container").easytabs animate: false
    return

  return
)

# get list of events
steam = Steam.create(BLUGCalendarApp)
steam.get "techgrind.events/order-by-date", (data) ->
  _events = data["event-list"]
  return

BLUGCalendarApp.ApplicationRoute = Ember.Route.extend(model: ->
  cevents: _events
)
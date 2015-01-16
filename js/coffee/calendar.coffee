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

# compile the template
Ember.TEMPLATES["community-calendar"] = Ember.Handlebars.compile("<div class=\"community-calendar\"    <div id=\"tab-container\" class=\"tab-container\">    <div class=\"tab-pane community-calendar\" id=\"list\">      <ul class=\"event-list\">          {{#each event in events}}          <li class=\"cc-event\">            <a href=\"\">              <div class=\"cc-event-date\">                <div class=\"cc-event-day\">{{day event.date}}</div>                <div class=\"cc-event-month\">{{month event.date}}</div>                <div class=\"cc-event-year\">{{year event.date}}</div>                <div class=\"cc-event-time\">{{time event.date}}</div>              </div>              <div class=\"cc-event-title\">{{event.title}}</div>              <div class=\"cc-event-location\">{{event.address}}</div>            </a>          </li>          {{/each}}      </ul>    </div>    <div class=\"tab-pane\" id=\"cal\">      <h3>cal</h3>    </div>    <div class=\"tab-pane\" id=\"add\">      <h3>add</h3>    </div>    <ul class=\"tabrow\">      <li class=\"active\"><a href=\"#list\">list</a></li>      <li><a href=\"#cal\">cal</a></li>      <li><a href=\"#add\">add</a></li>    </ul>  </div> </div>")

# initialise tabs
BLUGCalendarApp.CommunityCalendarComponent = Ember.Component.extend(
  templateName: "community-calendar"
  didInsertElement: ->
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
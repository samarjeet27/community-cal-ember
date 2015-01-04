# create ember-app instance

# list of events
handlebars_extend = ->
  
  # handlebar helpers
  helpers = [
    {
      name: "date"
      date: (unix) ->
        date = undefined
        date = new Date(unix * 1000)
        date.toDateString()
    }
    {
      name: "day"
      day: (unix) ->
        date = undefined
        date = new Date(unix * 1000)
        date.getDate()
    }
    {
      name: "month"
      month: (unix) ->
        date = undefined
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
        date = undefined
        date = new Date(unix * 1000)
        date.getFullYear()
    }
    {
      name: "time"
      time: (unix) ->
        date = undefined
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
    result = "<a href=\"#/communitycal/" + id + "\">"
    new Handlebars.SafeString(result)

  return
App = Ember.Application.create(rootElement: ".community-calendar")
_events = []
handlebars_extend()
App.IndexRoute = Ember.Route.extend(redirect: ->
  @transitionTo "dashboard"
  return
)
App.Router.map ->
  @route "dashboard"
  return

App.DashboardRoute = Ember.Route.extend(
  events:
    selectTab: (name) ->
      @controllerFor("dashboard").set "activeTab", name
      @render name,
        into: "dashboard"
        outlet: "tab"

      return

  setupController: (controller) ->
    controller.set "activeTab", "list"
    return

  renderTemplate: ->
    @render()
    @render "list",
      outlet: "tab"
      into: "dashboard"

    return
)
App.DashboardView = Ember.View.extend(
  activeTab: Ember.computed.alias("controller.activeTab")
  activeTabDidChange: (->
    @setActiveTab()  if @state is "inDOM"
    return
  ).observes("activeTab")
  didInsertElement: ->
    @setActiveTab()
    return

  setActiveTab: ->
    $(".active").removeClass "active"
    activeTab = @get("activeTab")
    @$("a[data-tab='%@']".fmt(activeTab)).parent().addClass "active"
    return
)
steam = Steam.create(App)
steam.get "techgrind.events/order-by-date", (data) ->
  App.obj = Ember.Object.create(events: data["event-list"])
  templates = [
    {
      name: "list"
      list: "\t      <div class=\"tab-pane\">\t        <ul class=\"event-list\">\t          {{#with App.obj}}\t          {{#each event in events}}\t          <li class=\"cc-event\">\t            <a href=\"\">\t              <div class=\"cc-event-date\">\t                <div class=\"cc-event-day\">{{day event.date}}</div>\t                <div class=\"cc-event-month\">{{month event.date}}</div>\t                <div class=\"cc-event-year\">{{year event.date}}</div>\t                <div class=\"cc-event-time\">{{time event.date}}</div>\t              </div>\t              <div class=\"cc-event-title\">{{event.title}}</div>\t              <div class=\"cc-event-location\">{{event.address}}</div>\t            </a>\t          </li>\t          {{/each}}\t          {{/with}}\t        </ul>\t      </div>"
    }
    {
      name: "cal"
      cal: " <div class=\"tab-pane\">calendar</div>"
    }
    {
      name: "add"
      add: "<div class=\"tab-pane\">add events</div>"
    }
    {
      name: "dashboard"
      dashboard: "{{outlet tab}}    <ul class=\"tabrow\">      <li><a href=\"#\" data-tab=\"list\" {{action selectTab \"list\"}}>list</a></li>      <li><a href=\"#\" data-tab=\"cal\" {{action selectTab \"cal\"}}>cal</a></li>      <li><a href=\"#\" data-tab=\"add\" {{action selectTab \"add\"}}>add</a></li>    </ul>"
    }
  ]
  i = 0

  while i < templates.length
    $(".community-calendar").append "<script type=\"text/x-handlebars\" data-template-name=\"" + templates[i].name + "\">" + templates[i][templates[i].name] + "</script>"
    i++
  return

// create ember-app instance
var BLUGCalendarApp = Ember.Application.create();
// events
var _events = [];

// Formatting helpers
(function () {
    var helpers = [{
        name: 'date',
        date: function(unix) {
            var date = new Date(unix * 1000);
            return date.toDateString();
        }
    }, {
        name: 'day',
        day: function(unix) {
            var date = new Date(unix * 1000);
            return date.getDate();
        },
    }, {
        name: 'month',
        month: function(unix) {
            var date = new Date(unix * 1000);
            return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
        },
    }, {
        name: 'year',
        year: function(unix) {
            var date = new Date(unix * 1000);
            return date.getFullYear();
        },
    }, {
        name: 'time',
        time: function(unix) {
            var date = new Date(unix * 1000);
            return date.getTime();
        }
    }, {
        name: 'log',
        log: function(x) {
            console.log(x);
        }
    }];


    for (var i = 0; i < helpers.length; i++) {
        var helper = helpers[i];
        Ember.Handlebars.helper(helper.name, helper[helper.name]);
    }

    // used handlebars as it works differently
    Handlebars.registerHelper('link', function(id) {
        id = Handlebars.Utils.escapeExpression(id);
        template = '#/communitycal/';
        // don't need the ending tag (safe escape)
        var result = '<a href="'+ template + id + '">';

        return new Handlebars.SafeString(result);
    });

}) ();

// compile the template
Ember.TEMPLATES['community-calendar'] = Ember.Handlebars.compile('\
    <div class="community-calendar">\
    <div id="tab-container" class="tab-container">\
    <div class="tab-pane community-calendar" id="list">\
      <ul class="event-list">\
          {{#each event in events}}\
          <li class="cc-event">\
            <a href="">\
              <div class="cc-event-date">\
                <div class="cc-event-day">{{day event.date}}</div>\
                <div class="cc-event-month">{{month event.date}}</div>\
                <div class="cc-event-year">{{year event.date}}</div>\
                <div class="cc-event-time">{{time event.date}}</div>\
              </div>\
              <div class="cc-event-title">{{event.title}}</div>\
              <div class="cc-event-location">{{event.address}}</div>\
            </a>\
          </li>\
          {{/each}}\
      </ul>\
    </div>\
    <div class="tab-pane" id="cal">\
      <h3>cal</h3>\
    </div>\
    <div class="tab-pane" id="add">\
      <font color="black" face="arial" size="3">\
        <input placeholder="Title" type="text" name="title" required="required">\
        <br><input placeholder="Location" type="text" name="location" required="required">\
        <br><input placeholder="Date" type="text" name="date" required="required">\
        <br><input placeholder="Time" type="text" name="time" required="required">\
        <br><input placeholder="URL" type="text" name="url" required="required">\
        <br><button class="btn"><b>Submit</b></button>\
      </font>\
    </div>\
    <ul class="tabrow">\
      <li class="active"><a href="#list">list</a></li>\
      <li><a href="#cal">cal</a></li>\
      <li><a href="#add">add</a></li>\
    </ul>\
  </div>\
  </div>');

// initialise tabs
BLUGCalendarApp.CommunityCalendarComponent = Ember.Component.extend({
    templateName: 'community-calendar',
    didInsertElement : function(){
        Ember.run.next(function(){
            $('#tab-container').easytabs({
            	animate: false
            });
        });
    }
});

// get list of events
var steam = Steam.create(BLUGCalendarApp);
	steam.get('techgrind.events/order-by-date', function(data) {
		_events = data['event-list'];
	}
);

BLUGCalendarApp.ApplicationRoute = Ember.Route.extend({
    model: function() {
        return {
            cevents: _events
        }
    }
});
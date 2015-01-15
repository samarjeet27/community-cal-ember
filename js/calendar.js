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

// initialise tabs
BLUGCalendarApp.CommunityCalendarComponent = Ember.Component.extend({
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
// create ember-app instance
var BLUGCalendarApp = Ember.Application.create({
});

// events
var _events;

// initialise tabs
BLUGCalendarApp.ApplicationView = Ember.View.extend({
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

BLUGCalendarApp.ApplicationController = Ember.Controller.extend({
	events: _events
});
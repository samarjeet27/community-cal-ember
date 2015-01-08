// create ember-app instance
var BLUGCalendarApp = Ember.Application.create({
    rootElement: '.community-calendar'
});

BLUGCalendarApp.IndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('dashboard');
    }
});

BLUGCalendarApp.Router.map(function() {
    this.route('dashboard');
});


BLUGCalendarApp.DashboardRoute = Ember.Route.extend({
    events: {
        selectTab: function(name) {
            this.controllerFor('dashboard').set('activeTab', name);
            this.render(name, {
                into: 'dashboard',
                outlet: 'tab'
            });
        }
    },

    setupController: function(controller) {
        controller.set('activeTab', 'list');
    },

    renderTemplate: function() {
        this.render();
        this.render('list', {
            outlet: 'tab',
            into: 'dashboard'
        });
    }
});

BLUGCalendarApp.DashboardView = Ember.View.extend({
    activeTab: Ember.computed.alias('controller.activeTab'),

    activeTabDidChange: (function() {
        if (this.state == 'inDOM') this.setActiveTab();
    }).observes('activeTab'),

    didInsertElement: function() {
        this.setActiveTab();
    },

    setActiveTab: function() {
        $('.active').removeClass('active');
        var activeTab = this.get('activeTab');
        this.$("a[data-tab='%@']".fmt(activeTab)).parent().addClass('active');
    }

});

var steam = Steam.create(BLUGCalendarApp);

steam.get('techgrind.events/order-by-date', function(data) {
    BLUGCalendarApp.obj = Ember.Object.create({
        "events": data['event-list']
    });
    var templates = [{
        name: 'list',
        list: '\
	      <div class="tab-pane">\
	        <ul class="event-list">\
	          {{#with BLUGCalendarApp.obj}}\
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
	          {{/with}}\
	        </ul>\
	      </div>'
    }, {
        name: 'cal',
        cal: ' <div class="tab-pane">calendar</div>'
    }, {
        name: 'add',
        add: '<div class="tab-pane">add events</div>'
    }, {
        name: 'dashboard',
        dashboard: '{{outlet tab}}\
    <ul class="tabrow">\
      <li><a href="#" data-tab="list" {{action selectTab "list"}}>list</a></li>\
      <li><a href="#" data-tab="cal" {{action selectTab "cal"}}>cal</a></li>\
      <li><a href="#" data-tab="add" {{action selectTab "add"}}>add</a></li>\
    </ul>'
    }];
    for (var i = 0; i < templates.length; i++) {
        $('.community-calendar').append('<script type="text/x-handlebars" data-template-name="' + templates[i].name + '">' + templates[i][templates[i].name] + "</script>");
    };
});
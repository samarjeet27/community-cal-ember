// create ember-app instance
var App = Ember.Application.create({
	rootElement: '.community-calendar'
});
// list of events
var _events = []

function handlebars_extend() {
	// handlebar helpers
	var helpers = [{
		name: 'date',
		date: function(unix) {
			var date;
			date = new Date(unix * 1000);
			return date.toDateString();
		}
	}, {
		name: 'day',
		day: function(unix) {
			var date;
			date = new Date(unix * 1000);
			return date.getDate();
		},
	}, {
		name: 'month',
		month: function(unix) {
			var date;
			date = new Date(unix * 1000);
			return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
		},
	}, {
		name: 'year',
		year: function(unix) {
			var date;
			date = new Date(unix * 1000);
			return date.getFullYear();
		},
	}, {
		name: 'time',
		time: function(unix) {
			var date;
			date = new Date(unix * 1000);
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
		var result = '<a href="#/communitycal/' + id + '">';

		return new Handlebars.SafeString(result);
	});

}
handlebars_extend();

App.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('dashboard');
	}
});

App.Router.map(function() {
	this.route('dashboard');
});


App.DashboardRoute = Ember.Route.extend({
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

App.DashboardView = Ember.View.extend({
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

var steam = Steam.create(App);

steam.get('techgrind.events/order-by-date', function(data) {

	App.obj = Ember.Object.create({
		"events": data
	});
	for (var i = 0; i < Ember.TEMPLATES.length; i++) {
		var template = Ember.TEMPLATES[i];
		this.render(template);
	};
	//for (var i = 0; i < templates.length; i++) {
	//	$('.community-calendar').append('<script type="text/x-handlebars" data-template-name="' + templates[i].name + '">' + templates[i][templates[i].name] + "</script>");
	//};
});
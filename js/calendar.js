// create ember-app instance
var App = Ember.Application.create();
// list of events
var _events = []
	// handlebar helpers
var helpers = [{
		name: 'date',
		date: function(unix) {
			var date;
			date = new Date(unix * 1000);
			return date.toDateString();
		}
	},

	{
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
	}
];


for (var i = 0; i < helpers.length; i++) {
	var helper = helpers[i];
	console.log(typeof(helper[helper.name]));
	Ember.Handlebars.helper(helper.name, helper[helper.name]);
}

Handlebars.registerHelper('link', function(id) {
	id = Handlebars.Utils.escapeExpression(id);
	template = '#/communitycal/';
	// don't need the ending tag (safe escape)
	var result = '<a href="#/communitycal/' + id + '">';

	return new Handlebars.SafeString(result);
});
steam().get("techgrind.events/order-by-date", function(data) {
	_events = data['event-list'];
	App.obj = Ember.Object.create({
		"events": _events
	});
	var template = '<div class="community-calendar tabbable tabs-below">\
      <div class="tab-content">\
        <div class="tab-pane active">\
          <ul>\
            {{#with App.obj}}\
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
        </div>\
      </div>\
    </div>'

	$('body').append('<script type="text/x-handlebars">' + template + '</script>');
});
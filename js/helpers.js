(function () {
    // handlebars helpers
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
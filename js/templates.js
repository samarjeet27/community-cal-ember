Ember.TEMPLATES['list'] = Ember.Handlebars.template(function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = '',
        stack1, helperMissing = helpers.helperMissing,
        escapeExpression = this.escapeExpression,
        self = this;

    function program1(depth0, data) {

        var buffer = '',
            stack1;
        data.buffer.push("\n		");
        stack1 = helpers.each.call(depth0, "event", "in", "events", {
            hash: {},
            hashTypes: {},
            hashContexts: {},
            inverse: self.noop,
            fn: self.program(2, program2, data),
            contexts: [depth0, depth0, depth0],
            types: ["ID", "ID", "ID"],
            data: data
        });
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n		");
        return buffer;
    }

    function program2(depth0, data) {

        var buffer = '',
            stack1, helper, options;
        data.buffer.push("\n		<li class=\"cc-event\">\n			<a href=\"\">\n				<div class=\"cc-event-date\">\n					<div class=\"cc-event-day\">");
        data.buffer.push(escapeExpression((helper = helpers.day || (depth0 && depth0.day), options = {
            hash: {},
            hashTypes: {},
            hashContexts: {},
            contexts: [depth0],
            types: ["ID"],
            data: data
        }, helper ? helper.call(depth0, "event.date", options) : helperMissing.call(depth0, "day", "event.date", options))));
        data.buffer.push("</div>\n					<div class=\"cc-event-month\">");
        data.buffer.push(escapeExpression((helper = helpers.month || (depth0 && depth0.month), options = {
            hash: {},
            hashTypes: {},
            hashContexts: {},
            contexts: [depth0],
            types: ["ID"],
            data: data
        }, helper ? helper.call(depth0, "event.date", options) : helperMissing.call(depth0, "month", "event.date", options))));
        data.buffer.push("</div>\n					<div class=\"cc-event-year\">");
        data.buffer.push(escapeExpression((helper = helpers.year || (depth0 && depth0.year), options = {
            hash: {},
            hashTypes: {},
            hashContexts: {},
            contexts: [depth0],
            types: ["ID"],
            data: data
        }, helper ? helper.call(depth0, "event.date", options) : helperMissing.call(depth0, "year", "event.date", options))));
        data.buffer.push("</div>\n					<div class=\"cc-event-time\">");
        data.buffer.push(escapeExpression((helper = helpers.time || (depth0 && depth0.time), options = {
            hash: {},
            hashTypes: {},
            hashContexts: {},
            contexts: [depth0],
            types: ["ID"],
            data: data
        }, helper ? helper.call(depth0, "event.date", options) : helperMissing.call(depth0, "time", "event.date", options))));
        data.buffer.push("</div>\n				</div>\n				<div class=\"cc-event-title\">");
        stack1 = helpers._triageMustache.call(depth0, "event.title", {
            hash: {},
            hashTypes: {},
            hashContexts: {},
            contexts: [depth0],
            types: ["ID"],
            data: data
        });
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("</div>\n				<div class=\"cc-event-location\">");
        stack1 = helpers._triageMustache.call(depth0, "event.address", {
            hash: {},
            hashTypes: {},
            hashContexts: {},
            contexts: [depth0],
            types: ["ID"],
            data: data
        });
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("</div>\n			</a>\n		</li>\n		");
        return buffer;
    }

    data.buffer.push("<div class=\"tab-pane\">\n	<ul class=\"event-list\">\n		");
    stack1 = helpers['with'].call(depth0, "App.obj", {
        hash: {},
        hashTypes: {},
        hashContexts: {},
        inverse: self.noop,
        fn: self.program(1, program1, data),
        contexts: [depth0],
        types: ["ID"],
        data: data
    });
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n	</ul>\n</div>");
    return buffer;

});
Ember.TEMPLATES['cal'] = Ember.Handlebars.template(function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};



    data.buffer.push("<div class=\"tab-pane\">cal</div>");

});
Ember.TEMPLATES['add'] = Ember.Handlebars.template(function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};



    data.buffer.push("<div class=\"tab-pane\">add events</div>");

});
Ember.TEMPLATES['dashboard'] = Ember.Handlebars.template(function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = '',
        helper, options, helperMissing = helpers.helperMissing,
        escapeExpression = this.escapeExpression;


    data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet), options = {
        hash: {},
        hashTypes: {},
        hashContexts: {},
        contexts: [depth0],
        types: ["ID"],
        data: data
    }, helper ? helper.call(depth0, "tab", options) : helperMissing.call(depth0, "outlet", "tab", options))));
    data.buffer.push("\\\n<ul class=\"tabrow\">\\\n <li><a href=\"#\" data-tab=\"list\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectTab", "list", {
        hash: {},
        hashTypes: {},
        hashContexts: {},
        contexts: [depth0, depth0],
        types: ["ID", "STRING"],
        data: data
    })));
    data.buffer.push(">list</a></li>\\\n  <li><a href=\"#\" data-tab=\"cal\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectTab", "cal", {
        hash: {},
        hashTypes: {},
        hashContexts: {},
        contexts: [depth0, depth0],
        types: ["ID", "STRING"],
        data: data
    })));
    data.buffer.push(">cal</a></li>\\\n <li><a href=\"#\" data-tab=\"add\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectTab", "add", {
        hash: {},
        hashTypes: {},
        hashContexts: {},
        contexts: [depth0, depth0],
        types: ["ID", "STRING"],
        data: data
    })));
    data.buffer.push(">add</a></li>\\\n</ul>");
    return buffer;

});
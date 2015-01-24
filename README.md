community-calendar-ember
===========

A rewrite of https://github.com/beijinglug/community-calendar/ using ember.js

Demo
---

See live demo here http://samarjeet27.github.io/community-cal-ember


Usage
---

Include it

```html
 <!-- tabs framework -->
  <!-- stylesheet -->
  <link rel="stylesheet" href="css/styles.css"</link>

  <script src="js/jquery.easytabs.min.js"></script>

  <!-- community-calendar -->
  <script src="js/steam.js"></script>
  <script src="js/calendar.js"></script>
```

Add the handlebars template

```html
<script type="text/x-handlebars">
	{{community-calendar events=cevents}}
</script>
```

You are good to go !!

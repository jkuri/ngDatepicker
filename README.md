#### ngDatepicker
AngularJS Simple Datepicker directive

#### Dependencies
    - moment.js
    - fontawesome

#### Example 

Check out [the live demo](http://demo.jankuri.com/ngDatepicker/)

#### Screenshot
![ScreenShot](https://raw.githubusercontent.com/jkuri/ngDatepicker/master/screenshot/ngDatepicker.png)

Install
-------

#### With bower:

    $ bower install ngDatepicker
    
#### With npm:

    $ npm install ng-datepicker
    
#### Example Configuration (bower)
```html
<!DOCTYPE html>
<html ng-app="app">
<head>
	<title>AngularJS DatePicker</title>
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="src/css/ngDatepicker.css">
</head>
<body ng-controller="Ctrl as ctrl">

	<div>
		<h4>Basic Example</h4>
		<ng-datepicker ng-model="ctrl.date1">
		</ng-datepicker>
		<span ng-bind="ctrl.date1" style="display: block; margin-top: 5px;"></span>
	</div>

	<div>
		<h4>Example with locale</h4	>
		<ng-datepicker ng-model="ctrl.date2" locale="sl" format="DD.MM.YYYY" view-format="Do MMMM YYYY">
		</ng-datepicker>
		<span ng-bind="ctrl.date2" style="display: block; margin-top: 5px;"></span>
	</div>


<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment-with-locales.min.js"></script>
<script type="text/javascript" src="src/js/ngDatepicker.min.js"></script>
<script type="text/javascript">
var app = angular.module('app', ['jkuri.datepicker']);
app.controller('Ctrl', [function() {
	var self = this;
}]);
</script>
</body>
</html>
``` 


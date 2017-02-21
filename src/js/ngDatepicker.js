angular.module('jkuri.datepicker', [])

.directive('ngDatepicker', ['$timeout', function($timeout) {
	'use strict';

	var setScopeValues = function (scope, attrs) {
		scope.format = attrs.format || 'YYYY-MM-DD';
		scope.viewFormat = attrs.viewFormat || 'Do MMMM YYYY';
		scope.locale = attrs.locale || 'en';
		scope.firstWeekDaySunday = scope.$eval(attrs.firstWeekDaySunday) || false; 
		scope.placeholder = attrs.placeholder || '';
	};

	return {
		restrict: 'EA',
		require: '?ngModel',
		scope: {},
		link: function (scope, element, attrs, ngModel) {
			setScopeValues(scope, attrs);

			scope.calendarOpened = false;
			scope.days = [];
			scope.dayNames = [];
			scope.viewValue = null;
			scope.dateValue = null;

			moment.locale(scope.locale);
			var date = moment();

			var generateCalendar = function (date) {
				var lastDayOfMonth = date.endOf('month').date(),
					month = date.month(),
					year = date.year(),
					n = 1;
			
				var firstWeekDay = scope.firstWeekDaySunday === true ? date.set('date', 2).day() : date.set('date', 1).day();
				if (firstWeekDay !== 1) {
					n -= firstWeekDay - 1;
				}

				//Code to fix date issue
				if(n==2)
					n = -5;

				scope.dateValue = date.format('MMMM YYYY');
				scope.days = [];

				for (var i = n; i <= lastDayOfMonth; i += 1) {
					if (i > 0) {
						scope.days.push({day: i, month: month + 1, year: year, enabled: true});
					} else {
						scope.days.push({day: null, month: null, year: null, enabled: false});
					}
				}
			};

			var generateDayNames = function () {
				var date = scope.firstWeekDaySunday === true ?  moment('2015-06-07') : moment('2015-06-01');
				for (var i = 0; i < 7; i += 1) {
					scope.dayNames.push(date.format('ddd'));
					date.add('1', 'd');
				}
			};

			generateDayNames();

			scope.showCalendar = function () {
				scope.calendarOpened = true;
				generateCalendar(date);
			};

			scope.closeCalendar = function () {
				scope.calendarOpened = false;
			};

			scope.prevYear = function () {
				date.subtract(1, 'Y');
				generateCalendar(date);
			};

			scope.prevMonth = function () {
				date.subtract(1, 'M');
				generateCalendar(date);
			};

			scope.nextMonth = function () {
				date.add(1, 'M');
				generateCalendar(date);
			};

			scope.nextYear = function () {
				date.add(1, 'Y');
				generateCalendar(date);
			};

			scope.selectDate = function (event, date) {
				event.preventDefault();
				var selectedDate = moment(date.day + '.' + date.month + '.' + date.year, 'DD.MM.YYYY');
				ngModel.$setViewValue(selectedDate.format(scope.format));
				scope.viewValue = selectedDate.format(scope.viewFormat);
				scope.closeCalendar();
			};

            scope.blurEventHandler = function() {
                var pickerBox = element[0].querySelector('.ng-datepicker'),
                    input = element[0].querySelector('.ng-datepicker-input');
                $timeout( function(){
					var activeElement = document.activeElement,
						datepickerElementActive = activeElement.isEqualNode(input) || activeElement.isEqualNode(pickerBox);
					return datepickerElementActive ||  scope.closeCalendar()
            	});
            };

            scope.$on('blurEvent', scope.blurEventHandler);

            scope.blurHandler = function() {
                scope.$emit('blurEvent');
            };

			ngModel.$render = function () {
				var newValue = ngModel.$viewValue;
				if (newValue !== undefined) {
					scope.viewValue = moment(newValue).format(attrs.viewFormat);
					scope.dateValue = newValue;
				}
			};
		},
		template: 
		'<div>' +
		'	<input id="datepickerInput-{{$id}}" type="text" tabindex="1" ng-focus="showCalendar()" ng-value="viewValue" ng-blur="blurHandler()" class="ng-datepicker-input" placeholder="{{ placeholder }}">' +
		'</div>' +
		'<div id="datepickerBox-{{$id}}" class="ng-datepicker" tabindex="1" ng-show="calendarOpened" ng-blur="blurHandler()" >' +
		'  <div class="controls">' +
		'    <div class="left">' +
		'      <i class="fa fa-backward prev-year-btn" ng-click="prevYear()"></i>' +
		'      <i class="fa fa-angle-left prev-month-btn" ng-click="prevMonth()"></i>' +
		'    </div>' +
		'    <span class="date" ng-bind="dateValue"></span>' +
		'    <div class="right">' + 
		'      <i class="fa fa-angle-right next-month-btn" ng-click="nextMonth()"></i>' +
		'      <i class="fa fa-forward next-year-btn" ng-click="nextYear()"></i>' +
		'    </div>' +
		'  </div>' +
		'  <div class="day-names">' +
		'    <span ng-repeat="dn in dayNames">' +
		'      <span>{{ dn }}</span>' +
		'    </span>' +
		'  </div>' +
		'  <div class="calendar">' +
		'    <span ng-repeat="d in days">' +
		'      <span class="day" ng-click="selectDate($event, d)" ng-class="{disabled: !d.enabled}">{{ d.day }}</span>' +
		'    </span>' +
		'  </div>' +
		'</div>'
	};

}]);


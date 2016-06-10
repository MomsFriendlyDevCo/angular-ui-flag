var app = angular.module('app', [
	'angular-ui-flag',
	'colorpicker.module',
]);

app.controller('flagExampleController', function($scope, $http, $interval, $q) {
	// .flagStyle - flag drawing options {{{
	$scope.flagStyle = {
		background: {
			svg: '',
			color1: '#FF0000',
			color2: '#00FF00',
			color3: '#0000FF',
		},
		foreground: {
			svg: '',
			color1: '#FFFF00',
			color2: '#FF00FF',
			color3: '#FFFFFF',
		},
		feature: {
			svg: '',
			color1: '#FFFF00',
			color2: '#FF00FF',
			color3: '#FFFFFF',
		},
	};
	// }}}

	// .colors - list of nice colors to choose from {{{
	$scope.colors = [
	];
	// }}}
	
	// .options - available options for each flag part {{{
	$scope.options = {
		activeBackground: null,
		activeForeground: null,
		activeFeature: null,
		backgrounds: [], // Loaded from svg/bg/index.json
		foregrounds: [],
		features: [],
	};

	$scope.loading = true;
	$q.all([
		$http.get('svg/colors.json')
			.then(function(res) {
				$scope.colors = res.data;
			}),

		$http.get('svg/bg/index.json')
			.then(function(res) {
				$scope.options.backgrounds = res.data;
			}),

		$http.get('svg/fg/index.json')
			.then(function(res) {
				$scope.options.foregrounds = res.data;
			}),

		$http.get('svg/ft/index.json')
			.then(function(res) {
				$scope.options.features = res.data;
			}),
	])
		.then(function() {
			$scope.loading = false;
		});
	// }}}

	// Set options.active{background|foreground|feature} trackers {{{
	$scope.$watch('flagStyle.background.svg', function() {
		$scope.options.activeBackground = _.find($scope.options.backgrounds, {file: $scope.flagStyle.background.svg});
	});

	$scope.$watch('flagStyle.foreground.svg', function() {
		$scope.options.activeForeground = _.find($scope.options.foregrounds, {file: $scope.flagStyle.foreground.svg});
	});

	$scope.$watch('flagStyle.feature.svg', function() {
		$scope.options.activeFeature = _.find($scope.options.features, {file: $scope.flagStyle.feature.svg});
	});
	// }}}

	// .set() - utility function to set a path (via lodash _.set) {{{
	$scope.set = function(path, value) {
		_.set($scope, path, value);
	};
	// }}}

	// .toggle() - utility function to otggle a path (via lodash _.set) {{{
	$scope.toggle = function(path) {
		_.set($scope, path, !_.get($scope, path));
	};
	// }}}

	// Timer {{{
	$scope.timerInterval = 2000;
	$scope.timerEnabled = false;
	$scope.timerHandle;
	$scope.$watch('timerEnabled', function() {
		if ($scope.timerEnabled) {
			$scope.timerHandle = $interval($scope.randomizeAll, $scope.timerInterval);
		} else {
			$interval.cancel($scope.timerHandle);
		}
	});
	// }}}

	// Randomizers {{{
	$scope.randomizeAll = function() {
		$scope.randomizeBackground();
		$scope.randomizeForeground();
		$scope.randomizeFeature();
	};

	$scope.randomizeBackground = function() {
		$scope.flagStyle.background = {
			svg: _.sample($scope.options.backgrounds).file,
			color1: _.sample($scope.colors).id,
			color2: _.sample($scope.colors).id,
			color3: _.sample($scope.colors).id,
		};
	};

	$scope.randomizeForeground = function() {
		$scope.flagStyle.foreground = {
			svg: _.sample($scope.options.foregrounds).file,
			color1: _.sample($scope.colors).id,
			color2: _.sample($scope.colors).id,
			color3: _.sample($scope.colors).id,
		};
	};

	$scope.randomizeFeature = function() {
		$scope.flagStyle.feature = {
			svg: _.sample($scope.options.features).file,
			color1: _.sample($scope.colors).id,
			color2: _.sample($scope.colors).id,
			color3: _.sample($scope.colors).id,
		};
	};
 	// }}}

	// Workaround for mobiles {{{
	$(function() {
		$(window)
			.on('resize', function() {
				if ($(window).width() < 500) {
					$('.well').css('padding', '2px');
					$('ui-flag > svg > g')
						.attr('transform', 'scale(0.7, 0.7)');
				} else {
					$('.well').css('padding', '5px');
					$('ui-flag > svg > g')
						.attr('transform', 'scale(1, 1)');
				}
			})
			.trigger('resize');
	});
	// }}}

	// Kick off all ranomizers on load {{{
	$scope.$watchGroup(['options.backgrounds', 'options.foregrounds', 'options.features'], function() {
		if (!$scope.options.backgrounds.length || !$scope.options.foregrounds.length || !$scope.options.features.length) return; // Load yet loaded everything
		$scope.randomizeAll();
	});
	// }}}

	// Gallery {{{
	$scope.galleryFlags = [];
	$scope.shuffleGallery = function() {
		_.times(13, function(i) {
			$scope.galleryFlags[i] = {
				background: {
					svg: _.sample($scope.options.backgrounds).file,
					color1: _.sample($scope.colors).id,
					color2: _.sample($scope.colors).id,
					color3: _.sample($scope.colors).id,
				},
				foreground: {
					svg: _.sample($scope.options.foregrounds).file,
					color1: _.sample($scope.colors).id,
					color2: _.sample($scope.colors).id,
					color3: _.sample($scope.colors).id,
				},
				feature: {
					svg: _.sample($scope.options.features).file,
					color1: _.sample($scope.colors).id,
					color2: _.sample($scope.colors).id,
					color3: _.sample($scope.colors).id,
				},
			};
		});
	};

	$scope.pickGallery = function(item) {
		_.merge($scope.flagStyle, _.pick(item, ['background', 'foreground', 'feature']));
	};
	// }}}
});

var app = angular.module('app', [
	'angular-ui-flag',
	'colorpicker.module',
]);

app.controller('flagExampleController', function($scope) {
	// .flagStyle - flag drawing options {{{
	$scope.flagStyle = {
		frame: {
			width: 500,
			height: 300,
		},
		background: {
			svg: 'svg/bg/sq-top-left.svg',
			color1: '#FF0000',
			color2: '#00FF00',
			color3: '#0000FF',
		},
		foreground: {
			svg: 'FIXME-fg',
			color1: '#FFFF00',
		},
		feature: {
			svg: 'FIXME-ft',
			color1: '#00FFFF',
		},
	};
	// }}}

	// .colors - list of nice colors to choose from {{{
	$scope.colors = [
		'#be252e', // Red
		'#587bc6', // Light blue
		'#31336b', // Dark blue
		'#e4d12f', // Yellow
		'#dc692b', // Orange
		'#4a9d4c', // Green
		'#000000', // Black
		'#ffffff', // White
	];
	// }}}
	
	// .options - available options for each flag part {{{
	$scope.options = {
		activeBackground: null,
		activeForeground: null,
		activeFeature: null,
		backgrounds: [
			{
				title: 'Plain',
				file: 'svg/bg/plain.svg',
				colorCount: 1,
			},
			{
				title: 'Feature in top left',
				file: 'svg/bg/sq-top-left.svg',
				colorCount: 2,
			},
			{
				title: 'Horizontal Stripes',
				file: 'svg/bg/horiz-stripes.svg',
				colorCount: 3,
			},
			{
				title: 'Horizontal Stripes (Tight)',
				file: 'svg/bg/horiz-stripes-tight.svg',
				colorCount: 3,
			},
			{
				title: 'Vertical Stripes',
				file: 'svg/bg/vert-stripes.svg',
				colorCount: 3,
			},
			{
				title: 'Vertical Stripes (Fat)',
				file: 'svg/bg/vert-stripes-fat.svg',
				colorCount: 3,
			},
			{
				title: 'Cross (Left-offset)',
				file: 'svg/bg/left-cross.svg',
				colorCount: 2,
			},
			{
				title: 'Cross (Centered)',
				file: 'svg/bg/cross.svg',
				colorCount: 2,
			},
			{
				title: 'Corners',
				file: 'svg/bg/corners.svg',
				colorCount: 2,
			},
			{
				title: 'Stripe 1',
				file: 'svg/bg/stripe-1.svg',
				colorCount: 3,
			},
			{
				title: 'Stripe 2',
				file: 'svg/bg/stripe-2.svg',
				colorCount: 3,
			},
			{
				title: 'Union Jack',
				file: 'svg/bg/union-jack.svg',
				colorCount: 3,
			},
			{
				title: 'Union Jack (Top-Left corner)',
				file: 'svg/bg/union-jack-corner.svg',
				colorCount: 3,
			},
			{
				title: 'Zig Zag',
				file: 'svg/bg/zig-zag.svg',
				colorCount: 2,
			},
		],
		foregrounds: [
			'FIXME-fg-svg-1',
		],
		features: [
			{
				title: 'Blank',
				file: 'svg/ft/blank.svg',
				colorCount: 0,
			},
			{
				title: 'Dragon',
				file: 'svg/ft/dragon.svg',
				colorCount: 1,
			},
			{
				title: 'Maple Leaf',
				file: 'svg/ft/maple-leaf.svg',
				colorCount: 1,
			},
			{
				title: 'Moon + Star',
				file: 'svg/ft/moon-star.svg',
				colorCount: 2,
			},
			{
				title: 'Moon + Star (Circle)',
				file: 'svg/ft/moon-star-circle.svg',
				colorCount: 3,
			},
			{
				title: 'Plus',
				file: 'svg/ft/plus.svg',
				colorCount: 1,
			},
			{
				title: 'Southern Cross',
				file: 'svg/ft/southern-cross.svg',
				colorCount: 1,
			},
			{
				title: 'Star (4 points)',
				file: 'svg/ft/star-4.svg',
				colorCount: 1,
			},
			{
				title: 'Star (5 points)',
				file: 'svg/ft/star-5.svg',
				colorCount: 1,
			},
			{
				title: 'Star (12 points)',
				file: 'svg/ft/star-12.svg',
				colorCount: 1,
			},
		],
	};
	// }}}

	// Set options.active{background|foreground|feature} trackers {{{
	$scope.$watch('flagStyle.background.svg', function() {
		$scope.activeBackground = _.find($scope.options.backgrounds, {file: $scope.flagStyle.background.svg});
	});

	$scope.$watch('flagStyle.foreground.svg', function() {
		$scope.activeforeground = _.find($scope.options.foregrounds, {file: $scope.flagStyle.foreground.svg});
	});

	$scope.$watch('flagStyle.feature.svg', function() {
		$scope.activeFeature = _.find($scope.options.features, {file: $scope.flagStyle.feature.svg});
	});
	// }}}

	// .set() - utility function to set a path (via lodash _.set) {{{
	$scope.set = function(path, value) {
		_.set($scope, path, value);
	};
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
			color1: _.sample($scope.colors),
			color2: _.sample($scope.colors),
			color3: _.sample($scope.colors),
		};
	};

	$scope.randomizeForeground = function() {
		$scope.flagStyle.foreground = {
			svg: _.sample($scope.options.foregrounds).file,
			color1: _.sample($scope.colors),
			color2: _.sample($scope.colors),
			color3: _.sample($scope.colors),
		};
	};

	$scope.randomizeFeature = function() {
		$scope.flagStyle.feature = {
			svg: _.sample($scope.options.features).file,
			color1: _.sample($scope.colors),
			color2: _.sample($scope.colors),
			color3: _.sample($scope.colors),
		};
	};
	// }}}

	// Kick off all ranomizers on load {{{
	$scope.$evalAsync($scope.randomizeAll);
	// }}}
});

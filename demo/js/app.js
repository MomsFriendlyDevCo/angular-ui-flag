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
				title: 'Vertical Stripes',
				file: 'svg/bg/vert-stripes.svg',
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
				title: 'Union Jack',
				file: 'svg/bg/union-jack.svg',
				colorCount: 3,
			},
		],
		activeBackground: null,
		foregrounds: [
			'FIXME-fg-svg-1',
		],
		features: [
			'FIXME-ft-svg-1',
		],
	};
	// }}}

	// Set options.active{background|foreground|feature} trackers {{{
	$scope.$watch('flagStyle.background.svg', function() {
		$scope.activeBackground = _.find($scope.options.backgrounds, {file: $scope.flagStyle.background.svg});
	});
	// }}}

	// .set() - utility function to set a path (via lodash _.set) {{{
	$scope.set = function(path, value) {
		_.set($scope, path, value);
	};
	// }}}

	// Randomizers {{{
	$scope.randomizeBackground = function() {
		$scope.flagStyle.background = {
			svg: _.sample($scope.options.backgrounds).file,
			color1: _.sample($scope.colors),
			color2: _.sample($scope.colors),
			color3: _.sample($scope.colors),
		};
	};
	// }}}
});

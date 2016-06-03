var app = angular.module('app', [
	'angular-ui-flag',
	'colorpicker.module'
]);

app.controller('flagExampleController', function($scope) {
	// .flagStyle - flag drawing options {{{
	$scope.flagStyle = {
		background: {
			svg: 'FIXME-bg',
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
		'#FF0000',
		'#00FF00',
		'#0000FF',
	];
	// }}}
	
	// .options - available options for each flag part {{{
	$scope.options = {
		backgrounds: [
			'FIXME-bg-svg-1',
		],
		foregrounds: [
			'FIXME-fg-svg-1',
		],
		features: [
			'FIXME-ft-svg-1',
		],
	};
	// }}}

	// .set() - utility function to set a path (via lodash _.set) {{{
	$scope.set = function(path, value) {
		_.set($scope, path, value);
	};
	// }}}
});

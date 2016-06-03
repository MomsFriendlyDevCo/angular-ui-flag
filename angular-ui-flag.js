angular.module('angular-ui-flag', [])
.directive('uiFlag', function() {
	return {
		scope: {
			style: '=',
		},
		restrict: 'AE',
		template: 'Hello World',
		controller: function($scope) {
			$scope.$elem;

			// Redrawing {{{
			$scope.redrawBackground = function() {
				// FIXME
			};

			$scope.redrawForeground = function() {
				// FIXME
			};

			$scope.redrawFeature = function() {
				// FIXME
			};
			// }}}

			// Watching + trigger redrawing {{{
			$scope.$watchGroup(['style.background.svg', 'style.background.color1', 'style.background.color2', 'style.background.color3'], $scope.redrawBackground);
			$scope.$watchGroup(['style.foreground.svg', 'style.foreground.color1'], $scope.redrawForeground);
			$scope.$watchGroup(['style.feature.svg', 'style.feature.color1'], $scope.redrawFeature);
			// }}}
		},
		link: function($scope, elem, attr, ctrl) {
			$scope.$elem = elem;
		},
	}
});

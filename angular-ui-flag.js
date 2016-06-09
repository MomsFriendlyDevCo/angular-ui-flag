angular.module('angular-ui-flag', [])
.directive('uiFlag', function($http) {
	return {
		scope: {
			style: '=',
		},
		restrict: 'AE',
		template: 
			'<svg width="{{style.frame.width}}" height="{{style.frame.height}}">' +
				'<g class="ui-flag-background"></g>' +
				'<g class="ui-flag-foreground"></g>' +
				'<g class="ui-flag-feature"></g>' +
			'</svg>',
		controller: function($scope) {
			$scope.elementSections; // SVG groups of each aspect of the flag (background, foreground + feature)

			// Utility functions {{{
			$scope.splitColors = function(element) {
				var output = [[],[],[]];

				angular.element(element).find('path')
					.filter(function(key, elem) {
						var ae = angular.element(elem);
						var fill = ae.css('fill');
						var colorNo = false;

						if (ae.attr('colorNo')) { // Categorised previously
							colorNo = ae.attr('colorNo');
						} else if (fill == 'rgb(255, 0, 0)') {
							colorNo = 0;
						} else if (fill == 'rgb(0, 255, 0)') {
							colorNo = 1;
						} else if (fill == 'rgb(0, 0, 255)') {
							colorNo = 2;
						}

						if (colorNo !== false) {
							ae.attr('colorNo', colorNo);
							output[colorNo].push(ae);
						}
					});

				return output;
			};
			// }}}

			// Redrawing {{{
			// Background {{{
			$scope._lastBackground;
			$scope.redrawBackground = function() {
				if ($scope.style.background.svg == $scope._lastBackground) return $scope.styleBackground(); // No need to reload - just restyle
				$http.get($scope.style.background.svg)
					.then(function(res) {
						$scope.elementSections.background.innerHTML = res.data;
						var newSVG = angular.element($scope.elementSections.background.children[0]);
						newSVG.attr({
							width: $scope.style.frame.width,
							height: $scope.style.frame.height,
						});
						$scope.styleBackground();
						$scope._lastBackground = $scope.style.background.svg;
					})
			};

			$scope.styleBackground = function() {
				var splits = $scope.splitColors($scope.elementSections.background.children[0]);

				splits[0].forEach(function(elem) { elem.css('fill', $scope.style.background.color1) });
				splits[1].forEach(function(elem) { elem.css('fill', $scope.style.background.color2) });
				splits[2].forEach(function(elem) { elem.css('fill', $scope.style.background.color3) });
			};
			// }}}

			// Foreground {{{
			$scope.lastForeground;
			$scope.redrawForeground = function() {
				if ($scope.style.foreground.svg == $scope._lastForeground) return $scope.styleForeground(); // No need to reload - just restyle
				$http.get($scope.style.foreground.svg)
					.then(function(res) {
						$scope.elementSections.foreground.innerHTML = res.data;
						var newSVG = angular.element($scope.elementSections.foreground.children[0]);
						newSVG.attr({
							width: $scope.style.frame.width,
							height: $scope.style.frame.height,
						});
						$scope.styleForeground();
						$scope._lastForeground = $scope.style.foreground.svg;
					})
			};

			$scope.styleForeground = function() {
				var splits = $scope.splitColors($scope.elementSections.foreground.children[0]);

				splits[0].forEach(function(elem) { elem.css('fill', $scope.style.foreground.color1) });
				splits[1].forEach(function(elem) { elem.css('fill', $scope.style.foreground.color2) });
				splits[2].forEach(function(elem) { elem.css('fill', $scope.style.foreground.color3) });
			};
			// }}}

			// Feature {{{
			$scope._lastFeature;
			$scope.redrawFeature = function() {
				// if ($scope.style.feature.svg == $scope._lastFeature) return $scope.styleFeature(); // No need to reload - just restyle
				$http.get($scope.style.feature.svg)
					.then(function(res) {
						var boundingElem = angular.element($scope.elementSections.background).find('#feature');
						if (!boundingElem.length) return console.warn('Cannot find #feature ID within background', $scope.style.background.svg);
						var boundingRect = boundingElem[0].getBoundingClientRect();
						console.log('BOUNDING RECT', boundingRect);

						$scope.elementSections.feature.innerHTML = res.data;
						var newSVG = angular.element($scope.elementSections.feature.children[0]);
						newSVG.attr({
							left: boundingRect.left,
							top: boundingRect.top,
							width: boundingRect.width,
							height: boundingRect.height,
						});
						$scope.styleFeature();
						$scope._lastFeature = $scope.style.feature.svg;
					})
			};

			$scope.styleFeature = function() {
				var splits = $scope.splitColors($scope.elementSections.feature);

				splits[0].forEach(function(elem) { elem.css('fill', $scope.style.feature.color1) });
				splits[1].forEach(function(elem) { elem.css('fill', $scope.style.feature.color2) });
				splits[2].forEach(function(elem) { elem.css('fill', $scope.style.feature.color3) });
			};
			// }}}
			// }}}

			// Watching + trigger redrawing {{{
			$scope.$watchGroup(['style.background.svg', 'style.background.color1', 'style.background.color2', 'style.background.color3'], $scope.redrawBackground);
			$scope.$watchGroup(['style.foreground.svg', 'style.foreground.color1', 'style.foreground.color2', 'style.foreground.color3'], $scope.redrawForeground);
			$scope.$watchGroup(['style.feature.svg', 'style.background.svg', 'style.feature.color1', 'style.feature.color2', 'style.feature.color3'], $scope.redrawFeature);
			// }}}
		},
		link: function($scope, elem, attr, ctrl) {
			$scope.elementSections = {
				background: elem.find('.ui-flag-background')[0],
				foreground: elem.find('.ui-flag-foreground')[0],
				feature: elem.find('.ui-flag-feature')[0],
			};
		},
	}
});

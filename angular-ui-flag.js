angular.module('angular-ui-flag', [])
.directive('uiFlag', function($http) {
	return {
		scope: {
			style: '=',
			width: '@?',
			height: '@?',
		},
		restrict: 'AE',
		template:
			'<svg viewBox="0 0 {{style.frame.width || 500}} {{style.frame.height || 300}}">' +
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
							width: $scope.calcWidth,
							height: $scope.calcHeight,
							viewBox: '0 0 73.653713 43.963027',
						});
						if (newSVG[0].viewBox) newSVG[0].viewBox.baseVal.height = 43.963027;
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
							width: $scope.calcWidth,
							height: $scope.calcHeight,
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
			$scope._lastFeatureBackground;
			$scope.redrawFeature = function() {
				if (
					$scope.style.background.svg == $scope._lastFeatureBackground && // Background hasn't changed
					$scope.style.feature.svg == $scope._lastFeature // Feature hasn't changed
				) return $scope.styleFeature(); // No need to reload - just restyle

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
						$scope._lastFeatureBackground = $scope.style.background.svg;
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
			// Manage background, foreground and feature changes
			$scope.$watchGroup(['style.background.svg', 'style.background.color1', 'style.background.color2', 'style.background.color3'], $scope.redrawBackground);
			$scope.$watchGroup(['style.foreground.svg', 'style.foreground.color1', 'style.foreground.color2', 'style.foreground.color3'], $scope.redrawForeground);
			$scope.$watchGroup(['style.feature.svg', 'style.background.svg', 'style.feature.color1', 'style.feature.color2', 'style.feature.color3'], $scope.redrawFeature);

			// Manage width + height changes
			$scope.$watchGroup(['width', 'height'], function() {
				$scope.calcWidth = $scope.width || 380;
				$scope.calcHeight = $scope.height || 250;
				$scope.elementSections.svg.attr({
					width: $scope.calcWidth,
					height: $scope.calcHeight,
				});
			});
			// }}}
		},
		link: function($scope, elem, attr, ctrl) {
			$scope.elementSections = {
				svg: angular.element(elem.children('svg')),
				background: elem.find('.ui-flag-background')[0],
				foreground: elem.find('.ui-flag-foreground')[0],
				feature: elem.find('.ui-flag-feature')[0],
			};
		},
	}
});

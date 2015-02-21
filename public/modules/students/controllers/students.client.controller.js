'use strict';

// Students controller
angular.module('students').controller('StudentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Students',
	function($scope, $stateParams, $location, Authentication, Students) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				first_name: this.first_name,
				last_name: this.last_name,
				address: this.address,
				city: this.city,
				country: this.country,
				email: this.email,
				phone: this.phone

			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.first_name = '';
				$scope.last_name = '';
				$scope.address= '';
				$scope.city= '';
				$scope.country= '';
				$scope.email= '';
				$scope.phone= '';
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
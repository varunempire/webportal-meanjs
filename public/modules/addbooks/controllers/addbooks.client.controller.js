'use strict';

// Addbooks controller
angular.module('addbooks').controller('AddbooksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Addbooks',
	function($scope, $stateParams, $location, Authentication, Addbooks) {
		$scope.authentication = Authentication;

		// Create new Addbook
		$scope.create = function() {
			// Create new Addbook object
			var addbook = new Addbooks ({
				name: this.name
			});

			// Redirect after save
			addbook.$save(function(response) {
				$location.path('addbooks/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Addbook
		$scope.remove = function(addbook) {
			if ( addbook ) { 
				addbook.$remove();

				for (var i in $scope.addbooks) {
					if ($scope.addbooks [i] === addbook) {
						$scope.addbooks.splice(i, 1);
					}
				}
			} else {
				$scope.addbook.$remove(function() {
					$location.path('addbooks');
				});
			}
		};

		// Update existing Addbook
		$scope.update = function() {
			var addbook = $scope.addbook;

			addbook.$update(function() {
				$location.path('addbooks/' + addbook._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Addbooks
		$scope.find = function() {
			$scope.addbooks = Addbooks.query();
		};

		// Find existing Addbook
		$scope.findOne = function() {
			$scope.addbook = Addbooks.get({ 
				addbookId: $stateParams.addbookId
			});
		};
	}
]);
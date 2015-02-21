'use strict';

// Addstudents controller
angular.module('addstudents').controller('AddstudentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Addstudents',
	function($scope, $stateParams, $location, Authentication, Addstudents) {
		$scope.authentication = Authentication;

		// Create new Addstudent
		$scope.create = function() {
			// Create new Addstudent object
			var addstudent = new Addstudents ({
				name: this.name
			});

			// Redirect after save
			addstudent.$save(function(response) {
				$location.path('addstudents/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Addstudent
		$scope.remove = function(addstudent) {
			if ( addstudent ) { 
				addstudent.$remove();

				for (var i in $scope.addstudents) {
					if ($scope.addstudents [i] === addstudent) {
						$scope.addstudents.splice(i, 1);
					}
				}
			} else {
				$scope.addstudent.$remove(function() {
					$location.path('addstudents');
				});
			}
		};

		// Update existing Addstudent
		$scope.update = function() {
			var addstudent = $scope.addstudent;

			addstudent.$update(function() {
				$location.path('addstudents/' + addstudent._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Addstudents
		$scope.find = function() {
			$scope.addstudents = Addstudents.query();
		};

		// Find existing Addstudent
		$scope.findOne = function() {
			$scope.addstudent = Addstudents.get({ 
				addstudentId: $stateParams.addstudentId
			});
		};
	}
]);
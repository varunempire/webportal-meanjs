'use strict';

// Leavemangs controller
angular.module('leavemangs').controller('LeavemangsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Leavemangs',
	function($scope, $stateParams, $location, Authentication, Leavemangs) {
		$scope.authentication = Authentication;

		// Create new Leavemang
		$scope.create = function() {
			// Create new Leavemang object
			var leavemang = new Leavemangs ({
				name: this.name,
				rollno: this.rollno,
				course: this.course,
				dept: this.dept,
				year: this.year,
				section: this.section,
				reason: this.reason,
				from: this.from,
				to: this.to
			});

			// Redirect after save
			leavemang.$save(function(response) {
				$location.path('leavemangs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		

		// Remove existing Leavemang
		$scope.remove = function(leavemang) {
			if ( leavemang ) { 
				leavemang.$remove();

				for (var i in $scope.leavemangs) {
					if ($scope.leavemangs [i] === leavemang) {
						$scope.leavemangs.splice(i, 1);
					}
				}
			} else {
				$scope.leavemang.$remove(function() {
					$location.path('leavemangs');
				});
			}
		};

		// Update existing Leavemang
		$scope.update = function() {
			var leavemang = $scope.leavemang;

			leavemang.$update(function() {
				$location.path('leavemangs/' + leavemang._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Leavemangs
		$scope.find = function() {
			$scope.leavemangs = Leavemangs.query();
		};

		// Find existing Leavemang
		$scope.findOne = function() {
			$scope.leavemang = Leavemangs.get({ 
				leavemangId: $stateParams.leavemangId
			});
		};
	}
]);
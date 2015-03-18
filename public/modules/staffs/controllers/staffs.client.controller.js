'use strict';

// Staffs controller
angular.module('staffs').controller('StaffsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Staffs',
	function($scope, $stateParams, $location, Authentication, Staffs) {
		$scope.authentication = Authentication;

		// Create new Staff
		$scope.create = function() {
			// Create new Staff object
			var staff = new Staffs ({
				name: this.name,
				dept: this.dept,
				dob: this.dob,
				peradd: this.peradd,
				mail: this.mail,
				mob: this.mob,
				experience: this.experience,
				qualification: this.qualification,
				maritial: this.maritial,
				gender: this.gender,
				religion: this.religion,
				caste: this.caste,
				community: this.community,
				/*
				name: this.name,
				regno: this.regno,
				course: this.course,
				dept: this.dept,
				year: this.year,
				sec: this.sec,
				cursem: this.cursem,
				leave: this.leave,
				attendance: this.attendance,
				mark1: this.mark1,
				mark2: this.mark2,
				mark3: this.mark3,
				mark4: this.mark4,
				mark5: this.mark5	*/			
			});

			// Redirect after save
			staff.$save(function(response) {
				$location.path('staffs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Staff
		$scope.remove = function(staff) {
			if ( staff ) { 
				staff.$remove();

				for (var i in $scope.staffs) {
					if ($scope.staffs [i] === staff) {
						$scope.staffs.splice(i, 1);
					}
				}
			} else {
				$scope.staff.$remove(function() {
					$location.path('staffs');
				});
			}
		};

		// Update existing Staff
		$scope.update = function() {
			var staff = $scope.staff;

			staff.$update(function() {
				$location.path('staffs/' + staff._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Staffs
		$scope.find = function() {
			$scope.staffs = Staffs.query();
		};

		// Find existing Staff
		$scope.findOne = function() {
			$scope.staff = Staffs.get({ 
				staffId: $stateParams.staffId
			});
		};
	}
]);
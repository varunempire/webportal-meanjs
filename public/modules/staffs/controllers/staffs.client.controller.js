'use strict';

// Staffs controller
angular.module('staffs').controller('StaffsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Staffs',
	function($scope, $http, $stateParams, $location, Authentication, Staffs) {
		$scope.authentication = Authentication;
		$scope.clear = function () {
			$scope.dateofbirth = null;
		};


		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;

		};
		$scope.staffcredentials ={};

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
				staffid:this.staffid,
				designation:this.designation
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
				debugger;
				$scope.staffcredentials.firstName = response.name;
				$scope.staffcredentials.lastName = response.name;
				$scope.staffcredentials.email = response.mail;
				$scope.staffcredentials.username = response.name.toLowerCase()+''+response.staffid;
				$scope.staffcredentials.password = response.name.toLowerCase()+''+response.staffid;
				$scope.staffcredentials.confirmpassword = $scope.staffcredentials.password;
				$scope.staffcredentials.roles = ['staff'];

				$http.post('/auth/signup', $scope.staffcredentials).success(function(res) {
					$location.path('staffs/' + response._id);

					// Clear form fields
					$scope.name = '';
				}).error(function(res) {
					$scope.error = res.message;
				});
				//$location.path('staffs/' + response._id);

				// Clear form fields
				//$scope.name = '';
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
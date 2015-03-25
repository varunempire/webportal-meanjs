'use strict';

// Addstudents controller
angular.module('addstudents').controller('AddstudentsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Addstudents',
	function($scope, $http, $stateParams, $location, Authentication, Addstudents) {
		$scope.authentication = Authentication;

		
		$scope.clear = function () {
			$scope.dateofbirth = null;
		};


		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		$scope.radioModel = 'dayscholar';
		$scope.stucredentials ={};

		// Create new Addstudent
		$scope.create = function() {
			// Create new Addstudent object
			var addstudent = new Addstudents ({
				name: this.name,
				dateofbirth: this.dateofbirth,
				rollno: this.rollno,
				regno: this.regno,
				course: this.course,
				dept: this.dept,
				year: this.year,
				section: this.section,
				mail: this.mail,
				mobile: this.mobile,
				blood: this.blood,
				bus: this.bus,
				presentaddress: this.presentaddress,
				permanentaddress: this.permanentaddress,
				fname: this.fname,
				occupation: this.occupation,
				fmobno: this.fmobno,
				mname: this.mname,
				moccupation: this.moccupation,
				mmobno: this.mmobno,
				roomno: this.roomno,
				localgaddress: this.localgaddress,
				doj: this.doj

			});

			// Redirect after save
			addstudent.$save(function(response) {

				$scope.stucredentials.firstName = response.name;
				$scope.stucredentials.lastName = response.name;
				$scope.stucredentials.email = response.mail;
				$scope.stucredentials.username = response.year+''+response.dept+''+response.regno;
				$scope.stucredentials.password = response.year+''+response.dept+''+response.regno;
				$scope.stucredentials.confirmpassword = $scope.stucredentials.password;

				$http.post('/auth/signup', $scope.stucredentials).success(function(res) {
					$location.path('addstudents/' + response._id);

					// Clear form fields
					$scope.name = '';
				}).error(function(res) {
					$scope.error = res.message;
				});

				
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
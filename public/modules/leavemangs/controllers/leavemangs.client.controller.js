'use strict';

// Leavemangs controller
angular.module('leavemangs').controller('LeavemangsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Leavemangs',
	function($scope, $stateParams, $location, Authentication, Leavemangs) {
		$scope.authentication = Authentication;

		  $scope.dateTimeNow = function() {
    			$scope.fmdate = new Date();
    			$scope.todate = new Date();
		  };
		  $scope.dateTimeNow();
		  
		  $scope.toggleMinDate = function() {
		    $scope.minDate = $scope.minDate ? null : new Date();
		  };
		   
		  $scope.maxDate = new Date('2014-06-22');
		  $scope.toggleMinDate();

		  $scope.dateOptions = {
		    startingDay: 1,
		    showWeeks: false
		  };
		  
		  // Disable weekend selection
		  $scope.disabled = function(calendarDate, mode) {
		    return mode === 'day' && ( calendarDate.getDay() === 0 || calendarDate.getDay() === 6 );
		  };


		  $scope.showMeridian = true;

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
				fmdate: this.fmdate,
				todate: this.todate,
				staffname: this.staffname,
				reasontype: this.reasontype,
				leavereason: this.leavereason,
				leavetype: this.leavetype,

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
'use strict';

// Leavemangs controller
angular.module('leavemangs').controller('LeavemangsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Leavemangs',
	function($scope, $stateParams, $location, Authentication, Leavemangs) {
		$scope.authentication = Authentication;


		  $scope.gridOptions = {};
		  $scope.gridOptions.data = 'myData';
		  $scope.gridOptions.enableColumnResizing = true;
		  $scope.gridOptions.enableFiltering = true;
		  $scope.gridOptions.enableGridMenu = true;
		  $scope.gridOptions.showGridFooter = true;
		  $scope.gridOptions.showColumnFooter = true;
		  $scope.myData = Leavemangs.query();
		  $scope.gridOptions.rowIdentity = function(row) {
		    return row.id;
		  };
		  $scope.gridOptions.getRowIdentity = function(row) {
		    return row.id;
		  };
		 
		  $scope.status = 'pending';
		  $scope.approved = function(val){			  	
			  
			  $scope.leavemang = Leavemangs.get({ 
					leavemangId: val
				}).$promise.then(function(response){
					console.log(response.status+'---'+angular.toJson(response));	
					response.status = 'approved';
				  	var leavemang = response;
				  	leavemang.$update(function() {
				  		$scope.refreshData();
				  		//$location.path('leavemangs');
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				});
		  	
        };

        $scope.cancel = function(val){
        	 $scope.leavemang = Leavemangs.get({ 
					leavemangId: val
				}).$promise.then(function(response){
					console.log(response.status+'---'+angular.toJson(response));	
					response.status = 'canceled';
				  	var leavemang = response;
				  	leavemang.$update(function() {
				  		$scope.refreshData();
				  		//$location.path('leavemangs');
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				});
        };

		  $scope.gridOptions.columnDefs = [
		    { name:'_id', width:150 , visible:true, enableFiltering :false, cellTemplate: '<button class="btn btn-success btn-xs" ng-click="grid.appScope.approved(COL_FIELD)"><span class="h4-circle-active">Approve	<i class="glyphicon glyphicon-ok"></i></span></button><button class="btn btn-danger btn-xs" ng-click="grid.appScope.cancel(COL_FIELD)"><span class="h4-circle-active">Cancel <i class="glyphicon glyphicon-remove"></i></span></button>' },
		    { name:'reasontype', width:150 },
		    { name:'staffname', width:150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'   },
		    { name:'leavereason', width:150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },
		    { name:'leavetype', width:150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },
		    { name:'status', width:150 },
		    { name:'fmdate', width:150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },
		    { name:'todate', width:150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  }
		     ];
		     
		 // $scope.columns[0].visible;
		  $scope.callsPending = 0;
		 
		  var i = 0;
		  $scope.refreshData = function(){
		    $scope.myData = Leavemangs.query();
		  };


		  
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
				status: this.status

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
			debugger;
			$scope.leavemang = Leavemangs.get({ 
				leavemangId: $stateParams.leavemangId
			});
		};
	}
]);
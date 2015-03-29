'use strict';

// Leavemangs controller
angular.module('leavemangs').controller('LeavemangsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Staffs', 'Addstudents', 'Leavemangs',
	function($scope, $stateParams, $location, Authentication, Staffs, Addstudents, Leavemangs) {
		$scope.authentication = Authentication;

		 
		  $scope.gridOptions = {};
		  $scope.gridOptions.data = 'myData';
		  $scope.gridOptions.enableColumnResizing = true;
		  $scope.gridOptions.enableFiltering = true;
		  $scope.gridOptions.enableGridMenu = true;
		  $scope.gridOptions.showGridFooter = true;
		  $scope.gridOptions.showColumnFooter = true;
		  //$scope.myData = Leavemangs.query();
		  $scope.gridOptions.rowIdentity = function(row) {
		    return row.id;
		  };
		  $scope.gridOptions.getRowIdentity = function(row) {
		    return row.id;
		  };
		 
		  Staffs.query().$promise.then(function(response){				
			$scope.staffitems = _.uniq(_.pluck(response, 'username'))
		  });
		  
		  $scope.status = 'pending';
		  $scope.approved = function(val){			  	
			  $scope.leavemang = Leavemangs.get({ 
					leavemangId: val
				}).$promise.then(function(response){
					response.status = 'approved';
				  	var leavemang = response;
				  	leavemang.$update(function() {
				  		$scope.refreshData();
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				});
		  	
        };

        $scope.cancel = function(val){
        	 $scope.leavemang = Leavemangs.get({ 
					leavemangId: val
				}).$promise.then(function(response){					
					response.status = 'canceled';
					//response.user._id = $scope.authentication.user._id;
					//response.user.displayName = $scope.authentication.user.displayName;
				  	var leavemang = response;
				  	
				  	leavemang.$update(function() {
				  		$scope.refreshData();
				  		//$location.path('leavemangs');
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				});
        };
         
        Addstudents.query().$promise.then(function(response){
			  $scope.studentInfo = _.where(response, { 'username': $scope.authentication.user.username});
		  });
        
        $scope.viewdetails = function(val){
          $location.path('leavemangs/'+val);
        }
        
      if ($scope.authentication.user.role === 'student'){
    	  $scope.gridOptions.columnDefs = [
       	                       		    { name:'_id', width:150 , enableSorting: false, enableColumnMenu: false, displayName: 'Status Update', visible:true, enableFiltering :false, cellTemplate: ' <button class="btn btn-info btn-xs"  ng-click="grid.appScope.viewdetails(COL_FIELD)"><span class="h4-circle-active">View Details <i class="glyphicon glyphicon-ok"></i></span></button>' },
       	                       		    { name:'name', width:150, displayName: 'Student Name' },
       	                       		    { name:'dept', width:150, displayName: 'Department' },
       	                       		    { name:'status', width:150, displayName: 'Status' },
       	                       		    { name:'leavetype', displayName: 'Leave Type', width:150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },
       	                       		    { name:'reasontype', width:150, displayName: 'Reason Type' },
       	                       		    { name:'staffusername', width:150, displayName: 'Staff Name', enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'   },
       	                       		    { name:'leavereason', width:150, displayName: 'Leave Reason',  enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },		    
       	                       		    { name:'fmdate', width:200, enableCellEdit: true, displayName: 'From Date', cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },
       	                       		    { name:'todate', width:200, enableCellEdit: true, displayName: 'To Date', cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },
       	                       		    { name:'rollno', width:150, displayName: 'Roll No' },
       	                       		    { name:'course', width:150, displayName: 'Course' },
       	                       		    { name:'year', width:150, displayName: 'Year' },
       	                       		    { name:'section', width:150, displayName: 'Section' }
       	                       		     ];
      }else{
    	  $scope.gridOptions.columnDefs = [
	                       		    { name:'_id', width:150 , enableSorting: false, enableColumnMenu: false, displayName: 'Status Update', visible:true, enableFiltering :false, cellTemplate: ' <button class="btn btn-success btn-xs"  ng-click="grid.appScope.approved(COL_FIELD)"><span class="h4-circle-active">Approve	<i class="glyphicon glyphicon-ok"></i></span></button><button class="btn btn-danger btn-xs"  ng-click="grid.appScope.cancel(COL_FIELD)"><span class="h4-circle-active">Cancel <i class="glyphicon glyphicon-remove"></i></span></button>' },
	                       		    { name:'name', width:150, displayName: 'Student Name' },
	                       		    { name:'dept', width:150, displayName: 'Department' },
	                       		    { name:'status', width:150, displayName: 'Status' },
	                       		    { name:'leavetype', displayName: 'Leave Type', width:150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },
	                       		    { name:'reasontype', width:150, displayName: 'Reason Type' },
	                       		    { name:'staffusername', width:150, displayName: 'Staff Name', enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'   },
	                       		    { name:'leavereason', width:150, displayName: 'Leave Reason',  enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },		    
	                       		    { name:'fmdate', width:200, enableCellEdit: true, displayName: 'From Date', cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },
	                       		    { name:'todate', width:200, enableCellEdit: true, displayName: 'To Date', cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },
	                       		    { name:'rollno', width:150, displayName: 'Roll No' },
	                       		    { name:'course', width:150, displayName: 'Course' },
	                       		    { name:'year', width:150, displayName: 'Year' },
	                       		    { name:'section', width:150, displayName: 'Section' }
	                       		    ];
      }
		  
		     
		 // $scope.columns[0].visible;
		  $scope.callsPending = 0;
		 
		  var i = 0;
		  $scope.refreshData = function(){
			  if($scope.authentication.user.role === 'student'){
				  $scope.myData = Leavemangs.query();
				  Leavemangs.query().$promise.then(function(response){
					  debugger;
					  $scope.myData = _.where(response, { 'studentusername': $scope.authentication.user.username});					 
				  });
				}else{
					$scope.myData = Leavemangs.query();
				}			  
		  };

		  if($scope.authentication.user.role === 'student'){
			  Leavemangs.query().$promise.then(function(response){
				  $scope.myData = _.where(response, { 'studentusername': $scope.authentication.user.username});
			  });
			}else{
				$scope.myData = Leavemangs.query();
			}
		  
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
		 /* $scope.disabled = function(calendarDate, mode) {
		    return mode === 'day' && ( calendarDate.getDay() === 0 || calendarDate.getDay() === 6 );
		  };*/


		  $scope.showMeridian = true;

		// Create new Leavemang
		$scope.create = function() {
			// Create new Leavemang object
			
			if(_.isEmpty(this.staffusername) || _.isUndefined(this.staffusername)){
				$scope.success = '';
				$scope.error = 'Please enter a staff name.';
				return;
			}else if(_.isEmpty(this.leavereason) || _.isUndefined(this.leavereason)){
				$scope.success = '';
				$scope.error = 'Please enter a leave reason.';
				return;
			}
		
			var leavemang = new Leavemangs ({
				name: $scope.studentInfo[0].name,
				rollno: $scope.studentInfo[0].rollno,
				course: $scope.studentInfo[0].course,
				dept: $scope.studentInfo[0].dept,
				year: $scope.studentInfo[0].year,
				section: $scope.studentInfo[0].section,
				reason: this.reason,
				fmdate: this.fmdate,
				todate: this.todate,
				staffname: this.staffname,
				reasontype: this.reasontype,
				leavereason: this.leavereason,
				leavetype: this.leavetype,
				status: this.status,
				staffusername: this.staffusername,
				studentusername: $scope.authentication.user.username

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
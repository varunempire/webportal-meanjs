'use strict';

// Addstudents controller
angular.module('addstudents').controller('AddstudentsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Addstudents',
	function($scope, $http, $stateParams, $location, Authentication, Addstudents) {
		$scope.authentication = Authentication;

		$scope.onlyNumbers = /^\d+$/;
		
		$scope.clear = function () {
			$scope.dateofbirth = null;
		};
		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		//Grid
	  $scope.gridOptions = {};
	  $scope.gridOptions.data = 'myData';
	  $scope.gridOptions.enableColumnResizing = true;
	  $scope.gridOptions.enableFiltering = true;
	  $scope.gridOptions.enableGridMenu = true;
	  $scope.gridOptions.showGridFooter = true;
	  $scope.gridOptions.showColumnFooter = true;
	  $scope.myData = Addstudents.query();
	  $scope.gridOptions.rowIdentity = function(row) {
	    return row.id;
	  };
	  $scope.gridOptions.getRowIdentity = function(row) {
	    return row.id;
	  };
	 
	  $scope.status = 'pending';
	  $scope.approved = function(val){			  	
		  $location.path('addstudents/'+val);		  	
      };


	  $scope.gridOptions.columnDefs = [
	    { name:'_id', width:150 , enableSorting: false, enableColumnMenu: false, displayName: 'Information', visible:true, enableFiltering :false, cellTemplate: '<button class="btn btn-info btn-xs" style="margin-left:20px;" ng-click="grid.appScope.approved(COL_FIELD)"><span class="h4-circle-active">View	Profile <i class="glyphicon glyphicon-user"></i></span></button>' },
	    { name:'name', displayName: 'Name', width:150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },	    
	    { name:'rollno', width:150, displayName: 'Roll No..', enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'   },
	    { name:'regno', width:150, displayName: 'Register No',  enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },		    
	    { name:'course', width:150, displayName: 'Course' },
	    { name:'dept', width:200, enableCellEdit: true, displayName: 'Department', cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },
	    { name:'year', width:150, displayName: 'Year' },
	    { name:'section', width:150, displayName: 'Section' },
	    { name:'mail', width:200, enableCellEdit: true, displayName: 'Mail ID', cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },
	    { name:'mobile', width:150, displayName: 'Mobile' }
	     ];
	     
	 // $scope.columns[0].visible;
	  $scope.callsPending = 0;
	 
	  var i = 0;
	  $scope.refreshData = function(){
	    $scope.myData = Leavemangs.query();
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
				
				console.log($scope.stucredentials.username+'---'+$scope.stucredentials.password);				
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
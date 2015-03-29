'use strict';

// Staffs controller
angular.module('staffs').controller('StaffsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Staffs',
	function($scope, $http, $stateParams, $location, Authentication, Staffs) {
		$scope.authentication = Authentication;
		
		$scope.clear = function () {
			$scope.dateofbirth = null;
		};

		$scope.isPlacement = false;
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
		  
		 
		  

		  if($scope.authentication.user.role === 'staff'){
			  Staffs.query().$promise.then(function(response){
				  $scope.myData = _.where(response, { 'username': $scope.authentication.user.username});
			  });
			}else{
				$scope.myData = Staffs.query();
			}
		  
		  
		  $scope.gridOptions.rowIdentity = function(row) {
		    return row.id;
		  };
		  $scope.gridOptions.getRowIdentity = function(row) {
		    return row.id;
		  };
		 
		  $scope.status = 'pending';
		  $scope.approved = function(val){			  	
			  $location.path('staffs/'+val);		  	
	      };


		  $scope.gridOptions.columnDefs = [
		    { name:'_id', width:150 , enableSorting: false, enableColumnMenu: false, displayName: 'Information', visible:true, enableFiltering :false, cellTemplate: '<button class="btn btn-info btn-xs" style="margin-left:20px;" ng-click="grid.appScope.approved(COL_FIELD)"><span class="h4-circle-active">View	Profile <i class="glyphicon glyphicon-user"></i></span></button>' },
		    { name:'username', enableSorting: false,  enableFiltering :false, enableColumnMenu: false, width:150, displayName: 'User Name' },
		    { name:'name', displayName: 'Name', width:150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },	    
		    { name:'dept', width:150, displayName: 'Department', enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'   },
		    { name:'staffid', width:150, displayName: 'Staff Id',  enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },		    
		    { name:'mail', width:150, displayName: 'Mail Id' },
		    { name:'mob', width:200, enableCellEdit: true, displayName: 'Mobile No', cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },
		    { name:'experience', width:150, displayName: 'Experience' },
		    { name:'designation', width:150, displayName: 'Designation' },
		    { name:'qualification', width:200, enableCellEdit: true, displayName: 'Qualification', cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },
		    { name:'gender', width:150, displayName: 'Gender' },
		    { name:'isPlacement', width:150, displayName: 'Placement Officer' }
		     ];
		     
		 // $scope.columns[0].visible;
		  $scope.callsPending = 0;
		 
		  var i = 0;
		  $scope.refreshData = function(){
		    $scope.myData = Staffs.query();
		  };
		
		$scope.staffcredentials ={};

		// Create new Staff
		$scope.create = function() {
			// Create new Staff object
			
			if(!_.isNumber(this.staffid) || _.isUndefined(this.staffid)){
				$scope.success = '';
				$scope.error = 'Staff ID - Please enter a valid number.';
				return;
			}else if(!_.isNumber(this.mob) || _.isUndefined(this.mob)){
				$scope.success = '';
				$scope.error = 'Mobile No - Please enter a valid number.';
				return;
			}else if(!_.isNumber(this.experience) || _.isUndefined(this.experience)){
				$scope.success = '';
				$scope.error = 'Experience - Please enter a valid number.';
				return;
			}
			/*if($scope.isPlacement === true){
				$scope.isPlacement = 'YES';
			}else{
				$scope.isPlacement = 'NO';
			}*/
			var staff = new Staffs ({
				name: this.name,
				lname: this.lname,
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
				designation:this.designation,
				username: this.name.toLowerCase()+''+this.staffid,
				role: 'staff',
				isPlacement:this.isPlacement
			});

			// Redirect after save
			staff.$save(function(response) {
				
				$scope.staffcredentials.firstName = response.name;
				$scope.staffcredentials.lastName = response.name;
				$scope.staffcredentials.email = response.mail;
				$scope.staffcredentials.username = response.username;
				$scope.staffcredentials.password = response.username;
				$scope.staffcredentials.confirmpassword = $scope.staffcredentials.password;
				//$scope.staffcredentials.roles = ['staff'];
				$scope.staffcredentials.role =response.role;
				$http.post('/auth/signup', $scope.staffcredentials).success(function(res) {
					$location.path('staffs/' + response._id);
					$scope.name = '';
				}).error(function(res) {
					$scope.error = res.message;
				});				
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
			if($scope.authentication.user.role === 'staff'){
				$scope.staffs = Staffs.get({ 
					staffId: $stateParams.staffId
				});
			}else{
				$scope.staffs = Staffs.query();
			}
			
		};

		// Find existing Staff
		$scope.findOne = function() {
			$scope.staff = Staffs.get({ 
				staffId: $stateParams.staffId
			});
		};
	}
]);
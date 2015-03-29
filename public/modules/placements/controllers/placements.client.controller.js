'use strict';

// Placements controller
angular.module('placements').controller('PlacementsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Staffs', 'Placements', '$timeout', '$upload',
	function($scope, $stateParams, $location, Authentication, Staffs, Placements, $timeout, $upload) {
		$scope.authentication = Authentication;
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
		  
		 
		  if($scope.authentication.user.role === 'staff'){
			  Placements.query().$promise.then(function(response){
				  $scope.myData = _.where(response, { 'staffusername': $scope.authentication.user.username});
			  });
			}else if($scope.authentication.user.role === 'student'){
				Placements.query().$promise.then(function(response){
					  $scope.myData = _.where(response, { 'studentusername': $scope.authentication.user.username});
				  });
			}else{
				$scope.myData = Placements.query();
			}
		  
		  
		  $scope.gridOptions.rowIdentity = function(row) {
		    return row.id;
		  };
		  $scope.gridOptions.getRowIdentity = function(row) {
		    return row.id;
		  };
		 
		  $scope.status = 'pending';
		  $scope.approved = function(val){			  	
			  $location.path('placements/'+val);		  	
	      };
	      
	      Staffs.query().$promise.then(function(response){	    	
				$scope.staffitems = _.uniq(_.pluck(_.where(response, { 'isPlacement': true}), 'username'));
			  });
	      
		  $scope.gridOptions.columnDefs = [
		    { name:'_id', width:150 , enableSorting: false, enableColumnMenu: false, displayName: 'Information', visible:true, enableFiltering :false, cellTemplate: '<button class="btn btn-info btn-xs" style="margin-left:20px;" ng-click="grid.appScope.approved(COL_FIELD)"><span class="h4-circle-active">View	Profile <i class="glyphicon glyphicon-user"></i></span></button>' },
		    { name:'fname', enableSorting: false,  enableFiltering :false, enableColumnMenu: false, width:150, displayName: 'First Name' },
		    { name:'course', displayName: 'Course', width:150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },	    
		    { name:'dept', width:150, displayName: 'Department', enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'   },
		    { name:'rollno', width:150, displayName: 'Rollno',  enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },		    
		    { name:'year', width:150, displayName: 'Year' },
		    { name:'mail', width:150, displayName: 'Mail Id' },
		    { name:'preaddress', width:200, enableCellEdit: true, displayName: 'Present address', cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },
		    { name:'nation', width:150, displayName: 'Nationality' },
		    { name:'sex', width:150, displayName: 'Sex' },
		    { name:'mobno', width:200, enableCellEdit: true, displayName: 'Mobile Number', cellTemplate: '<div class="ui-grid-cell-contents"><span>{{COL_FIELD}}</span></div>'  },
		    { name:'community', width:150, displayName: 'Community' },
		    { name:'cursem', width:150, displayName: 'Current semester' }
		     ];
		     
		 // $scope.columns[0].visible;
		  $scope.callsPending = 0;
		 
		  var i = 0;
		  $scope.refreshData = function(){
		    $scope.myData = Placements.query();
		  };
		  
		  
		  
		// Create new Placement
		$scope.create = function() {
			// Create new Placement object
			
			var placement = new Placements ({
				fname: this.fname,
				dept: this.dept,
				preaddress: this.preaddress,
				mail: this.mail,
				caste: this.caste,
				lname: this.lname,
				year: this.year,
				peraddress: this.peraddress,
				nation: this.nation,
				sex: this.sex,
				course: this.course,
				rollno: this.rollno,
				mobno: this.mobno,
				community: this.community,
				dob: this.dob,
				cursem: this.cursem,
				xmedofstudy: this.xmedofstudy,
				totalper: this.totalper,
				gpa: this.gpa,
				cgpa: this.cgpa,
				scname: this.scname,
				sclocation: this.sclocation,
				staffusername: this.staffusername,
				studentusername: $scope.authentication.user.username
			});

			// Redirect after save
			placement.$save(function(response) {
				$location.path('placements/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Placement
		$scope.remove = function(placement) {
			if ( placement ) { 
				placement.$remove();

				for (var i in $scope.placements) {
					if ($scope.placements [i] === placement) {
						$scope.placements.splice(i, 1);
					}
				}
			} else {
				$scope.placement.$remove(function() {
					$location.path('placements');
				});
			}
		};

		// Update existing Placement
		$scope.update = function() {
			var placement = $scope.placement;

			placement.$update(function() {
				$location.path('placements/' + placement._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Placements
		$scope.find = function() {
			$scope.placements = Placements.query();
		};

		// Find existing Placement
		$scope.findOne = function() {
			$scope.placement = Placements.get({ 
				placementId: $stateParams.placementId
			});
		};
		
		$scope.selectedFiles = [];
		$scope.progress = [];
        $scope.upload = [];
        $scope.uploadResult = [];
        $scope.dataUrls = [];
        
		$scope.onFileSelect = function ($files) {
		  	
	        $scope.selectedFiles = $files;
	        
	        //limite
	        if($files.length>4)
				{$files.length=4;}
	        
	        for (var i = 0; i < $files.length; i++) {
	            var $file = $files[i];
	            if (window.FileReader) {
	                var fileReader = new FileReader();
	                fileReader.readAsDataURL($files[i]);
	                function setPreview(fileReader, index) {
	                    fileReader.onload = function (e) {
	                        $timeout(function () {
	                            $scope.dataUrls[index] = e.target.result;
	                        });
	                    }
	                };
	
	                setPreview(fileReader, i);
	            }
	            $scope.progress[i] = -1;
	        }
    
	  };
	}
]);
'use strict';

// Addbooks controller
angular.module('addbooks').controller('AddbooksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Addbooks', 
'$http', '$timeout', '$upload',
	function($scope, $stateParams, $location, Authentication, Addbooks, $http, $timeout, $upload) {
		$scope.authentication = Authentication;
		$scope.param={};
		//image		
		$scope.uploadRightAway = false; 

		$scope.clear = function () {
			$scope.dateofbirth = null;
		};
		
		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;

		};
		
		$scope.booktype = 'department';
		
		// Create new Addbook
		$scope.create = function() {
			
			//debugger;
			//image
			console.log($scope.selectedFiles.length);
	    	  //$files = $scope.selectedFiles;
	        $scope.progress[index] = 0;
	        console.log('starting...');
	        //console.log($files);
	        $scope.paths = [];
		    for (var index = 0; index < $scope.selectedFiles.length; index++) {
		        console.log('path= '+$scope.selectedFiles[index].name);
		        $scope.paths[index] = './uploads/'+$scope.selectedFiles[index].name; 
		        $scope.upload[index] = $upload.upload({
		        		method: 'POST',
		            url: 'upload',
		            headers: {'Content-Type': 'multipart/form-data' },
		            file: $scope.selectedFiles[index],
		            fileFormDataName: 'myFile'
		                    }).then(function (_result) {
		                console.log('$upload: ' + JSON.stringify(_result));
		                //file.cancel()
		                $scope._id =  _result.data.doc._id;
		            
			// Create new Addbook object
			var addbook = new Addbooks ({
				_id: $scope._id,
				name: $scope.name,
				bookno: $scope.bookno,
				publisher: $scope.publisher,
				code: $scope.code,
				edition: $scope.edition,				
				author: $scope.author,
				course: $scope.course,
				dept: $scope.dept,
				year: $scope.year,
				sem: $scope.sem,
				/*avbooks: $scope.avbooks,*/				
				/*download: $scope.download,*/
				//edit: $scope.edit,
				//image: $scope.paths,
				
				booktype: $scope.booktype,
				date: $scope.date
				/*sno: $scope.sno,*/
				/*copy: $scope.copy,*/
				/*regbook: $scope.regbook,
				issue: $scope.issue,
				penalty: $scope.penalty,
				renewal: $scope.renewal,
				mag: $scope.mag,
				smag: $scope.smag,
				Journals: $scope.Journals,
				newspaper: $scope.newspaper*/
			});

			// Redirect after save
			addbook.$update(function(response) {
				$location.path('addbooks/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		                    }, function error(err) {
				                console.log('[$upload] received error: ' + JSON.stringify(err));
				            });
				        
				        }
				    console.log('hang...');
		};

		// Remove existing Addbook
		$scope.remove = function(addbook) {
			if ( addbook ) { 
				addbook.$remove();

				for (var i in $scope.addbooks) {
					if ($scope.addbooks [i] === addbook) {
						$scope.addbooks.splice(i, 1);
					}
				}
			} else {
				$scope.addbook.$remove(function() {
					$location.path('addbooks');
				});
			}
		};

		// Update existing Addbook
		$scope.update = function() {
			var addbook = $scope.addbook;

			addbook.$update(function() {
				$location.path('addbooks/' + addbook._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Addbooks
		$scope.find = function() {
			$scope.addbooks = Addbooks.query();			  
		};

		// Find existing Addbook
		$scope.findOne = function() {
			$scope.addbook = Addbooks.get({ 
				addbookId: $stateParams.addbookId
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
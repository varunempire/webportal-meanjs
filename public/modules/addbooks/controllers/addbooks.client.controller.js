'use strict';

// Addbooks controller
angular.module('addbooks').controller('AddbooksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Addbooks', '$timeout', '$upload',
	function($scope, $stateParams, $location, Authentication, Addbooks, $timeout, $upload) {
		$scope.authentication = Authentication;

		// Create new Addbook
		$scope.create = function() {
			
			//image
			console.log($scope.selectedFiles.length);
	    	$files = $scope.selectedFiles;
	        $scope.progress[index] = 0;
	        console.log('starting...');
	        console.log($files);
	        $scope.paths = [];
		    for (var index = 0; index < $files.length; index++) {
		        console.log('path= '+$files[index].name);
		        $scope.paths[index] = './uploads/'+$files[index].name; 
		        $scope.upload[index] = $upload.upload({
		        		method: 'POST',
		            url: 'upload',
		            headers: {'Content-Type': 'multipart/form-data' },
		            file: $scope.selectedFiles[index],
		            fileFormDataName: 'myFile'
		                    }).then(function (_result) {
		                console.log('$upload: ' + JSON.stringify(_result));
		                //file.cancel()
		            }, function error(err) {
		                console.log('[$upload] received error: ' + JSON.stringify(err));
		            });
		        
		        }
		    console.log('hang...');
	    
			// Create new Addbook object
			var addbook = new Addbooks ({
				name: this.name,
				bookno: this.bookno,
				course: this.course,
				dept: this.dept,
				year: this.year,
				sem: this.sem,
				avbooks: this.avbooks,
				edition: this.edition,
				publisher: this.publisher,
				author: this.author,
				download: this.download,
				//edit: this.edit,
				image: $scope.paths,
				code: this.code,
				sno: this.sno,
				copy: this.copy,
				regbook: this.regbook,
				issue: this.issue,
				penalty: this.penalty,
				renewal: this.renewal,
				mag: this.mag,
				smag: this.smag,
				Journals: this.Journals,
				newspaper: this.newspaper
			});

			// Redirect after save
			addbook.$save(function(response) {
				$location.path('addbooks/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
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
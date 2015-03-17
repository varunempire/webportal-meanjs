'use strict';

// Addbooks controller
angular.module('addbooks').controller('AddbooksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Addbooks',
	function($scope, $stateParams, $location, Authentication, Addbooks) {
		$scope.authentication = Authentication;

		// Create new Addbook
		$scope.create = function() {
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
				edit: this.edit,
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
	}
]);
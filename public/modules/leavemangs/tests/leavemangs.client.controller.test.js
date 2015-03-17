'use strict';

(function() {
	// Leavemangs Controller Spec
	describe('Leavemangs Controller Tests', function() {
		// Initialize global variables
		var LeavemangsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Leavemangs controller.
			LeavemangsController = $controller('LeavemangsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Leavemang object fetched from XHR', inject(function(Leavemangs) {
			// Create sample Leavemang using the Leavemangs service
			var sampleLeavemang = new Leavemangs({
				name: 'New Leavemang'
			});

			// Create a sample Leavemangs array that includes the new Leavemang
			var sampleLeavemangs = [sampleLeavemang];

			// Set GET response
			$httpBackend.expectGET('leavemangs').respond(sampleLeavemangs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.leavemangs).toEqualData(sampleLeavemangs);
		}));

		it('$scope.findOne() should create an array with one Leavemang object fetched from XHR using a leavemangId URL parameter', inject(function(Leavemangs) {
			// Define a sample Leavemang object
			var sampleLeavemang = new Leavemangs({
				name: 'New Leavemang'
			});

			// Set the URL parameter
			$stateParams.leavemangId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/leavemangs\/([0-9a-fA-F]{24})$/).respond(sampleLeavemang);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.leavemang).toEqualData(sampleLeavemang);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Leavemangs) {
			// Create a sample Leavemang object
			var sampleLeavemangPostData = new Leavemangs({
				name: 'New Leavemang'
			});

			// Create a sample Leavemang response
			var sampleLeavemangResponse = new Leavemangs({
				_id: '525cf20451979dea2c000001',
				name: 'New Leavemang'
			});

			// Fixture mock form input values
			scope.name = 'New Leavemang';

			// Set POST response
			$httpBackend.expectPOST('leavemangs', sampleLeavemangPostData).respond(sampleLeavemangResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Leavemang was created
			expect($location.path()).toBe('/leavemangs/' + sampleLeavemangResponse._id);
		}));

		it('$scope.update() should update a valid Leavemang', inject(function(Leavemangs) {
			// Define a sample Leavemang put data
			var sampleLeavemangPutData = new Leavemangs({
				_id: '525cf20451979dea2c000001',
				name: 'New Leavemang'
			});

			// Mock Leavemang in scope
			scope.leavemang = sampleLeavemangPutData;

			// Set PUT response
			$httpBackend.expectPUT(/leavemangs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/leavemangs/' + sampleLeavemangPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid leavemangId and remove the Leavemang from the scope', inject(function(Leavemangs) {
			// Create new Leavemang object
			var sampleLeavemang = new Leavemangs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Leavemangs array and include the Leavemang
			scope.leavemangs = [sampleLeavemang];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/leavemangs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleLeavemang);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.leavemangs.length).toBe(0);
		}));
	});
}());
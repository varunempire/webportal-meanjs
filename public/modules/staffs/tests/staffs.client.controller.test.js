'use strict';

(function() {
	// Staffs Controller Spec
	describe('Staffs Controller Tests', function() {
		// Initialize global variables
		var StaffsController,
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

			// Initialize the Staffs controller.
			StaffsController = $controller('StaffsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Staff object fetched from XHR', inject(function(Staffs) {
			// Create sample Staff using the Staffs service
			var sampleStaff = new Staffs({
				name: 'New Staff'
			});

			// Create a sample Staffs array that includes the new Staff
			var sampleStaffs = [sampleStaff];

			// Set GET response
			$httpBackend.expectGET('staffs').respond(sampleStaffs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.staffs).toEqualData(sampleStaffs);
		}));

		it('$scope.findOne() should create an array with one Staff object fetched from XHR using a staffId URL parameter', inject(function(Staffs) {
			// Define a sample Staff object
			var sampleStaff = new Staffs({
				name: 'New Staff'
			});

			// Set the URL parameter
			$stateParams.staffId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/staffs\/([0-9a-fA-F]{24})$/).respond(sampleStaff);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.staff).toEqualData(sampleStaff);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Staffs) {
			// Create a sample Staff object
			var sampleStaffPostData = new Staffs({
				name: 'New Staff'
			});

			// Create a sample Staff response
			var sampleStaffResponse = new Staffs({
				_id: '525cf20451979dea2c000001',
				name: 'New Staff'
			});

			// Fixture mock form input values
			scope.name = 'New Staff';

			// Set POST response
			$httpBackend.expectPOST('staffs', sampleStaffPostData).respond(sampleStaffResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Staff was created
			expect($location.path()).toBe('/staffs/' + sampleStaffResponse._id);
		}));

		it('$scope.update() should update a valid Staff', inject(function(Staffs) {
			// Define a sample Staff put data
			var sampleStaffPutData = new Staffs({
				_id: '525cf20451979dea2c000001',
				name: 'New Staff'
			});

			// Mock Staff in scope
			scope.staff = sampleStaffPutData;

			// Set PUT response
			$httpBackend.expectPUT(/staffs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/staffs/' + sampleStaffPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid staffId and remove the Staff from the scope', inject(function(Staffs) {
			// Create new Staff object
			var sampleStaff = new Staffs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Staffs array and include the Staff
			scope.staffs = [sampleStaff];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/staffs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleStaff);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.staffs.length).toBe(0);
		}));
	});
}());
'use strict';

(function() {
	// Addstudents Controller Spec
	describe('Addstudents Controller Tests', function() {
		// Initialize global variables
		var AddstudentsController,
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

			// Initialize the Addstudents controller.
			AddstudentsController = $controller('AddstudentsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Addstudent object fetched from XHR', inject(function(Addstudents) {
			// Create sample Addstudent using the Addstudents service
			var sampleAddstudent = new Addstudents({
				name: 'New Addstudent'
			});

			// Create a sample Addstudents array that includes the new Addstudent
			var sampleAddstudents = [sampleAddstudent];

			// Set GET response
			$httpBackend.expectGET('addstudents').respond(sampleAddstudents);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.addstudents).toEqualData(sampleAddstudents);
		}));

		it('$scope.findOne() should create an array with one Addstudent object fetched from XHR using a addstudentId URL parameter', inject(function(Addstudents) {
			// Define a sample Addstudent object
			var sampleAddstudent = new Addstudents({
				name: 'New Addstudent'
			});

			// Set the URL parameter
			$stateParams.addstudentId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/addstudents\/([0-9a-fA-F]{24})$/).respond(sampleAddstudent);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.addstudent).toEqualData(sampleAddstudent);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Addstudents) {
			// Create a sample Addstudent object
			var sampleAddstudentPostData = new Addstudents({
				name: 'New Addstudent'
			});

			// Create a sample Addstudent response
			var sampleAddstudentResponse = new Addstudents({
				_id: '525cf20451979dea2c000001',
				name: 'New Addstudent'
			});

			// Fixture mock form input values
			scope.name = 'New Addstudent';

			// Set POST response
			$httpBackend.expectPOST('addstudents', sampleAddstudentPostData).respond(sampleAddstudentResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Addstudent was created
			expect($location.path()).toBe('/addstudents/' + sampleAddstudentResponse._id);
		}));

		it('$scope.update() should update a valid Addstudent', inject(function(Addstudents) {
			// Define a sample Addstudent put data
			var sampleAddstudentPutData = new Addstudents({
				_id: '525cf20451979dea2c000001',
				name: 'New Addstudent'
			});

			// Mock Addstudent in scope
			scope.addstudent = sampleAddstudentPutData;

			// Set PUT response
			$httpBackend.expectPUT(/addstudents\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/addstudents/' + sampleAddstudentPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid addstudentId and remove the Addstudent from the scope', inject(function(Addstudents) {
			// Create new Addstudent object
			var sampleAddstudent = new Addstudents({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Addstudents array and include the Addstudent
			scope.addstudents = [sampleAddstudent];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/addstudents\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAddstudent);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.addstudents.length).toBe(0);
		}));
	});
}());
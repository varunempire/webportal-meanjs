'use strict';

(function() {
	// Addbooks Controller Spec
	describe('Addbooks Controller Tests', function() {
		// Initialize global variables
		var AddbooksController,
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

			// Initialize the Addbooks controller.
			AddbooksController = $controller('AddbooksController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Addbook object fetched from XHR', inject(function(Addbooks) {
			// Create sample Addbook using the Addbooks service
			var sampleAddbook = new Addbooks({
				name: 'New Addbook'
			});

			// Create a sample Addbooks array that includes the new Addbook
			var sampleAddbooks = [sampleAddbook];

			// Set GET response
			$httpBackend.expectGET('addbooks').respond(sampleAddbooks);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.addbooks).toEqualData(sampleAddbooks);
		}));

		it('$scope.findOne() should create an array with one Addbook object fetched from XHR using a addbookId URL parameter', inject(function(Addbooks) {
			// Define a sample Addbook object
			var sampleAddbook = new Addbooks({
				name: 'New Addbook'
			});

			// Set the URL parameter
			$stateParams.addbookId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/addbooks\/([0-9a-fA-F]{24})$/).respond(sampleAddbook);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.addbook).toEqualData(sampleAddbook);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Addbooks) {
			// Create a sample Addbook object
			var sampleAddbookPostData = new Addbooks({
				name: 'New Addbook'
			});

			// Create a sample Addbook response
			var sampleAddbookResponse = new Addbooks({
				_id: '525cf20451979dea2c000001',
				name: 'New Addbook'
			});

			// Fixture mock form input values
			scope.name = 'New Addbook';

			// Set POST response
			$httpBackend.expectPOST('addbooks', sampleAddbookPostData).respond(sampleAddbookResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Addbook was created
			expect($location.path()).toBe('/addbooks/' + sampleAddbookResponse._id);
		}));

		it('$scope.update() should update a valid Addbook', inject(function(Addbooks) {
			// Define a sample Addbook put data
			var sampleAddbookPutData = new Addbooks({
				_id: '525cf20451979dea2c000001',
				name: 'New Addbook'
			});

			// Mock Addbook in scope
			scope.addbook = sampleAddbookPutData;

			// Set PUT response
			$httpBackend.expectPUT(/addbooks\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/addbooks/' + sampleAddbookPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid addbookId and remove the Addbook from the scope', inject(function(Addbooks) {
			// Create new Addbook object
			var sampleAddbook = new Addbooks({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Addbooks array and include the Addbook
			scope.addbooks = [sampleAddbook];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/addbooks\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAddbook);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.addbooks.length).toBe(0);
		}));
	});
}());
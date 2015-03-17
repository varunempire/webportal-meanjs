'use strict';

(function() {
	// Placements Controller Spec
	describe('Placements Controller Tests', function() {
		// Initialize global variables
		var PlacementsController,
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

			// Initialize the Placements controller.
			PlacementsController = $controller('PlacementsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Placement object fetched from XHR', inject(function(Placements) {
			// Create sample Placement using the Placements service
			var samplePlacement = new Placements({
				name: 'New Placement'
			});

			// Create a sample Placements array that includes the new Placement
			var samplePlacements = [samplePlacement];

			// Set GET response
			$httpBackend.expectGET('placements').respond(samplePlacements);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.placements).toEqualData(samplePlacements);
		}));

		it('$scope.findOne() should create an array with one Placement object fetched from XHR using a placementId URL parameter', inject(function(Placements) {
			// Define a sample Placement object
			var samplePlacement = new Placements({
				name: 'New Placement'
			});

			// Set the URL parameter
			$stateParams.placementId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/placements\/([0-9a-fA-F]{24})$/).respond(samplePlacement);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.placement).toEqualData(samplePlacement);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Placements) {
			// Create a sample Placement object
			var samplePlacementPostData = new Placements({
				name: 'New Placement'
			});

			// Create a sample Placement response
			var samplePlacementResponse = new Placements({
				_id: '525cf20451979dea2c000001',
				name: 'New Placement'
			});

			// Fixture mock form input values
			scope.name = 'New Placement';

			// Set POST response
			$httpBackend.expectPOST('placements', samplePlacementPostData).respond(samplePlacementResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Placement was created
			expect($location.path()).toBe('/placements/' + samplePlacementResponse._id);
		}));

		it('$scope.update() should update a valid Placement', inject(function(Placements) {
			// Define a sample Placement put data
			var samplePlacementPutData = new Placements({
				_id: '525cf20451979dea2c000001',
				name: 'New Placement'
			});

			// Mock Placement in scope
			scope.placement = samplePlacementPutData;

			// Set PUT response
			$httpBackend.expectPUT(/placements\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/placements/' + samplePlacementPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid placementId and remove the Placement from the scope', inject(function(Placements) {
			// Create new Placement object
			var samplePlacement = new Placements({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Placements array and include the Placement
			scope.placements = [samplePlacement];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/placements\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePlacement);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.placements.length).toBe(0);
		}));
	});
}());
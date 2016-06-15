'use strict';

describe('charts', function() {

  // Load the module that contains the `charts` component before each test
  beforeEach(module('charts'));

  // Test the controller
  describe('Charts', function() {
    var $httpBackend, ctrl;
    var xyzPhoneData = {
      name: 'phone xyz',
      images: ['image/url1.png', 'image/url2.png']
    };

    beforeEach(inject(function($componentController, _$httpBackend_, $routeParams) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData);

      $routeParams.phoneId = 'xyz';

      ctrl = $componentController('charts');
    }));

    it('should fetch the phone details', function() {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.phone).toEqual({});

      $httpBackend.flush();
      expect(ctrl.phone).toEqual(xyzPhoneData);
    });

  });

});

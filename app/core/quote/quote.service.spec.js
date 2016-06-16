'use strict';

describe('Quote', function() {
  var $httpBackend;
  var Quote;
  var quotesData = [
    {name: 'quote X'},
    {name: 'quote Y'},
    {name: 'quote Z'}
  ];

  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `Phone` service before each test
  beforeEach(module('core.quote'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _Quote_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('data/quotes/quotes.json').respond(quotesData);

    Quote = _Quote_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the phones data from `/data/quote/quote.json`', function() {
    var quotes = Quote.query();

    expect(quotes).toEqual([]);

    $httpBackend.flush();
    expect(quotes).toEqual(quotesData);
  });

});

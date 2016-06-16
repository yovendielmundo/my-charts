'use strict';

angular.
  module('core.quote').
  factory('Quote', ['$resource',
    function($resource) {
      return $resource('data/quotes/:quoteId.json', {}, {
        query: {
          method: 'GET',
          params: {quoteId: 'quotes'},
          isArray: true
        }
      });
    }
  ]);

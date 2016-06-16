'use strict';

angular.
  module('myChartsApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/charts', {
          template: '<charts></charts>'
        }).
        otherwise('/charts');
    }
  ]);

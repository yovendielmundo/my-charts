'use strict';

// Register `charts` component, along with its associated controller and template
angular.
  module('charts').
  component('charts', {
    templateUrl: 'charts/charts.template.html',
    controller: ['$filter',
      function ChartsController($filter) {
        var self = this;

        var quotesTotalAmountByProvider = [
          {
            "_id" : "Qatar",
            "total" : 11044.39,
            "count" : 6
          },
          {
            "_id" : "Oman",
            "total" : 61104.08,
            "count" : 26
          },
          {
            "_id" : "Union",
            "total" : 94024.84,
            "count" : 37
          },
          {
            "_id" : "Aman",
            "total" : 29277.00,
            "count" : 15
          },
          {
            "_id" : "Noor takaful",
            "total" : 16255.00,
            "count" : 4
          }
        ];

        var getQuote = function (name) {
          for (var i in quotesTotalAmountByProvider) {
            var quote = quotesTotalAmountByProvider[i];
            if (quote._id === name) {
              return quote;
            }
          }
          return null;
        };

        self.result = {};
        self.type = 'Doughnut';

        self.labels = [];
        angular.forEach(quotesTotalAmountByProvider, function(value) {
          this.push(value._id);
        }, self.labels);

        var total = 0;
        var count = 0;
        self.data = [];
        self.counts = [];

        angular.forEach(quotesTotalAmountByProvider, function(value) {
          this.push(value.total);
          total += value.total;
        }, self.data);

        angular.forEach(quotesTotalAmountByProvider, function(value) {
          this.push(value.count);
          count += value.count;
        }, self.counts);


        self.colours = ['#C969A1', '#73CC70', '#E0194B', '#C9B112', '#0F71D9', '#949FB1', '#4D5360'];

        self.result.total = {count: count,  amount: $filter('currency')(total, 'AED ', 2)};

        self.toggle = function () {
          self.type = self.type === 'Doughnut' ?
              'Pie' : 'Doughnut';
        };

        self.onHover = function (points, evt) {
          var element = points[0];
          if (element !== undefined) {
            var item = getQuote(element.label);
            if (item !== null) {
              self.result.name = item._id;
              self.result.count = item.count;
              self.result.provider = $filter('currency')(item.total, 'AED ', 2);
            }
          }
        };
      }
    ]
  });

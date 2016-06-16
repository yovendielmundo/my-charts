'use strict';

// Register `charts` component, along with its associated controller and template
angular.module('charts').component('charts', {
    templateUrl: 'charts/charts.template.html',
    controller: ['$filter', 'Quote',
        function ChartsController($filter, Quote) {
            var self = this;

            self.result = {};
            self.type = 'Doughnut';
            self.colours = ['#C969A1', '#73CC70', '#E0194B', '#C9B112', '#0F71D9', '#949FB1', '#4D5360'];

            self.labels = [];
            self.data = [];
            self.counts = [];

            var total = 0;
            var count = 0;

            self.quotesSoldByProvider = Quote.get({quoteId: 'quotesSoldByProvider'}, function (quotes) {
                angular.forEach(quotes.data, function (value) {
                    this.push(value._id);
                }, self.labels);

                angular.forEach(quotes.data, function (value) {
                    this.push(value.amount);
                    total += value.amount;
                }, self.data);

                angular.forEach(quotes.data, function (value) {
                    this.push(value.count);
                    count += value.count;
                }, self.counts);

                self.result.total = {count: count, amount: $filter('currency')(total, 'AED ', 2)};


            });

            console.log(self.quotesSoldByProvider);
            var getQuote = function (name) {
                for (var i in self.quotesSoldByProvider) {
                    var quote = self.quotesSoldByProvider[i];
                    if (quote._id === name) {
                        return quote;
                    }
                }
                return null;
            };

            self.toggle = function () {
                self.type = self.type === 'Doughnut' ?
                    'Pie' : 'Doughnut';
            };

            self.onHover = function (points, evt) {
                // var element = points[0];
                // if (element !== undefined) {
                //     var item = getQuote(element.label);
                //     if (item !== null) {
                //         self.result.name = item._id;
                //         self.result.count = item.count;
                //         self.result.provider = $filter('currency')(item.total, 'AED ', 2);
                //     }
                // }
            };
        }
    ]
});

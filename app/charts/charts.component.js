'use strict';

// Register `charts` component, along with its associated controller and template
angular.module('charts').component('charts', {
    templateUrl: 'charts/charts.template.html',
    controller: ['$filter', 'Quote',
        function ChartsController($filter, Quote) {
            var self = this;

            self.result = {};
            self.colours = ['#C969A1', '#73CC70', '#E0194B', '#C9B112', '#0F71D9', '#949FB1', '#4D5360'];


            self.byProvider = Quote.sellsByProvider();
            self.byProduct = Quote.sellsByProduct();
            self.byDay = Quote.sellsByDay();
            self.notByDay = Quote.notSellByDay();


            // var quotes = [
            //     {
            //         "_id" : "Qatar",
            //         "amount" : 1073939,
            //         "count" : 6
            //     },
            //     {
            //         "_id" : "Oman",
            //         "amount" : 7597940,
            //         "count" : 29
            //     },
            //     {
            //         "_id" : "Union",
            //         "amount" : 8463558,
            //         "count" : 34
            //     },
            //     {
            //         "_id" : "Aman",
            //         "amount" : 3048700,
            //         "count" : 16
            //     },
            //     {
            //         "_id" : "Noor takaful",
            //         "amount" : 1625500,
            //         "count" : 4
            //     }
            // ];

            // quotes.data.forEach(function(value) {
            //     self.labels.push(value._id);
            //     self.data.push(value.amount);
            //     self.counts.push(value.count);
            //     total += value.amount;
            //     count += value.count;
            // });
            //
            // self.result.total = {count: count, amount: $filter('currency')(total, 'AED ', 2)};

        }
    ]
});

'use strict';

angular.module('core.quote').factory('Quote', ['$resource', '$filter',
    function ($resource, $filter) {

        var transformChartPie = function (response) {
            var d = {
                labels: [],
                amounts: [],
                counts: [],
                totalAmount: 0,
                totalCount: 0
            };
            var res = angular.fromJson(response);
            for (var i in res) {
                var value = res[i];
                var amount = value.amount / 100;
                d.labels.push(value._id);
                d.amounts.push(amount);
                d.counts.push(value.count);
                d.totalAmount += amount;
                d.totalCount += value.count;
            }
            d.result = {count: d.totalCount, amount: $filter('currency')(d.totalAmount, 'AED ', 2)};
            return d;
        };

        var transformChartLine = function (response) {
            var d = {labels: [], data:[]};
            var amounts = [], counts = [];
            var res = angular.fromJson(response);
            for (var i in res) {
                var value = res[i];
                d.labels.push(value.day + '/' + value.month);
                amounts.push(value.amount / 100);
                counts.push(value.count);
            }
            d.data[0] = amounts;
            d.data[1] = counts;
            d.series = ['Amount', 'Count'];

            return d;
        };

        var transformChartLine2 = function (response) {
            var d = {labels: [], data:[]};
            var counts = [];
            var res = angular.fromJson(response);
            for (var i in res) {
                var value = res[i];
                d.labels.push(value.day + '/' + value.month);
                counts.push(value.count);
            }

            d.data[0] = counts;
            d.series = ['Count'];

            return d;
        };

        return $resource('data/quotes/:quoteId.json', {}, {
            query: {
                method: 'GET',
                params: {quoteId: 'quotes'},
                isArray: true
            },
            sellsByProvider: {
                method: 'GET',
                params: {quoteId: 'sellsByProvider'},
                isArray: false,
                transformResponse: transformChartPie
            },
            sellsByProduct: {
                method: 'GET',
                params: {quoteId: 'sellsByProduct'},
                isArray: false,
                transformResponse: transformChartPie
            },
            sellsByDay: {
                method: 'GET',
                params: {quoteId: 'sellsByDay'},
                isArray: false,
                transformResponse: transformChartLine
            },
            notSellByDay: {
                method: 'GET',
                params: {quoteId: 'notSellByDay'},
                isArray: false,
                transformResponse: transformChartLine2
            }
        });
    }
]);

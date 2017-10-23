/**
 * Created by waltenes on 12/09/17.
 */
'use strict';

var gerqAppDependencies = [
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'ui.mask',
    'ui.bootstrap',
    'blockUI',
    'angularMoment',
    'ui.router',
    'ui.checkbox',
    'pascalprecht.translate',
    'idf.br-filters',
    'ui.utils.masks',
    'restangular',
    'toastr',
    'ui.bootstrap.datetimepicker',
    'angularUtils.directives.dirPagination'
];

var gerqApp = angular.module("app", gerqAppDependencies);

gerqApp.filter('propsFilter', function() {
    return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function(item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});


'use strict';

angular.module('app').run(['$rootScope', 'amMoment', function ($rootScope, amMoment) {

    amMoment.changeLocale('pt-br');

}]);


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
    'angularFileUpload',
    'toastr',
    'ui.bootstrap.datetimepicker',
    'angularUtils.directives.dirPagination'
];

var gerqApp = angular.module("app", gerqAppDependencies);

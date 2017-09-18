"use strict";

gerqApp.service('ServiceRestangular', ['Restangular',
    function (Restangular) {
    
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('http://localhost:8080')
    });
}]);

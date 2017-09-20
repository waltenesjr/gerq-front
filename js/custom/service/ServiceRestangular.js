"use strict";

gerqApp.service('ServiceRestangular', ['Restangular',
    function (Restangular) {
    
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('http://10.110.71.61:8080')
    });
}]);

angular.module('app').config(['RestangularProvider',
    function (RestangularProvider) {

        //################## INICIO DA CONFIGURAÇÃO DE URL BASE, INTERCEPTOR DE REQUESTS VIA RESTANGULAR ###############
        RestangularProvider.setBaseUrl('/');
        //################## FIM DA CONFIGURAÇÃO DE URL BASE, INTERCEPTOR DE REQUESTS VIA RESTANGULAR ##################
    }]);
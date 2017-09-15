angular.module('app').config(['RestangularProvider',
    function (RestangularProvider) {

        //################## INICIO DA CONFIGURAÇÃO DE URL BASE, INTERCEPTOR DE REQUESTS VIA RESTANGULAR ###############
        RestangularProvider.setBaseUrl('/gerq-front');
        //################## FIM DA CONFIGURAÇÃO DE URL BASE, INTERCEPTOR DE REQUESTS VIA RESTANGULAR ##################
    }]);
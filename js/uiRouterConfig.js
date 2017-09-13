'use strict';

detranApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    //###################### INICIO DA DEFINICAO DO PADRAO DAS ROTAS ACESSAVEIS ######################
    $urlRouterProvider.otherwise("/categoria");

    $stateProvider
        .state('categoria', {
            url: "/categoria",
            templateUrl: "/pages/categoria.html",
            controller: 'CategoriaController'
        })
    //###################### FIM DA DEFINICAO DO PADRAO DAS ROTAS ACESSAVEIS ######################
}]);
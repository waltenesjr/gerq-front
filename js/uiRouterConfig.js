'use strict';

gerqApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    //###################### INICIO DA DEFINICAO DO PADRAO DAS ROTAS ACESSAVEIS ######################
    $urlRouterProvider.otherwise("/produto");

    $stateProvider
        .state('produto', {
            url: "/produto",
            templateUrl: "pages/produto.html",
            controller: 'ProdutoController'
        })
        .state('categoria', {
            url: "/categoria",
            templateUrl: "pages/categoria.html",
            controller: 'CategoriaController'
        })
        .state('empresa', {
            url: "/empresa",
            templateUrl: "pages/empresa.html",
            controller: 'EmpresaController'
        })
    //###################### FIM DA DEFINICAO DO PADRAO DAS ROTAS ACESSAVEIS ######################
}]);
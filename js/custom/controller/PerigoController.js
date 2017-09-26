'use strict';
gerqApp.controller('PerigoController',['$scope', '$translate', 'PerigoService', 'ProdutoService',
    function ($scope, $translate, PerigoService, ProdutoService) {
        $scope.setProduto = function (item) {
            $scope.perigos = item.perigos;
        }
        $scope.findByname = function (name) {
            return ProdutoService.findByname(name);
        }
}]);


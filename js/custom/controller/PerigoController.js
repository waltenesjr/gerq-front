'use strict';
gerqApp.controller('PerigoController',['$scope', '$translate', 'PerigoService',
    function ($scope, $translate, PerigoService) {

        $scope.produto = {};

        $scope.changePerigo = function () {
            $scope.perigos = $scope.produto.perigos;
        }

        function allProdutos() {
            PerigoService.produtos().then(function (response) {
                $scope.produtos = response.plain();
            }, function errorCallback(response) {
                error(response);
            });
        }

        allProdutos();
}]);


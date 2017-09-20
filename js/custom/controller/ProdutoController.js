'use strict';
gerqApp.controller('ProdutoController',['$scope', '$translate', 'ProdutoService',
    function ($scope, $translate, ProdutoService) {

        $scope.getList = function () {
            $scope.pagination.fields = angular.copy($scope.fields);
            ProdutoService.list($scope.pagination).then(function (response) {
                var dados = response.plain();
                $scope.produtos = dados.list;
                $scope.pagination.totalResults = dados.totalResults;
            }, function errorCallback(response) {
                error(response);
            });
        };

        $scope.save = function () {
            ProdutoService.save($scope.produto).then(function () {
                sucess();
            }, function errorCallback(response) {
                error(response);
            });
        };

        $scope.edit = function (id) {
            $scope.status = 'edit';
            get(id);
        }

        $scope.detail = function (id) {
            $scope.status = 'detail';
            get(id);
        }

        $scope.add = function () {
            $scope.produto = {
                categoria: {}
            };
            $scope.status = 'edit';
        }

        $scope.remove = function (id) {
            $scope.openModalConfirm({
                message: $translate.instant('MSG.MENSAGEM_M010'),
                callback: function (retorno) {
                    if(retorno){
                        ProdutoService.delete(id).then(function () {
                            sucess();
                        }, function errorCallback(response) {
                            error(response);
                        });
                    }
                }
            });
        }

        $scope.limpar = function () {
            $scope.limparMensagemTela();
            $scope.tab = 1;
            $scope.status = 'list';
            $scope.pagination = {
                currentPage: 1,
                totalResults: 0,
                limit: 5,
                fields: angular.copy($scope.fields)
            };
            $scope.fields = [
                {name: 'nome', value: null}
            ];
            allCategorias();
            $scope.getList();
        }

        $scope.limpar();

        function get(id) {
            ProdutoService.get(id).then(function (response) {
                $scope.produto = response.plain();
            }, function errorCallback(response) {
                error(response);
            });
        }

        function allCategorias() {
            ProdutoService.categorias().then(function (response) {
                $scope.categorias = response.plain();
            }, function errorCallback(response) {
                error(response);
            });
        }

        function sucess() {
            $scope.showMessageSuccess($translate.instant('MSG.MENSAGEM_M001'));
            $scope.limpar();
        }

        function error(response) {
            console.log(angular.toJson(response));
            $scope.showMessageError($translate.instant('MSG.MENSAGEM_ERROR'));
        }
}]);

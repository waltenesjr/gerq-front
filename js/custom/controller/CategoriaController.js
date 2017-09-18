'use strict';
gerqApp.controller('CategoriaController',['$scope', '$translate', 'CategoriaService',
    function ($scope, $translate, CategoriaService) {

        $scope.categorias = [];
        $scope.categoria = {};
        $scope.status = 'home';

        $scope.pagination = {
            currentPage: 1,
            totalResults: 0,
            limit: 5,
            fields: angular.copy($scope.fields)
        };

        $scope.fields = [
            {name: 'descricao', value: null}
        ];

        $scope.getList = function () {
            $scope.pagination.fields = angular.copy($scope.fields);
            CategoriaService.list($scope.pagination).then(function (response) {
                var dados = response.plain();
                $scope.categorias = dados.list;
                $scope.pagination.totalResults = dados.totalResults;
            }, function errorCallback(response) {
                error(response);
            });
        };

        $scope.save = function () {
            $scope.categoria.descricao = $scope.fields[0].value;
            CategoriaService.save($scope.categoria).then(function () {
                sucess();
            }, function errorCallback(response) {
                error(response);
            });
        };

        $scope.edit = function (categoria) {
            $scope.fields[0].value = categoria.descricao;
            $scope.categoria.id = categoria.id;
            $scope.status = 'edit';
        }

        $scope.remove = function (id) {
            $scope.openModalConfirm({
                message: $translate.instant('MSG.MENSAGEM_M010'),
                callback: function (retorno) {
                    if(retorno){
                        CategoriaService.delete(id).then(function () {
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
            $scope.status = 'home';
            $scope.categoria = {};
            $scope.fields[0].value = '';
            $scope.getList();
        }

        function sucess() {
            $scope.showMessageSuccess($translate.instant('MSG.MENSAGEM_M001'));
            $scope.limpar();
        }

        function error(response) {
            console.log(angular.toJson(response));
            $scope.showMessageError($translate.instant('MSG.MENSAGEM_ERROR'));
        }

        $scope.limpar();
}]);


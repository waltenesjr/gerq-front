'use strict';
gerqApp.controller('CategoriaController',['$scope', '$translate', 'CategoriaService',
    function ($scope, $translate, CategoriaService) {

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
            if ($scope.fields[0].value){
                $scope.categoria.descricao = $scope.fields[0].value;
                CategoriaService.save($scope.categoria).then(function () {
                    sucess();
                }, function errorCallback(response) {
                    error(response);
                });
            } else {
                $scope.showMessageObrigatoriedade();
            }
        };

        $scope.edit = function (categoria) {
            $scope.fields[0].value = categoria.descricao;
            $scope.categoria.id = categoria.id;
            $scope.status = 'edit';
            $scope.focuEdit = true;
        }

        $scope.add = function () {
            $scope.fields[0].value = '';
            $scope.categoria = {};
            $scope.status = 'edit';
            $scope.focuEdit = true;
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
            $scope.status = 'list';
            $scope.pagination = {
                currentPage: 1,
                totalResults: 0,
                limit: 5,
                fields: angular.copy($scope.fields)
            };
            $scope.fields = [
                {name: 'descricao', value: null}
            ];
            $scope.fields[0].value = '';
            $scope.categoria = {};
            $scope.getList();
            $scope.focuPesquisa = true;
        }

        $scope.limpar();

        function sucess() {
            $scope.showMessageSuccess($translate.instant('MSG.MENSAGEM_M001'));
            $scope.limpar();
        }

        function error(response) {
            console.log(angular.toJson(response));
            $scope.showMessageError($translate.instant('MSG.MENSAGEM_ERROR'));
        }
}]);


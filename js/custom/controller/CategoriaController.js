'use strict';
gerqApp.controller('CategoriaController',['$scope', '$translate', 'CategoriaService',
    function ($scope, $translate, CategoriaService) {

        $scope.categorias = [];
        $scope.categoria = {};
        $scope.status = 'home';

        $scope.listarCategorias = function () {
            CategoriaService.list().then(function (response) {
                $scope.categorias = response.plain();
            }, function errorCallback(response) {
                error(response);
            });
        };

        $scope.edit = function (categoria) {
            $scope.categoria.id = categoria.id;
            $scope.categoria.descricao = categoria.descricao;
            $scope.status = 'edit';
        }

        $scope.confirmEdit = function () {
            var data = JSON.stringify(eval({"id": $scope.categoria.id, "descricao": $scope.categoria.descricao}));
            CategoriaService.add(data).then(function () {
                sucess();
            }, function errorCallback(response) {
                error(response)
            });
        }

        $scope.addCategoria = function () {
            var data = JSON.stringify(eval({"descricao": $scope.categoria.descricao}));
            CategoriaService.add(data).then(function () {
                sucess();
            }, function errorCallback(response) {
                error(response);
            });
        };

        $scope.excluir = function (id) {
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
            $scope.categoria.descricao = '';
            $scope.listarCategorias();
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


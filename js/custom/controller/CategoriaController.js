'use strict';
gerqApp.controller('CategoriaController',['$scope', '$http', '$translate',
    function ($scope, $http, $translate) {

        $scope.categorias = [];
        $scope.categoria = {};
        $scope.status = 'home';
        $scope.url = 'http://localhost:8080';

        $scope.limpar = function () {
            $scope.limparMensagemTela();
            $scope.status = 'home';
            $scope.categoria.descricao = '';
            $scope.listarCategorias();
        }

        $scope.listarCategorias = function () {
            $http.get($scope.url + '/categorias')
                .then(function(response) {
                    $scope.categorias = response.data;
                }, function (error) {
                    console.log(error);
                });
        };

        $scope.edit = function (categoria) {
            $scope.categoria.id = categoria.id;
            $scope.categoria.descricao = categoria.descricao;
            $scope.status = 'edit';
        }

        $scope.confirmEdit = function () {
            var data = JSON.stringify(eval({"id": $scope.categoria.id, "descricao": $scope.categoria.descricao}));
            $http.put($scope.url + '/updateCategoria', data)
                .then(function (response) {
                    $scope.showMessageSuccess($translate.instant('MSG.MENSAGEM_M012'));
                    $scope.limpar();
                }, function (error) {
                    console.log(error);
                });
        }

        $scope.addCategoria = function () {
            if ($scope.categoria.descricao) {
                var data = JSON.stringify(eval({"descricao": $scope.categoria.descricao}));
                $http.post($scope.url + '/addCategoria', data)
                    .then(function (response) {
                        $scope.showMessageSuccess($translate.instant('MSG.MENSAGEM_M001'));
                        $scope.limpar();
                    }, function (error) {
                        console.log(error);
                    });
            }
        };

        $scope.excluir = function (id) {
            $scope.openModalConfirm({
                message: $translate.instant('MSG.MENSAGEM_M010'),
                callback: function (retorno) {
                    if(retorno){
                        $http.delete($scope.url + '/deleteCategoria/' + id)
                            .then(function (response) {
                                $scope.showMessageSuccess($translate.instant('MSG.MENSAGEM_M011'));
                                $scope.limpar();
                            }, function (error) {
                                console.log(error);
                            });
                    }
                }
            });
        }

        $scope.limpar();
}]);


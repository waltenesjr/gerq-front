'use strict';
gerqApp.controller('ProdutoController',['$scope', '$translate', 'ProdutoService',
    function ($scope, $translate, ProdutoService) {

        $scope.getList = function () {
            $scope.pagination.sort = angular.copy($scope.sort);
            $scope.pagination.fields = angular.copy($scope.fields);
            ProdutoService.list($scope.pagination).then(function (response) {
                var dados = response.plain();
                $scope.produtos = dados.list;
                $scope.pagination.totalResults = dados.totalResults;
            }, function errorCallback(response) {
                error(response);
            });
        };

        $scope.onSort = function (position, field) {
            $scope.sort.field = field;
            if (!$scope.orders[position].direction) {
                $scope.orders[position].direction = 'desc';
                $scope.sort.direction = 'desc';
                $scope.getList();
                return;
            }
            if ($scope.orders[position].direction === 'asc') {
                $scope.orders[position].direction = 'desc';
                $scope.sort.direction = 'desc';
                $scope.getList();
                return;
            }
            if ($scope.orders[position].direction === 'desc') {
                $scope.orders[position].direction = 'asc';
                $scope.sort.direction = 'asc';
                $scope.getList();
            }
        };

        $scope.save = function () {
            $scope.produto.perigos = $scope.perigos;
            ProdutoService.save($scope.produto).then(function () {
                sucess();
            }, function errorCallback(response) {
                error(response);
            });
        };

        $scope.edit = function (id) {
            $scope.focuEdit = true;
            allCategorias();
            allEmpresas();
            $scope.perigos = [];
            $scope.perigo = {};
            $scope.status = 'edit';
            get(id);
        }

        $scope.detail = function (id) {
            $scope.status = 'detail';
            get(id);
        }

        $scope.add = function () {
            $scope.focuEdit = true;
            allCategorias();
            allEmpresas();
            $scope.perigos = [];
            $scope.perigo = {};
            $scope.produto = {
                categoria: {},
                empresa: {}
            };
            $scope.status = 'edit';
        }

        $scope.addPerigo = function () {
            $scope.perigos.push($scope.perigo);
            $scope.perigo = {};
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
            $scope.orders = [
                {direction: null}
            ];
            $scope.sort = {};
            $scope.getList();
            $scope.focuPesquisa = true;
        }

        $scope.limpar();

        function get(id) {
            ProdutoService.get(id).then(function (response) {
                $scope.produto = response.plain();
                $scope.perigos = $scope.produto.perigos;
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

        function allEmpresas() {
            ProdutoService.empresas().then(function (response) {
                $scope.empresas = response.plain();
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


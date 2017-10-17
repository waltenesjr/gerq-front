'use strict';
gerqApp.controller('ProdutoController',['$scope', '$translate', 'ProdutoService', '$timeout',
    function ($scope, $translate, ProdutoService, $timeout) {

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
            var result = ProdutoService.validRequired($scope.produto);
            if (null == result) {
                $scope.produto.perigos = $scope.perigos;
                ProdutoService.save($scope.produto).then(function () {
                    sucess();
                }, function errorCallback(response) {
                    error(response);
                });
            } else {
                $scope.setTab(result)
                $scope.showMessageObrigatoriedade();
            }
        }

        $scope.setTab = function (tab) {
            $scope.activeTab = tab;
        }

        $scope.edit = function (id) {
            initEdit();
            get(id);
        }

        $scope.detail = function (id) {
            $scope.status = 'detail';
            get(id);
        }

        $scope.add = function () {
            initEdit();
            $scope.produto = {
                categoria: {},
                empresa: {}
            };
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

        $scope.initList = function () {
            $scope.limparMensagemTela();
            $scope.pagination = {
                currentPage: 1,
                totalResults: 0,
                limit: 5
            };
            $scope.fields = [
                {name: 'nome', value: null}
            ];
            $scope.orders = [
                {direction: null}
            ];
            $scope.sort = {};
            $scope.focuPesquisa = true;
            $scope.status = 'list';
            $scope.getList();
        }

        $scope.initList();

        function initEdit() {
            allCategorias();
            allEmpresas();
            $scope.perigos = [];
            $scope.perigo = {};
            $scope.status = 'edit';
            $scope.focuEdit = true;
        }

        function get(id) {
            ProdutoService.get(id).then(function (response) {
                $scope.produto = response.plain();
                $scope.perigos = $scope.produto.perigos;
            }, function errorCallback(response) {
                error(response);
            });
        }

        function allCategorias() {
            ProdutoService.getListSelectCategoria().then(function (response) {
                $scope.categorias = response.plain();
            }, function errorCallback(response) {
                error(response);
            });
        }

        function allEmpresas() {
            ProdutoService.getListSelectEmpresa().then(function (response) {
                $scope.empresas = response.plain();
            }, function errorCallback(response) {
                error(response);
            });
        }

        function sucess() {
            $scope.showMessageSuccess($translate.instant('MSG.MENSAGEM_M001'));
            $scope.initList();
        }

        function error(response) {
            console.log(angular.toJson(response));
            $scope.showMessageError($translate.instant('MSG.MENSAGEM_ERROR'));
        }
}]);


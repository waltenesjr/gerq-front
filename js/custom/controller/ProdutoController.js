'use strict';
gerqApp.controller('ProdutoController',['$scope', '$translate', 'ProdutoService',
    function ($scope, $translate, ProdutoService) {

        $scope.getList = function () {
            $scope.pagination.list = null;
            ProdutoService.list($scope.pagination).then(function (response) {
                $scope.pagination = response.plain();
            }, function errorCallback(response) {
                error(response);
            });
        };

        $scope.onSort = function (position, field) {
            $scope.pagination.sort.field = field;
            if (!$scope.orders[position].direction) {
                $scope.orders[position].direction = 'desc';
                $scope.pagination.sort.direction = 'desc';
                $scope.getList();
                return;
            }
            if ($scope.orders[position].direction === 'asc') {
                $scope.orders[position].direction = 'desc';
                $scope.pagination.sort.direction = 'desc';
                $scope.getList();
                return;
            }
            if ($scope.orders[position].direction === 'desc') {
                $scope.orders[position].direction = 'asc';
                $scope.pagination.sort.direction = 'asc';
                $scope.getList();
            }
        };

        $scope.save = function () {
            var tab = ProdutoService.validationRequired($scope.produto);
            if (null == tab) {
                ProdutoService.save($scope.produto).then(function () {
                    sucess();
                }, function errorCallback(response) {
                    error(response);
                });
            } else {
                messageValidation(tab);
            }
        }

        $scope.setTab = function (tab) {
            activeTab(tab);
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
                empresa: {},
                perigos: []
            };
        }

        $scope.addPerigo = function () {
            if (validationRequeridPerigo($scope.perigo)) {
                $scope.produto.perigos.push($scope.perigo);
                $scope.perigo = {};
                $scope.hasError = {};
            } else {
                $scope.showMessageObrigatoriedade();
            }
        }

        $scope.removePerigo = function (index) {
            $scope.produto.perigos.splice(index, 1);
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
                limit: 5,
                fields: [ {name: 'nome', value: null} ],
                sort: {}
            };
            $scope.orders = [
                {direction: null}
            ];
            $scope.focuPesquisa = true;
            $scope.status = 'list';
            $scope.getList();
        }

        $scope.initList();

        function initEdit() {
            allCategorias();
            allEmpresas();
            $scope.perigo = {};
            $scope.status = 'edit';
            $scope.focuEdit = true;
            $scope.hasError = {};
        }

        function get(id) {
            ProdutoService.get(id).then(function (response) {
                $scope.produto = response.plain();
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

        function validationRequeridPerigo(perigo) {
            var result = true;
            if (!perigo.titulo) {
                $scope.hasError.tituloPerigo = true;
                result = false;
            }
            if (!perigo.descricao) {
                $scope.hasError.descricaoPerigo = true;
                result = false;
            }
            return result;
        }

        function messageValidation(tab) {
            if (tab == 'identificacao') {
                $scope.showMessageObrigatoriedade();
            } else if (tab == 'perigo') {
                $scope.showMessageError('Adicione pelo menos um perigo.')
            }
            $scope.setTab(tab);
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


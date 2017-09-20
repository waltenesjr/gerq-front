'use strict';
gerqApp.controller('EmpresaController',['$scope', '$translate', 'EmpresaService',
    function ($scope, $translate, EmpresaService) {

        $scope.getList = function () {
            $scope.pagination.fields = angular.copy($scope.fields);
            EmpresaService.list($scope.pagination).then(function (response) {
                var dados = response.plain();
                $scope.empresas = dados.list;
                $scope.pagination.totalResults = dados.totalResults;
            }, function errorCallback(response) {
                error(response);
            });
        };

        $scope.save = function () {
            $scope.categoria.descricao = $scope.fields[0].value;
            EmpresaService.save($scope.empresa).then(function () {
                sucess();
            }, function errorCallback(response) {
                error(response);
            });
        };

        $scope.edit = function (empresa) {
            $scope.status = 'edit';
        }

        $scope.add = function () {
            $scope.fields[0].value = '';
            $scope.empresa = {};
            $scope.status = 'edit';
        }

        $scope.remove = function (id) {
            $scope.openModalConfirm({
                message: $translate.instant('MSG.MENSAGEM_M010'),
                callback: function (retorno) {
                    if(retorno){
                        EmpresaService.delete(id).then(function () {
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
                {name: 'nome', value: null}
            ];
            $scope.fields[0].value = '';
            $scope.empresa = {};
            $scope.getList();
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


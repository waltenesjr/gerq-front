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
            if (EmpresaService.validationRequired($scope.empresa)) {
                EmpresaService.save($scope.empresa).then(function () {
                    sucess();
                }, function errorCallback(response) {
                    error(response);
                });
            } else {
                $scope.showMessageObrigatoriedade();
            }
        };

        $scope.edit = function (empresa) {
            $scope.empresa = empresa;
            $scope.status = 'edit';
            clearForm();
        }

        $scope.add = function () {
            $scope.fields[0].value = '';
            $scope.empresa = {};
            $scope.status = 'edit';
            clearForm();
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
                limit: 5
            };
            $scope.fields = [
                {name: 'nome', value: null}
            ];
            $scope.fields[0].value = '';
            $scope.empresa = {};
            $scope.focuPesquisa = true;
            $scope.getList();
        }

        $scope.limpar();

        function clearForm() {
            $scope.empresaForm.$submitted = false;
            $scope.empresaForm.$setPristine();
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


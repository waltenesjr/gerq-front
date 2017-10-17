angular.module('app').directive("autoComplete", ["$translate", "$timeout",
    function ($translate, $timeout) {

        return {
            require: ['^ngModel'],
            scope: {
                id: "@ngId",
                identificador: "@ngIdentificador",
                label: "@ngLabel",
                obrigatorio: "@ngObrigatorio",
                disabled: "=ngDisabled",
                minLength: "=ngMinLength",
                model: "=ngModel",
                form: "=form",
                propriedades: "=",
                find: '&ngFind',
                setResult: '&ngSetResult',
                focusOn: "=ngFocusOn",
                acaoBorracha: '&ngAcaoBorracha',
                labelAlertTooltip: '@',
                labelInfoTooltip: '@',
                labelQuestionTooltip: '@',
                buttonNewAction: '&',
                buttonNewShow: '@',
                buttonNewTooltip: '@'
            },
            replace: true,
            restrict: 'E',
            templateUrl: 'js/custom/directive/autoComplete/autoComplete.html',
            controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {


                if (!$scope.identificador) {
                    console.error('Não é possível usar esta directiva sem o identificador');
                }

                if ($scope.id === undefined) {
                    $scope.id = $attrs['ngModel'];
                }

                var textTypeahead = '';
                if ($scope.propriedades && $scope.propriedades.length > 0) {

                    for (var i = 0; i < $scope.propriedades.length; i++) {

                        if (i === 0) {
                            textTypeahead = textTypeahead.concat("item." + $scope.propriedades[i]);
                        } else {
                            textTypeahead = textTypeahead.concat(" + " + "'" + " - " + "'" + " + " + "item." + $scope.propriedades[i]);
                        }
                    }
                }

                $scope.chave = textTypeahead ? textTypeahead.replace("item['", "").replace("']", "") : "";

                $scope.labelTypeahead = function (item) {

                    if (item && $scope.propriedades && $scope.propriedades.length > 0) {

                        var retorno = '';

                        for (var i = 0; i < $scope.propriedades.length; i++) {

                            if (i === 0) {
                                retorno = retorno.concat(item[$scope.propriedades[i]]);
                            } else {
                                retorno = retorno.concat(" - " + item[$scope.propriedades[i]]);
                            }
                        }
                        return retorno;
                    }
                };

                $scope.modelOld = angular.copy($scope.model);

                $scope.defineObrigatoriedade = function () {
                    if ($scope.model && $scope.model.id) {
                        $scope.isObrigatorio = (($scope.form[$scope.id].$error.required || !$scope.model.id) && (!$scope.form[$scope.id].$pristine || $scope.form.$submitted) && $scope.obrigatorio);
                    }
                };

                // Não renderiza <label> caso nao foi definido 'label'
                $scope.labelRender = true;
                if ($scope.label === undefined) {
                    $scope.labelRender = false;
                }

                // Define um 'labelAlertTooltip' caso não tenha definido um
                $scope.labelAlertTooltipCopy = $scope.labelAlertTooltip;
                if ($scope.labelAlertTooltip === undefined && ($scope.obrigatorio === true || $scope.obrigatorio === "true")) {
                    // TODO retirar este copy e verificar pq não esta funcionando
                    $scope.labelAlertTooltipCopy = $translate.instant($scope.label) + ' ' + $translate.instant('LABEL.CAMPO_OBRIGATORIO');
                }

                // Não renderiza o icone de tooltip de informação
                $scope.labelInfoTooltipRender = true;
                if ($scope.labelInfoTooltip === undefined) {
                    $scope.labelInfoTooltipRender = false;
                }

                // Não renderiza o icone de tooltip de dúvida
                $scope.labelQuestionTooltipRender = true;
                if ($scope.labelQuestionTooltip === undefined) {
                    $scope.labelQuestionTooltipRender = false;
                }

            }],
            link: function ($scope, $element, $attrs) {

                $scope.findResult = function (viewValue) {

                    if (($scope.model && !$scope.modelOld && $scope.modelOld !== null && $scope.modelOld !== undefined) || ($scope.model && $scope.identificador && !$scope.modelOld)) {
                        $scope.modelOld = angular.copy($scope.model);
                    }

                    if ($scope.model && $scope.model[$scope.chave] == viewValue) {
                        $timeout(function () {
                            $scope.model = angular.copy($scope.modelOld);
                            $scope.setResult({item: $scope.model});
                            return [];
                        });
                    } else if ($scope.model && $scope.model.id) {
                        $timeout(function () {
                            $scope.model = angular.copy($scope.modelOld);
                            $scope.setResult({item: $scope.model});
                            return [];
                        });
                    } else {
                        return $scope.find({value: viewValue});
                    }
                };

                $scope.setResultItem = function (itemSet) {
                    if (itemSet[$scope.identificador]) {
                        console.log(itemSet[$scope.identificador]);
                    }
                    $scope.setResult({item: itemSet});
                };

                $scope.limparCampo = function () {
                    $scope.model = null;
                };

                $scope.limparCampoSemModel = function () {
                    if (!$scope.model || !$scope.identificador) {
                        $scope.limparCampo();
                    }
                };

                $scope.removeModel = function (event) {
                    if (event.keyCode === 8 || event.keyCode === 46) {

                        if ($scope.model && $scope.identificador) {

                            $scope.model = null;
                        }
                    }

                    if (event.keyCode === 13 && $attrs.ngAcaoEnter) {
                        if ($scope.model && $scope.identificador) {
                            $timeout(function () {
                                $scope.$eval($attrs.ngAcaoEnter);
                                $scope.limparCampo();
                            });
                        }
                    }
                };

            }
        };
    }]);
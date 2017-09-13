'use strict';

angular.module('app').directive('labelInputTime', ['$translate', 'moment', function ($translate, moment) {

    return {
        require: ['^ngModel'],
        scope: {
            id: '@ngId',
            label: '@ngLabel',
            obrigatorio: '=ngObrigatorio',
            disabled: '=ngDisabled',
            showSeconds: '=',
            model: '=ngModel',
            form: '=form',
            labelAlertTooltip: '@',
            labelInfoTooltip: '@',
            labelQuestionTooltip: '@'
        },
        replace: true,
        restrict: 'E',
        templateUrl: 'node_modules/arq-front/directive/labelInputTime/labelInputTime.html',

        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            if ($scope.id === undefined) {
                $scope.id = $attrs['ngModel'];
            }

            if ($scope.model) {
                var arr = $scope.model.split(':');
                var hour = parseInt(arr[0]);
                var min = parseInt(arr[1]);

                var newDate = moment().toDate();
                newDate.setHours(hour);
                newDate.setMinutes(min);

                if ($scope.showSeconds) {
                    var sec = parseInt(arr[2]);
                    newDate.setSeconds(sec);
                }

                $scope.modelTemp = newDate;
            }

            // Não renderiza <label> caso nao foi definido 'label'
            $scope.labelRender = true;
            if ($scope.label === undefined) {
                $scope.labelRender = false;
            }

            // Define um 'labelAlertTooltip' caso não tenha definido um
            $scope.labelAlertTooltipCopy = $scope.labelAlertTooltip;

            if ($scope.labelAlertTooltip === undefined && $scope.obrigatorio === true) {
                // TODO retirar este copy e verificar pq não esta funcionando
                $scope.labelAlertTooltipCopy = $translate.instant($scope.label) + ' ' +
                    $translate.instant('LABEL.CAMPO_OBRIGATORIO');
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

            $scope.timepickerOptions = {
                readonlyInput: false,
                showMeridian: false
            };
        }],

        link: function ($scope) {

            $scope.$watch('model', function (newValue) {

                if (newValue) {
                    var arrayTime = newValue.split(':');
                    var dataAtual = new Date();

                    if (!arrayTime[0] || !arrayTime[1]) {
                        console.error('A data que foi passada para directiva está em formato errado!');
                    } else {
                        if (arrayTime[0]) {
                            dataAtual.setHours(arrayTime[0]);
                        }
                        if (arrayTime[1]) {
                            dataAtual.setMinutes(arrayTime[1]);
                        }
                        if (arrayTime[2]) {
                            dataAtual.setSeconds(arrayTime[2]);
                        }
                        $scope.modelTemp = dataAtual;
                    }
                } else {
                    $scope.modelTemp = '';
                }
            });

            $scope.$watch('modelTemp', function (newValue) {

                if (newValue) {

                    if (newValue instanceof Date) {
                        var hora;
                        if (newValue.getHours() >= 0 && newValue.getHours() < 10) {
                            hora = '0' + newValue.getHours().toString();
                        } else {
                            hora = newValue.getHours().toString();
                        }

                        var minuto;
                        if (newValue.getMinutes() >= 0 && newValue.getMinutes() < 10) {
                            minuto = '0' + newValue.getMinutes().toString();
                        } else {
                            minuto = newValue.getMinutes().toString();
                        }

                        $scope.model = hora + ':' + minuto;

                        if ($scope.showSeconds) {
                            var segundo;
                            if (newValue.getSeconds() >= 0 && newValue.getSeconds() < 10) {
                                segundo = '0' + newValue.getSeconds().toString();
                            } else {
                                segundo = newValue.getSeconds().toString();
                            }

                            $scope.model = $scope.model + ':' + newValue.getSeconds();
                        }
                    }
                } else {

                    $scope.model = '';
                }
            });

            // abre o popup time picker
            $scope.openTimePicker = function ($event) {
                if (!$scope.disabled) {
                    $scope.opened = true;
                    $event.preventDefault();
                    $event.stopPropagation();
                }
            };

            // limpa o campo de time
            $scope.limparModel = function () {
                if (!$scope.disabled) {
                    $scope.modelTemp = '';
                    $scope.model = '';
                }
            };
        }
    };
}]);
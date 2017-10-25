'use strict';

angular.module('app').directive('labelInputDate', ['$translate', function ($translate) {

    return {
        require: ['^ngModel'],
        scope: {
            id: "@ngId",
            label: "@ngLabel",
            minDate: "=ngMinDate",
            maxDate: "=ngMaxDate",
            obrigatorio: "=ngObrigatorio",
            disabled: "=ngDisabled",
            model: "=ngModel",
            eventoChange: "&ngEventoChange",
            format: "@ngFormat",
            form: "=form",
            placeholder: '@',
            labelAlertTooltip: '@',
            labelInfoTooltip: '@',
            labelQuestionTooltip: '@',
            mode: "@ngMode",
            focusOn: "=ngFocusOn",
            control: "="
        },
        replace: true,
        restrict: 'E',
        templateUrl: 'js/custom/directive/labelInputDate/labelInputDate.html',
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
            if ($scope.id === undefined) {
                $scope.id = $attrs['ngModel'];
            }

            if (!$scope.mode) {
                $scope.mode = "day";
            }

            // Define um placeholder para o item caso ele não seja definido
            if($scope.placeholder === undefined && $scope.disabled !== true) {

                if($scope.label !== undefined) {

                    $scope.placeholder = $translate.instant($scope.label);
                } else {

                    $scope.placeholder = '';
                }
            }

            $scope.datePickerFormat = $scope.format ? $scope.format : 'dd/MM/yyyy';

            $scope.datePickerOptions = {
                'datepicker-mode': "'" + $scope.mode + "'",
                'min-mode': $scope.mode,
                formatYear: 'yyyy',
                startingDay: 1
            };

            // Não renderiza <label> caso nao foi definido 'label'
            $scope.labelRender = true;
            if ($scope.label === undefined) {
                $scope.labelRender = false;
            }

            // Define um 'labelAlertTooltip' caso não tenha definido um
            $scope.labelAlertTooltipCopy = $scope.labelAlertTooltip;
            if ($scope.labelAlertTooltip === undefined && $scope.obrigatorio === true) {
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
        link: function ($scope) {

            $scope.removeInternalControl = $scope.control || {};
            $scope.removeInternalControl.dataInvalida = false;

            $scope.removeInternalControl.takeDisableRemove = function () {
                $scope.removeInternalControl.dataInvalida = false;
            };

            var formataDataInput = function (data) {

                if (data && data !== "") {
                    var fn = null;
                    // data dd/mm/yyyy
                    if (data.length === 10) {
                        if (!validaData(data) || $scope.form[$scope.id].$error.date) {
                            fn = false;
                        } else {
                            fn = true;
                        }
                        //Envia alerta de data inválida
                        if (!fn) {
                            $scope.model = '';
                            $scope.eventoChange();
                            $scope.removeInternalControl.dataInvalida = true;
                            angular.element($scope.$parent.controllerBodyElement).scope().showMessageErrorCampoInvalido($translate.instant($scope.label));
                        } else {
                            angular.element($scope.$parent.controllerBodyElement).scope().limparMensagemTela();
                            $scope.removeInternalControl.dataInvalida = false;
                        }
                    } else {
                        $scope.model = '';
                    }
                }
            };

            // remover letras do campo que possam estar sendo digitadas no momento
            var removeLetras = function (value) {
                return value.replace(/[^0-9\/\-]/ig, '');
            };

            // limpa o campo de tada
            $scope.limparModel = function () {
                if (!$scope.disabled) {
                    $scope.model = '';
                    $scope.eventoChange();
                    $scope.removeInternalControl.dataInvalida = false;
                }
            };

            $scope.formataDataAoDesfocar = function ($e) {
                if ($e.currentTarget) {
                    formataDataInput($e.currentTarget.value);
                }
            };

            $scope.formataDataAoSelecionar = function (model) {
                if (model) {
                    formataDataInput($scope.$$childHead.date);
                }
            };

            $scope.formataDataAoDigitar = function ($e) {

                var value = $e.currentTarget.value;
                var key = ($e.keyCode ? $e.keyCode : $e.which);

                // VERIFICA SE E NUMERICO
                if ((key >= 96 && key <= 105) || (key >= 48 && key <= 57)) {
                    $e.currentTarget.value = removeLetras(value);

                    if ($e.currentTarget.value.length > $scope.datePickerFormat.length) {
                        $e.currentTarget.value = value.substring(0, value.length - 1);
                    } else {
                        if ($scope.datePickerFormat === 'MM/yyyy') {
                            if (value.length === 2) {
                                value = value.replace(/([0-9]{2})/, '$1/');
                            }
                        } else {
                            if (value.length === 2) {
                                value = value.replace(/([0-9]{2})/, '$1/');
                            }

                            if (value.length === 5) {
                                value = value.replace(/([0-9\/\-]{5})/, '$1/');
                            }
                        }

                        $e.currentTarget.value = value;
                        if (value.length === 10) {
                            //console.log(value);
                            formataDataInput(value);
                        }
                    }
                } else if (key === 111 && $e.type === 'keydown') {
                    $e.currentTarget.value = value.substring(0, value.length - 1);
                } else {
                    $e.currentTarget.value = removeLetras(value);
                }

            };

            $scope.datePickerOpen = function ($e) {
                if (!$scope.disabled) {
                    $scope.opened = true;
                }
            };

            function getDayClass(data) {
                var date = data.date,
                    mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                    for (var i = 0; i < $scope.events.length; i++) {
                        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                        if (dayToCheck === currentDay) {
                            return $scope.events[i].status;
                        }
                    }
                }
                return '';
            }
        }
    };
}]);
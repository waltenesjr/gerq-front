/** Diretiva para campos label seguindo de select de dados **/
angular.module('app').directive("labelSelect", ["$translate", function ($translate) {

    return {
        require: ['^ngModel'],
        scope: {
            id: "@ngId",
            label: "@ngLabel",
            obrigatorio: "=ngObrigatorio",
            desc: "=ngDesc",
            disabled: "=ngDisabled",
            model: "=ngModel",
            form: "=form",
            lista: "=ngList",
            options: "@ngCustomOptions",
            trackBy: "@",
            change: "&ngCustomChange",
            multiple: '@',
            labelAlertTooltip: '@',
            labelInfoTooltip: '@',
            labelQuestionTooltip: '@'
        },
        replace: true,
        restrict: 'E',
        templateUrl: 'js/custom/directive/labelSelect/labelSelect.html',
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            if ($scope.id === undefined) {
                $scope.id = $attrs['ngModel'];
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

            // Define um dominio como default
            $scope.$watch('lista', function () {
                if ($scope.lista && $scope.lista.length > 0)
                    $scope.lista.forEach(function (item) {
                        if (item.hasOwnProperty("originalElement") && item.hasOwnProperty("isPadrao") && item.isPadrao)
                            $scope.model = item.originalElement;
                    });
            });
        }],
        link: function ($scope) {

            $scope.setChangeItem = function (model) {

                $scope.change({model: model});

            };

        }
    };
}]);
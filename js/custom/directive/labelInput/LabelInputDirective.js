/** Diretiva para campos label seguindo de input com validacoes obrigatorio/email **/
angular.module('app').directive("labelInput", ["$translate", function($translate) {

	return {
		require: ['^ngModel'],
		scope : {
			id : "@ngId",
			label : "@ngLabel",
			obrigatorio : "=ngObrigatorio",
			disabled : "=ngDisabled",
			model :	"=ngModel",
			mask : "=ngMask",
			maxlength : "@ngCustomMaxlength",
			form : "=form",
			type : "@ngType",
			eventoBlur : "&ngEventoBlur",
			eventoChange : "&ngEventoChange",
			regex :	"=ngRegex",
			placeholder: '@',
			labelAlertTooltip: '@',
			labelInfoTooltip: '@',
			labelQuestionTooltip: '@',
			maxNumber : "=ngMaxNumber",
			minNumber : "=ngMinNumber",
			trim : "=ngTrim"
		},
		replace : true,
		restrict : 'E',
		templateUrl : 'node_modules/arq-front/directive/labelInput/labelInput.html',
		controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {

			if($scope.id === undefined){
				$scope.id = $attrs['ngModel'];
			}
			$scope.validacaoRegex = $scope.regex ? true : false;

			$scope.invalidRegex = $translate.instant($scope.label) + ' ' + $translate.instant('LABEL.NAO_ATENDE_REGEX');

			// Define mensagem de email invalido
			$scope.invalidEmailTooltip = $translate.instant('LABEL.EMAIL_INVALIDO');

			// Define um placeholder para o item caso ele não seja definido
			if($scope.placeholder === undefined && $scope.disabled !== true) {

				if($scope.label !== undefined) {

					$scope.placeholder = $translate.instant($scope.label);
				} else {

					$scope.placeholder = '';
				}
			}

			// Não renderiza <label> caso nao foi definido 'label'
			$scope.labelRender = true;
			if($scope.label === undefined) {
				$scope.labelRender = false;
			}

			// Define um 'labelAlertTooltip' caso não tenha definido um
			$scope.labelAlertTooltipCopy = $scope.labelAlertTooltip;
			if($scope.labelAlertTooltip === undefined && $scope.obrigatorio === true) {
				// TODO retirar este copy e verificar pq não esta funcionando
				$scope.labelAlertTooltipCopy = $translate.instant($scope.label) + ' ' + $translate.instant('LABEL.CAMPO_OBRIGATORIO');
			}

			// Não renderiza o icone de tooltip de informação
			$scope.labelInfoTooltipRender = true;
			if(!$scope.labelInfoTooltip) {
				$scope.labelInfoTooltipRender = false;
			}else{
				$scope.labelInfoTooltipMsg = $translate.instant($scope.labelInfoTooltip);
			}

			// Não renderiza o icone de tooltip de dúvida
			$scope.labelQuestionTooltipRender = true;
			if($scope.labelQuestionTooltip === undefined) {
				$scope.labelQuestionTooltipRender = false;
			}
		}],
		link : function($scope) {

            // valida e-mail informado
            $scope.validarEmail = function ($event) {
                if ($scope.type === 'email') {
                    if ($scope.form[$scope.id].$error.email){
                        $scope.model = '';
                        angular.element($scope.$parent.controllerBodyElement).scope().showMessageErrorCampoInvalido($translate.instant($scope.label));
                        $event.preventDefault();
                        $event.stopPropagation();
                    }
                }
            };

		}
	};
}]);
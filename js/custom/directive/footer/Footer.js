//Template footer usar da seguinte forma onde optar na tela <footer>
angular.module('app').directive("ngFootter", ['$translate', function( $translate){
	return {
		template : "<br><div class=\"text-right\" style=\"font-size: 0.9em; vertical-align: bottom;\"> " +
			"(<span style=\"color:red; font-size: 1.1em !important;\">*</span>)".concat($translate.instant('VALIDACAO.MENSAGEM_CAMPO_OBRIGATORIO')).concat("</div>")
	};
}]);
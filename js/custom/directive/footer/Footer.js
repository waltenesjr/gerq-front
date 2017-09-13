//Template footer usar da seguinte forma onde optar na tela <footer>
angular.module('app').directive("ngFootter", ['$translate', function( $translate){
	return {
		template : "<hr style='margin-top: 1px!important; margin-bottom: 1px !important;'>" +
			"<div class=\"text-right\" style=\"height: 20px !important; padding-left: 44px !important; 	" +
			"padding-right: 44px !important; font-size: 0.9em; vertical-align: bottom;\"> " +
			"(<span style=\"color:red; font-size: 1.1em !important;\">*</span>)".concat($translate.instant('VALIDACAO.MENSAGEM_CAMPO_OBRIGATORIO')).concat("</div>")
	};
}]);
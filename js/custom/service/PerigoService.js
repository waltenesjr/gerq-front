"use strict";

gerqApp.service('PerigoService', ['PerigoRepository', 'ProdutoService',
    function (PerigoRepository, ProdutoService) {
    
    return {
        produtos: function () {
            return ProdutoService.all();
        }
    };
    
}]);

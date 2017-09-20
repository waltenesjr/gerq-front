"use strict";

gerqApp.service('ProdutoService', ['ProdutoRepository', 'CategoriaService',
    function (ProdutoRepository, CategoriaService) {
    
    return {
        get: function (id) {
            return ProdutoRepository.get(id);
        },

        list: function (pagination) {
            return ProdutoRepository.getList(pagination);
        },

        save: function (produto) {
            return ProdutoRepository.save(produto);
        },

        delete: function (id) {
            return ProdutoRepository.remove(id);
        },

        categorias: function () {
            return CategoriaService.all();
        }
    };
    
}]);

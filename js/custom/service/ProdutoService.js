"use strict";

gerqApp.service('ProdutoService', ['ProdutoRepository', 'CategoriaService', 'EmpresaService',
    function (ProdutoRepository, CategoriaService, EmpresaService) {
    
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
        },

        empresas: function () {
            return EmpresaService.all();
        },

        all: function () {
            return ProdutoRepository.all();
        },

        findByname: function (name) {
            return ProdutoRepository.findByName(name);
        }
    };
    
}]);

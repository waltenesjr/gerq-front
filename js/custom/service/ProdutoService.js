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

        getListSelectCategoria: function () {
            return CategoriaService.getListSelect();
        },

        getListSelectEmpresa: function () {
            return EmpresaService.getListSelect();
        },

        all: function () {
            return ProdutoRepository.all();
        },

        findByname: function (name) {
            return ProdutoRepository.findByName(name);
        },

        validRequired : function (produto) {
            var result = null;
            if (!produto.codigoServico || !produto.nome || !produto.dataVencimento) {
                result = 'identificacao';
            } else if (produto.perigos.length <= 0) {
                result = 'perigo';
            }
            return result;
        }
    };
}]);

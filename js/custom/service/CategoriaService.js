"use strict";

gerqApp.service('CategoriaService', ['CategoriaRepository',
    function (CategoriaRepository) {
    
    return {
        list: function (pagination) {
            return CategoriaRepository.getList(pagination);
        },

        save: function (categoria) {
            return CategoriaRepository.save(categoria);
        },

        delete: function (id) {
            return CategoriaRepository.remove(id);
        }
    };
    
}]);

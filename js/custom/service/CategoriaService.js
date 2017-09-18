"use strict";

gerqApp.service('CategoriaService', ['CategoriaRepository',
    function (CategoriaRepository) {
    
    return {
        list: function () {
            return CategoriaRepository.list();
        },

        add: function (categoria) {
            return CategoriaRepository.add(categoria);
        },

        edit: function (categoria) {
            return CategoriaRepository.edit(categoria);
        },

        delete: function (id) {
            return CategoriaRepository.delete(id);
        }
    };
    
}]);

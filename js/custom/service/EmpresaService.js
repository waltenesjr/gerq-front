"use strict";

gerqApp.service('EmpresaService', ['EmpresaRepository',
    function (EmpresaRepository) {
    
    return {
        list: function (pagination) {
            return EmpresaRepository.getList(pagination);
        },

        save: function (empresa) {
            return EmpresaRepository.save(empresa);
        },

        delete: function (id) {
            return EmpresaRepository.remove(id);
        },

        all: function () {
            return EmpresaRepository.all();
        }
    };
    
}]);

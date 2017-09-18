"use strict";

gerqApp.factory('CategoriaRepository', ['AbstractRepository', 'ServiceRestangular',
    function (AbstractRepository, ServiceRestangular) {

        function CategoriaRepository() {
            AbstractRepository.call(this, ServiceRestangular, '/categoria');
        }

        AbstractRepository.extend(CategoriaRepository);

        return new CategoriaRepository();
    }]);
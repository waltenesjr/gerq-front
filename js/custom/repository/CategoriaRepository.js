'use strict';

gerqApp.factory('CategoriaRepository', ['Restangular', 'AbstractRepository',
    function (Restangular, AbstractRepository) {

        function CategoriaRepository() {
            AbstractRepository.call(this, Restangular, '/');
        }

        AbstractRepository.extend(CategoriaRepository);
        return new CategoriaRepository();
    }
]);
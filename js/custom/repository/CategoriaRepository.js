"use strict";

gerqApp.factory('CategoriaRepository', ['AbstractRepository', 'ServiceRestangular',
    function (AbstractRepository, ServiceRestangular) {

        function CategoriaRepository() {
            AbstractRepository.call(this, ServiceRestangular, '/categoria');

            this.getListSelect = function () {
                return ServiceRestangular.one(this.route + '/getListSelect').get();
            };
        }

        AbstractRepository.extend(CategoriaRepository);

        return new CategoriaRepository();
    }]);
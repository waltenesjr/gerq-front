"use strict";

gerqApp.factory('ProdutoRepository', ['AbstractRepository', 'ServiceRestangular',
    function (AbstractRepository, ServiceRestangular) {

        function ProdutoRepository() {
            AbstractRepository.call(this, ServiceRestangular, '/produto');

            this.findByName = function (name) {
                return ServiceRestangular.one(this.route + '/findByName', name).get();
            };
        }

        AbstractRepository.extend(ProdutoRepository);

        return new ProdutoRepository();
    }]);
"use strict";

gerqApp.factory('ProdutoRepository', ['AbstractRepository', 'ServiceRestangular',
    function (AbstractRepository, ServiceRestangular) {

        function ProdutoRepository() {
            AbstractRepository.call(this, ServiceRestangular, '/produto');
        }

        AbstractRepository.extend(ProdutoRepository);

        return new ProdutoRepository();
    }]);
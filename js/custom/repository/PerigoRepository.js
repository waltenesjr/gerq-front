"use strict";

gerqApp.factory('PerigoRepository', ['AbstractRepository', 'ServiceRestangular',
    function (AbstractRepository, ServiceRestangular) {

        function PerigoRepository() {
            AbstractRepository.call(this, ServiceRestangular, '/perigo');
        }

        AbstractRepository.extend(PerigoRepository);

        return new PerigoRepository();
    }]);
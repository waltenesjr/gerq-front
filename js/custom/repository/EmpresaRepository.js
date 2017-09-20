"use strict";

gerqApp.factory('EmpresaRepository', ['AbstractRepository', 'ServiceRestangular',
    function (AbstractRepository, ServiceRestangular) {

        function EmpresaRepository() {
            AbstractRepository.call(this, ServiceRestangular, '/empresa');
        }

        AbstractRepository.extend(EmpresaRepository);

        return new EmpresaRepository();
    }]);